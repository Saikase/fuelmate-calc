import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// --- 1. SVG Definitions ---

// Master Full-Square SVG (512x512) for Store & Legacy icons
const masterSquareSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <!-- Background Gradient: Deep Luxury Midnight Slate -->
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e1b4b" />
      <stop offset="45%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#020617" />
    </linearGradient>

    <!-- Warm Golden Ambient Halo Glow -->
    <radialGradient id="haloGlow" cx="50%" cy="56%" r="48%">
      <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.38" />
      <stop offset="60%" stop-color="#d97706" stop-opacity="0.12" />
      <stop offset="100%" stop-color="#0f172a" stop-opacity="0" />
    </radialGradient>

    <!-- Coin Drop Gradient: Golden Amber to Vivid Sunset Orange -->
    <linearGradient id="coinDrop" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef08a" />
      <stop offset="28%" stop-color="#f59e0b" />
      <stop offset="75%" stop-color="#ea580c" />
      <stop offset="100%" stop-color="#9a3412" />
    </linearGradient>

    <!-- 3D Bevel & Lighting Highlights -->
    <linearGradient id="bevelGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.35" />
      <stop offset="50%" stop-color="#ffffff" stop-opacity="0.0" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0.35" />
    </linearGradient>

    <!-- Gold Metallic Coin Rim Gradient -->
    <linearGradient id="goldRim" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef3c7" />
      <stop offset="50%" stop-color="#f59e0b" />
      <stop offset="100%" stop-color="#b45309" />
    </linearGradient>

    <filter id="shadowDepth" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="18" flood-color="#000" flood-opacity="0.65" />
    </filter>
  </defs>

  <!-- Full Square Background (Safe for Samsung & Xiaomi squircle masks) -->
  <rect width="512" height="512" fill="url(#bgGrad)" />

  <!-- Ambient Light Behind Symbol -->
  <circle cx="256" cy="275" r="190" fill="url(#haloGlow)" />

  <!-- Main Geometric Fuel Drop + Coin Hybrid -->
  <g filter="url(#shadowDepth)">
    <!-- Base Drop Silhouette -->
    <path d="M 256 112 
             C 256 112, 154 246, 154 322 
             A 102 102 0 0 0 358 322 
             C 358 246, 256 112, 256 112 Z" 
          fill="url(#coinDrop)" />

    <!-- 3D Bevel Rim -->
    <path d="M 256 112 
             C 256 112, 154 246, 154 322 
             A 102 102 0 0 0 358 322 
             C 358 246, 256 112, 256 112 Z" 
          fill="url(#bevelGrad)" />

    <!-- Inner Coin Core (Circular inset with financial incision) -->
    <circle cx="256" cy="322" r="64" fill="#090d16" opacity="0.95" />
    
    <!-- Gold Coin Rim -->
    <circle cx="256" cy="322" r="56" fill="none" stroke="url(#goldRim)" stroke-width="4.5" opacity="0.9" />

    <!-- Calculator / Financial Math Slash (Tiết kiệm nhiên liệu) -->
    <path d="M 276 295 L 236 349" stroke="#fde68a" stroke-width="6" stroke-linecap="round" />
    <circle cx="239" cy="303" r="6.5" fill="#fde68a" />
    <circle cx="273" cy="341" r="6.5" fill="#fde68a" />

    <!-- Top Specular Gloss Highlight -->
    <path d="M 256 138 
             C 256 138, 180 236, 180 294 
             C 180 268, 234 174, 256 138 Z" 
          fill="#ffffff" 
          opacity="0.4" />
  </g>

  <!-- Clean Bottom Branding Accent Dot -->
  <circle cx="256" cy="452" r="4.5" fill="#f59e0b" opacity="0.75" />
</svg>
`;

// Adaptive Icon Foreground SVG (108x108 dp viewport with transparent background)
// The symbol is scaled to fit within the central 72x72 dp safe zone (ratio ~0.66)
const adaptiveForegroundSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <!-- Warm Golden Ambient Halo Glow -->
    <radialGradient id="fgHalo" cx="50%" cy="56%" r="48%">
      <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.38" />
      <stop offset="60%" stop-color="#d97706" stop-opacity="0.12" />
      <stop offset="100%" stop-color="#0f172a" stop-opacity="0" />
    </radialGradient>

    <!-- Coin Drop Gradient -->
    <linearGradient id="fgDrop" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef08a" />
      <stop offset="28%" stop-color="#f59e0b" />
      <stop offset="75%" stop-color="#ea580c" />
      <stop offset="100%" stop-color="#9a3412" />
    </linearGradient>

    <!-- 3D Bevel Rim -->
    <linearGradient id="fgBevel" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.35" />
      <stop offset="50%" stop-color="#ffffff" stop-opacity="0.0" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0.35" />
    </linearGradient>

    <!-- Gold Metallic Coin Rim Gradient -->
    <linearGradient id="fgGoldRim" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef3c7" />
      <stop offset="50%" stop-color="#f59e0b" />
      <stop offset="100%" stop-color="#b45309" />
    </linearGradient>

    <filter id="fgShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="18" flood-color="#000" flood-opacity="0.65" />
    </filter>
  </defs>

  <!-- Ambient Light Behind Symbol -->
  <circle cx="256" cy="275" r="190" fill="url(#fgHalo)" />

  <!-- Main Geometric Fuel Drop + Coin Hybrid -->
  <g filter="url(#fgShadow)">
    <path d="M 256 112 
             C 256 112, 154 246, 154 322 
             A 102 102 0 0 0 358 322 
             C 358 246, 256 112, 256 112 Z" 
          fill="url(#fgDrop)" />

    <path d="M 256 112 
             C 256 112, 154 246, 154 322 
             A 102 102 0 0 0 358 322 
             C 358 246, 256 112, 256 112 Z" 
          fill="url(#fgBevel)" />

    <circle cx="256" cy="322" r="64" fill="#090d16" opacity="0.95" />
    <circle cx="256" cy="322" r="56" fill="none" stroke="url(#fgGoldRim)" stroke-width="4.5" opacity="0.9" />

    <path d="M 276 295 L 236 349" stroke="#fde68a" stroke-width="6" stroke-linecap="round" />
    <circle cx="239" cy="303" r="6.5" fill="#fde68a" />
    <circle cx="273" cy="341" r="6.5" fill="#fde68a" />

    <path d="M 256 138 
             C 256 138, 180 236, 180 294 
             C 180 268, 234 174, 256 138 Z" 
          fill="#ffffff" 
          opacity="0.4" />
  </g>

  <circle cx="256" cy="452" r="4.5" fill="#f59e0b" opacity="0.75" />
</svg>
`;

