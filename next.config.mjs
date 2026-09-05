/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Next.js proxies remote images through its own optimizer and gives the
    // upstream host a hardcoded 7s window (not configurable). technolife.com
    // is a live third-party site and sometimes doesn't answer that fast,
    // which was causing "upstream image response timed out" and half-loaded
    // pages. unoptimized:true skips that server-side proxy/resize step
    // entirely, so the browser just fetches the image URL directly.
    unoptimized: true,
    remotePatterns: [
      { protocol: "http", hostname: "www.technolife.com" },
      { protocol: "https", hostname: "www.technolife.com" },
    ],
  },
};

export default nextConfig;
