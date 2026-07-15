const cloudinary = require('cloudinary').v2;

const configureCloudinary = () => {
  // Verifica se as variáveis de ambiente necessárias existem
  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    console.warn('⚠️ Cloudinary não está configurado corretamente. Verifique suas variáveis de ambiente no .env');
    return;
  }

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  console.log('☁️ Cloudinary configurado com sucesso');
};

module.exports = { configureCloudinary, cloudinary };
