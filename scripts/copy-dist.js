import { cpSync, existsSync, rmSync, mkdirSync } from 'fs';
import { join } from 'path';

const from = join(process.cwd(), 'dist', 'client');
const to = join(process.cwd(), 'public');

if (!existsSync(from)) {
  console.error('dist/client not found — run `npm run build` first');
  process.exit(1);
}

if (existsSync(to)) rmSync(to, { recursive: true, force: true });
mkdirSync(to, { recursive: true });
cpSync(from, to, { recursive: true });
console.log('Copied dist/client -> public');