async function generateAll() {
  console.log('Generating FuelMate Production App Icons...');

  // 1. Save master SVGs
  fs.writeFileSync('public/icon_master.svg', masterSquareSvg.trim());
  fs.writeFileSync('public/icon_foreground.svg', adaptiveForegroundSvg.trim());

  // 2. Render 512x512 Master Store Icon (Square - Samsung & Xiaomi compatible)
  const masterBuffer = Buffer.from(masterSquareSvg);
  await sharp(masterBuffer)
    .resize(512, 512)
    .png({ quality: 100 })
    .toFile('public/store_icon_512.png');
  
  // Also copy to root workspace directory for easy access
  fs.copyFileSync('public/store_icon_512.png', 'store_icon_512.png');
  console.log('✓ Created 512x512 Store Icon: store_icon_512.png & public/store_icon_512.png');

  // 3. Render Web Favicon & Touch Icon
  await sharp(masterBuffer)
    .resize(180, 180)
    .png()
    .toFile('public/apple-touch-icon.png');
  await sharp(masterBuffer)
    .resize(64, 64)
    .png()
    .toFile('public/favicon-64.png');
  await sharp(masterBuffer)
    .resize(32, 32)
    .png()
    .toFile('public/favicon.png');
  console.log('✓ Created Web Favicons: favicon.png, apple-touch-icon.png');

  // 4. Android Mipmap densities & sizes
  // Adaptive foreground sizes (108dp base):
  // mdpi (1x): 108px, hdpi (1.5x): 162px, xhdpi (2x): 216px, xxhdpi (3x): 324px, xxxhdpi (4x): 432px
  // Legacy & Round sizes (48dp base):
  // mdpi: 48px, hdpi: 72px, xhdpi: 96px, xxhdpi: 144px, xxxhdpi: 192px
  const densities = [
    { name: 'mipmap-mdpi', legacySize: 48, fgSize: 108 },
    { name: 'mipmap-hdpi', legacySize: 72, fgSize: 162 },
    { name: 'mipmap-xhdpi', legacySize: 96, fgSize: 216 },
    { name: 'mipmap-xxhdpi', legacySize: 144, fgSize: 324 },
    { name: 'mipmap-xxxhdpi', legacySize: 192, fgSize: 432 },
  ];

  const fgBuffer = Buffer.from(adaptiveForegroundSvg);

  for (const d of densities) {
    const dir = path.join('android', 'app', 'src', 'main', 'res', d.name);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    // a) ic_launcher.png (legacy square/squircle)
    // We create a rounded rect mask for legacy launcher
    const cornerRadius = Math.round(d.legacySize * 0.22);
    const squircleMask = Buffer.from(
      `<svg width="${d.legacySize}" height="${d.legacySize}">
        <rect x="0" y="0" width="${d.legacySize}" height="${d.legacySize}" rx="${cornerRadius}" ry="${cornerRadius}" fill="#ffffff"/>
      </svg>`
    );
    await sharp(masterBuffer)
      .resize(d.legacySize, d.legacySize)
      .composite([{ input: squircleMask, blend: 'dest-in' }])
      .png()
      .toFile(path.join(dir, 'ic_launcher.png'));

    // b) ic_launcher_round.png (round icon for Pixel launcher)
    const radius = d.legacySize / 2;
    const circleMask = Buffer.from(
      `<svg width="${d.legacySize}" height="${d.legacySize}">
        <circle cx="${radius}" cy="${radius}" r="${radius}" fill="#ffffff"/>
      </svg>`
    );
    await sharp(masterBuffer)
      .resize(d.legacySize, d.legacySize)
      .composite([{ input: circleMask, blend: 'dest-in' }])
      .png()
      .toFile(path.join(dir, 'ic_launcher_round.png'));

    // c) ic_launcher_foreground.png (for Android 8.0+ adaptive icons)
    await sharp(fgBuffer)
      .resize(d.fgSize, d.fgSize)
      .png()
      .toFile(path.join(dir, 'ic_launcher_foreground.png'));

    console.log(`✓ Generated ${d.name} (legacy: ${d.legacySize}px, fg: ${d.fgSize}px)`);
  }

  // 5. Update Android Adaptive Background Color
  const bgXml = `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="ic_launcher_background">#0F172A</color>
</resources>
`;
  fs.writeFileSync('android/app/src/main/res/values/ic_launcher_background.xml', bgXml.trim());
  console.log('✓ Updated android/app/src/main/res/values/ic_launcher_background.xml to #0F172A');

  console.log('\n🎉 ALL ICONS SUCCESSFULLY GENERATED AND PLACED IN ANDROID PROJECT!');
}

generateAll().catch(err => {
  console.error('Error generating icons:', err);
  process.exit(1);
});
