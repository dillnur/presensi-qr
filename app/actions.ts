'use server'

import { createHmac } from 'crypto';

export async function getTotpToken(): Promise<string> {
  const secret = process.env.SECRET_KEY || 'RAHASIA_DEFAULT_YANG_SANGAT_PANJANG';
  const counter = Math.floor(Date.now() / 10000);
  const buffer = Buffer.alloc(8);
  buffer.writeUInt32BE(counter, 4);
  const hmac = createHmac('sha1', secret).update(buffer).digest();
  const offset = hmac[hmac.length - 1] & 0xf;
  const code = (
    ((hmac[offset] & 0x7f) << 24) |
    ((hmac[offset + 1] & 0xff) << 16) |
    ((hmac[offset + 2] & 0xff) << 8) |
    (hmac[offset + 3] & 0xff)
  ) % 1000000;

  return code.toString().padStart(6, '0');
}
