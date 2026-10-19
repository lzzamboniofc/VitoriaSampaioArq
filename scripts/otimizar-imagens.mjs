// Converte fotos de assets/originais/ em WebP otimizado em assets/img/
// Uso: coloque JPG/PNG em assets/originais/ e rode `npm run imagens`
import { readdir, mkdir } from 'node:fs/promises';
import { join, parse } from 'node:path';
import sharp from 'sharp';

const SRC = 'assets/originais';
const OUT = 'assets/img';
const MAX = 2000; // largura máxima em px

await mkdir(OUT, { recursive: true });
const files = (await readdir(SRC).catch(() => [])).filter((f) => /\.(jpe?g|png|webp|tiff?)$/i.test(f));
if (!files.length) {
  console.log(`Nenhuma imagem em ${SRC}/`);
  process.exit(0);
}
for (const f of files) {
  const out = join(OUT, parse(f).name + '.webp');
  const info = await sharp(join(SRC, f)).rotate().resize({ width: MAX, withoutEnlargement: true }).webp({ quality: 80 }).toFile(out);
  console.log(`✓ ${out}  ${info.width}×${info.height}  ${(info.size / 1024).toFixed(0)} KB`);
}
console.log('\nInforme no config.js: src, alt, w e h (largura/altura acima) para evitar deslocamento de layout.');
