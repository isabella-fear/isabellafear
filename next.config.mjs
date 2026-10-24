/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(process.env.PAGES_EXPORT === '1' ? {
    output: 'export',
    trailingSlash: true,
    images: { unoptimized: true },
  } : {}),
}

export default nextConfig
