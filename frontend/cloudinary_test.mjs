import { v2 as cloudinary } from 'cloudinary';

// ── STEP 1: Configure Cloudinary ─────────────────────────────────────────────
cloudinary.config({
  cloud_name: 'l0nht1n6',
  api_key:    '586685913962388',
  api_secret: 'NKbo8G_hRcdihUIC1GqMnHzV4FA',
});

// ── STEP 2: Upload a sample image ────────────────────────────────────────────
const SAMPLE_IMAGE_URL = 'https://res.cloudinary.com/demo/image/upload/sample.jpg';

console.log('⬆️  Uploading sample image...\n');

try {
  const uploadResult = await cloudinary.uploader.upload(SAMPLE_IMAGE_URL, {
    folder: 'portalis-onboarding',
  });

  console.log('✅ Upload successful!');
  console.log('   Secure URL:', uploadResult.secure_url);
  console.log('   Public ID: ', uploadResult.public_id);
  console.log('');

  // ── STEP 3: Get image metadata ──────────────────────────────────────────────
  const details = await cloudinary.api.resource(uploadResult.public_id);

  console.log('📋 Image details:');
  console.log('   Width:     ', details.width, 'px');
  console.log('   Height:    ', details.height, 'px');
  console.log('   Format:    ', details.format);
  console.log('   File size: ', details.bytes, 'bytes');
  console.log('');

  // ── STEP 4: Generate transformed URL ─────────────────────────────────────────
  const transformedUrl = cloudinary.url(uploadResult.public_id, {
    transformation: [
      { fetch_format: 'auto' }, // f_auto: entrega o melhor formato para cada browser (WebP, AVIF, etc.)
      { quality: 'auto' },      // q_auto: comprime automaticamente sem perda visual perceptível
    ],
    secure: true,
  });

  console.log('🔗 Transformed URL (f_auto + q_auto):');
  console.log('  ', transformedUrl);
  console.log('');
  console.log('Done! Click link above to see the optimized version of the image.');
  console.log('Check the size and the format — it will be smaller and possibly in WebP or AVIF.');

} catch (err) {
  console.error('❌ Error:', err.message ?? err);
  process.exit(1);
}
