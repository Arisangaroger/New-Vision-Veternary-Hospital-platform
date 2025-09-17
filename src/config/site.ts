import { type AdminNavItem, type NavItem } from "@/types"

const links = {
  facebook: "",
  github: "",
  openGraphImage: "/opengraph-image.png",
  manifestFile: "/site.webmanifest",
  authorsWebsite: "",
}

export const siteConfig = {
  links,
  nameShort: "New Vision",
  nameLong: "New Vision Veterinary Hospital",
  description: "",
  url: "https://newvision-hospital.com",
  ogImage: links.openGraphImage,
  author: "New Vision Team",
  hostingRegion: "fra1",
  keywords: [
    "Veterinary clinic",
    "Veterinarian",
    "Veterinary",
    "Veterinary Bochnia",
    "Veterinary Brzesko",
    "Veterinary Lesser Poland",
    "New Vision",
  ],
  mainNavItems: [
    {
      title: "Clinic",
      href: "/#clinic",
    },
    {
      title: "Services",
      href: "/#services",
    },
    {
      title: "Staff",
      href: "/#staff",
    },
    // {
    //   title: "Hair salon",
    //   href: "/#hair-salon",
    // },
    // {
    //   title: "Gallery",
    //   href: "/#gallery",
    // },
    {
      title: "Contact",
      href: "/#contact",
    },
  ] satisfies NavItem[],

  mobileNav: [
    {
      title: "Clinic",
      href: "/admin/clinic",
    },
    {
      title: "Reservations",
      href: "/admin/bookings",
    },
    {
      title: "Availability",
      href: "/admin/availability",
    },
    {
      title: "Profile",
      href: "/admin/profile",
    },
  ] satisfies AdminNavItem[],
}
    