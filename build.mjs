import { transform } from 'lightningcss';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';

const targets = { chrome: 90 << 16, firefox: 90 << 16, safari: 15 << 16 };

mkdirSync('dist', { recursive: true });

function build(sources, outFile) {
  const combined = sources.map(f => readFileSync(f, 'utf8')).join('\n');
  const { code } = transform({ filename: outFile, code: Buffer.from(combined), minify: true, targets });
  writeFileSync(outFile, code);
  const inKB  = (combined.length / 1024).toFixed(1);
  const outKB = (code.length     / 1024).toFixed(1);
  console.log(`Built ${outFile}  ${inKB} KB → ${outKB} KB`);
}

build(
  ['govbr-classless.css', 'components.css'],
  'dist/govbr-classless.min.css',
);

build(
  ['pico-govbr/govbr-pico-theme.css'],
  'dist/govbr-pico-theme.min.css',
);
