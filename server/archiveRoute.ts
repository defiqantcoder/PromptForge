import express, { Application, Request, Response } from 'express';
import crypto from 'node:crypto';


const ALLOWED_FILES = [
  'AGENTS.md',
  'spec.md',
  'plan.md',
  'tasks.md',
  'COLLABORATION.md',
  '.continuerules',
];

/**
 * Registers the POST /api/export/bundle endpoint for downloading allowed spec files as a ZIP with SHA-256 checksums.
 */
export function registerArchiveRoutes(app: Application) {
  app.post('/api/export/bundle', (req: Request, res: Response) => {
    const { appName, files } = req.body ?? {};

    if (!files || typeof files !== 'object' || Array.isArray(files)) {
      return res.status(400).json({ error: 'Missing or invalid "files" object.' });
    }

    const fileKeys = Object.keys(files);

    // Check for disallowed files or path traversal
    for (const key of fileKeys) {
      if (!ALLOWED_FILES.includes(key) || key.includes('..') || key.includes('/') || key.includes('\\')) {
        return res.status(400).json({ error: `Invalid file name: ${key}` });
      }
    }

    const archiveFiles: { name: string; content: Buffer }[] = [];
    let sha256sums = '';

    for (const [name, content] of Object.entries(files)) {
      if (typeof content !== 'string') {
          return res.status(400).json({ error: `Invalid content for file: ${name}` });
      }
      const buffer = Buffer.from(content, 'utf-8');
      archiveFiles.push({ name, content: buffer });

      const hash = crypto.createHash('sha256').update(buffer).digest('hex');
      sha256sums += `${hash}  ${name}\n`;
    }

    const sumsBuffer = Buffer.from(sha256sums, 'utf-8');
    archiveFiles.push({ name: 'SHA256SUMS.txt', content: sumsBuffer });

    // ZIP generation using raw buffers (no external deps)
    // Structure:
    // [Local File Headers + Data] ...
    // [Central Directory Headers] ...
    // [End of Central Directory Record]

    const localFileHeaders: Buffer[] = [];
    const centralDirectoryHeaders: Buffer[] = [];
    let offset = 0;

    for (const file of archiveFiles) {
      const nameBuf = Buffer.from(file.name);

      // Calculate CRC32 (Poly: 0xEDB88320)
      // Since node:zlib doesn't expose a raw crc32 function easily for direct usage, we can implement it or use a trick.
      // A trick is to use zlib.deflateSync but just use uncompressed data.
      // Wait, node:zlib actually has crc32 if we dig, but let's implement standard crc32.
      let crc = 0 ^ (-1);
      for (let i = 0; i < file.content.length; i++) {
        crc = (crc >>> 8) ^ crcTable[(crc ^ file.content[i]) & 0xFF];
      }
      crc = (crc ^ (-1)) >>> 0;

      const time = 0;
      const date = 0;

      // Local File Header
      const lfh = Buffer.alloc(30);
      lfh.writeUInt32LE(0x04034b50, 0); // Signature
      lfh.writeUInt16LE(10, 4); // Version needed to extract
      lfh.writeUInt16LE(0, 6); // General purpose bit flag
      lfh.writeUInt16LE(0, 8); // Compression method (0 = store)
      lfh.writeUInt16LE(time, 10); // Last mod file time
      lfh.writeUInt16LE(date, 12); // Last mod file date
      lfh.writeUInt32LE(crc, 14); // CRC-32
      lfh.writeUInt32LE(file.content.length, 18); // Compressed size
      lfh.writeUInt32LE(file.content.length, 22); // Uncompressed size
      lfh.writeUInt16LE(nameBuf.length, 26); // File name length
      lfh.writeUInt16LE(0, 28); // Extra field length

      const localFileData = Buffer.concat([lfh, nameBuf, file.content]);
      localFileHeaders.push(localFileData);

      // Central Directory Header
      const cdh = Buffer.alloc(46);
      cdh.writeUInt32LE(0x02014b50, 0); // Signature
      cdh.writeUInt16LE(0, 4); // Version made by
      cdh.writeUInt16LE(10, 6); // Version needed to extract
      cdh.writeUInt16LE(0, 8); // General purpose bit flag
      cdh.writeUInt16LE(0, 10); // Compression method
      cdh.writeUInt16LE(time, 12); // Last mod file time
      cdh.writeUInt16LE(date, 14); // Last mod file date
      cdh.writeUInt32LE(crc, 16); // CRC-32
      cdh.writeUInt32LE(file.content.length, 20); // Compressed size
      cdh.writeUInt32LE(file.content.length, 24); // Uncompressed size
      cdh.writeUInt16LE(nameBuf.length, 28); // File name length
      cdh.writeUInt16LE(0, 30); // Extra field length
      cdh.writeUInt16LE(0, 32); // File comment length
      cdh.writeUInt16LE(0, 34); // Disk number start
      cdh.writeUInt16LE(0, 36); // Internal file attributes
      cdh.writeUInt32LE(0, 38); // External file attributes
      cdh.writeUInt32LE(offset, 42); // Relative offset of local header

      centralDirectoryHeaders.push(Buffer.concat([cdh, nameBuf]));

      offset += localFileData.length;
    }

    const centralDirectoryData = Buffer.concat(centralDirectoryHeaders);

    // End of Central Directory Record
    const eocd = Buffer.alloc(22);
    eocd.writeUInt32LE(0x06054b50, 0); // Signature
    eocd.writeUInt16LE(0, 4); // Number of this disk
    eocd.writeUInt16LE(0, 6); // Disk where central directory starts
    eocd.writeUInt16LE(archiveFiles.length, 8); // Number of central directory records on this disk
    eocd.writeUInt16LE(archiveFiles.length, 10); // Total number of central directory records
    eocd.writeUInt32LE(centralDirectoryData.length, 12); // Size of central directory
    eocd.writeUInt32LE(offset, 16); // Offset of start of central directory, relative to start of archive
    eocd.writeUInt16LE(0, 20); // ZIP file comment length

    const zipBuffer = Buffer.concat([...localFileHeaders, centralDirectoryData, eocd]);

    const slug = (typeof appName === 'string' && appName ? appName : 'project')
      .replace(/[^a-z0-9]/gi, '-')
      .toLowerCase();

    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', `attachment; filename="${slug}-spec-bundle.zip"`);
    return res.send(zipBuffer);
  });
}

// CRC32 table initialization
const crcTable = new Uint32Array(256);
for (let i = 0; i < 256; i++) {
  let c = i;
  for (let j = 0; j < 8; j++) {
    if (c & 1) {
      c = 0xEDB88320 ^ (c >>> 1);
    } else {
      c = c >>> 1;
    }
  }
  crcTable[i] = c >>> 0;
}
