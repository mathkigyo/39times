'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/posts", label: "記事一覧" },
  { href: "/tags", label: "タグ一覧" },
  { href: "/authors", label: "投稿者一覧" },
];

const socialLinks = [
  {
    href: "https://x.com/mathkigyo",
    label: "X（旧Twitter）",
  },
  {
    href: "https://note.com/cool_python4421",
    label: "note",
  },
  {
    href: "#",
    label: "Instagram（準備中）",
  },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="bg-gray-100 p-4 mb-6">
      <nav className="flex flex-wrap gap-6 text-sm font-medium text-gray-700 items-center">
        {/* 内部リンク */}
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`hover:underline ${
              pathname === href ? "font-bold text-black" : ""
            }`}
          >
            {label}
          </Link>
        ))}

        {/* 外部リンク */}
        {socialLinks.map(({ href, label }) => (
          <a
            key={href}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline text-blue-600"
          >
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
}
