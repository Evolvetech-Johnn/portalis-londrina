import React from 'react';

/**
 * Componente reutilizável para renderizar imagens otimizadas via Cloudinary.
 * Aplica transformações automáticas para formato (WebP/AVIF) e qualidade.
 *
 * @param {Object} props
 * @param {string} props.publicId - ID público da imagem no Cloudinary (ex: 'portalis/hero-bg')
 * @param {string} props.alt - Texto alternativo (obrigatório para SEO/Acessibilidade)
 * @param {string} props.className - Classes Tailwind opcionais
 * @param {boolean} props.priority - Se true, remove lazy loading (usar apenas em imagens "above the fold" como Hero)
 * @param {string} props.width - Largura opcional para evitar CLS (Cumulative Layout Shift)
 * @param {string} props.height - Altura opcional para evitar CLS
 * @param {string} props.objectFit - cover, contain, etc.
 */
export default function OptimizedImage({
  publicId,
  alt,
  className = '',
  priority = false,
  width,
  height,
  objectFit = 'cover',
}) {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

  if (!cloudName) {
    console.warn('VITE_CLOUDINARY_CLOUD_NAME não definido no .env do frontend.');
    return <div className={`bg-slate-800 animate-pulse ${className}`} />;
  }

  // Transformações padrão:
  // f_auto: Formato automático (entrega WebP ou AVIF se o navegador suportar)
  // q_auto: Qualidade automática (comprime sem perda visual perceptível)
  const transformations = 'f_auto,q_auto';
  
  // URL base do Cloudinary
  const baseUrl = `https://res.cloudinary.com/${cloudName}/image/upload`;
  
  // URL final da imagem
  const src = `${baseUrl}/${transformations}/${publicId}`;

  // Para imagens responsivas de alta qualidade, podemos gerar um srcset básico (1x e 2x)
  // q_auto:best para retina screens garante nitidez
  const srcSet = `
    ${baseUrl}/f_auto,q_auto,dpr_1.0/${publicId} 1x,
    ${baseUrl}/f_auto,q_auto:good,dpr_2.0/${publicId} 2x
  `;

  return (
    <img
      src={src}
      srcSet={srcSet}
      alt={alt}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      width={width}
      height={height}
      style={{ objectFit }}
    />
  );
}
