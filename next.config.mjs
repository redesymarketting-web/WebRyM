/** @type {import('next').NextConfig} */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

let supabaseImagePattern = null;

if (supabaseUrl) {
  try {
    const url = new URL(supabaseUrl);
    supabaseImagePattern = {
      protocol: url.protocol.replace(":", ""),
      hostname: url.hostname,
      pathname: "/storage/v1/object/public/**",
    };
  } catch {
    supabaseImagePattern = null;
  }
}

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: supabaseImagePattern ? [supabaseImagePattern] : [],
  },
};

export default nextConfig;
