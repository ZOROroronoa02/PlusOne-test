export interface NavLink {
  href: string;
  label: string;
}

export const NAV_LINKS: NavLink[] = [
  { href: "/ads", label: "Browse Companions" },
  { href: "/pricing", label: "Pricing" },
  { href: "/trust", label: "Trust & Safety" },
  { href: "/join", label: "Become a Companion" },
  { href: "/reviews", label: "Reviews" },
  { href: "/blog", label: "Blog" },
  { href: "/areas", label: "Areas" },
];
