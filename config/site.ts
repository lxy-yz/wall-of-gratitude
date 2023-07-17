export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Wall of Gratitude",
  description:
    "A place to send gratitude to your friends, family, and community.",
  url: process.env.VERCEL_URL,
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Discover",
      href: "/discover",
    },
    {
      title: "Send Gratitude",
      href: "/send-gratitude",
    },
  ],
  links: {
    website: "https://liallen.me",
    github: "https://github.com/lxy-yz/wall-of-gratitude",
    // docs: "https://ui.shadcn.com",
  },
}
