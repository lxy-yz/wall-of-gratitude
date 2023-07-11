export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Wall of Gratitude",
  description:
    "Beautifully designed components built with Radix UI and Tailwind CSS.",
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
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/ui",
    docs: "https://ui.shadcn.com",
  },
}
