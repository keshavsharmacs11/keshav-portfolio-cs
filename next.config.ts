import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    agentFeedback: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        // Keep the Tailwind Turbopack loader for ordinary global CSS, but
        // leave *.module.css files to Next.js' native CSS Modules pipeline.
        // The previous broad rule also captured CSS Modules and caused
        // styles.* class lookups (e.g. PortfolioIntro) to render unstyled.
        condition: {
          not: {
            path: /\.module\.css$/,
          },
        },
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
