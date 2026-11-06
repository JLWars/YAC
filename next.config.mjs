/** @type {import('next').NextConfig} */
const nextConfig = {
  // Export statique pour Cloudflare Pages : `npm run build` génère le dossier out/.
  output: "export",
  // Pas de serveur d'optimisation d'images en export statique : next/image sert
  // les fichiers de public/ tels quels.
  images: { unoptimized: true },
};

export default nextConfig;
