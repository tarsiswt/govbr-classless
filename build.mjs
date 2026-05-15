import { transform } from 'lightningcss';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';

const sources = ['govbr-classless.css', 'components.css'];
const outFile = 'dist/govbr-classless.min.css';

const combined = sources.map(f => readFileSync(f, 'utf8')).join('\n');

const { code } = transform({
  filename: 'govbr-classless.min.css',
  code: Buffer.from(combined),
  minify: true,
  targets: { chrome: 90 << 16, firefox: 90 << 16, safari: 15 << 16 },
});

mkdirSync('dist', { recursive: true });
writeFileSync(outFile, code);

const inKB  = (combined.length / 1024).toFixed(1);
const outKB = (code.length   / 1024).toFixed(1);
console.log(`Built ${outFile}  ${inKB} KB → ${outKB} KB`);
