'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import {faInstagram, faTwitter} from "@fortawesome/free-brands-svg-icons";
import {faHome} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"

const links = [
  { href: '/', icon: faHome },
  { href: '/posts', label: '記事一覧' },
  { href: '/tags', label: 'タグ一覧' },
  { href: '/authors', label: '投稿者一覧' },
];

const socialLinks = [
  {
    href: 'https://x.com/mathkigyo',
    icon: faTwitter,
  },
  {
    href: 'https://note.com/cool_python4421',
    label: "n",
  },
  {
    href: 'https://www.instagram.com/math_kigyo?igsh=MXF2dmdzOTB2Mm0xeg%3D%3D&utm_source=qr',
    icon: faInstagram,
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [keyword, setKeyword] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword.trim()) return;
    router.push(`/posts?keyword=${encodeURIComponent(keyword.trim())}`);
    setIsOpen(false);
  };

  return (
    <header className="bg-gray-100 p-4 mb-6 shadow-md relative z-50">
      <div className="flex items-center justify-between">
        {/* 左：ブログ名 */}
        <Link href="/" className="text-2xl font-bold text-gray-800">
        39times
        </Link>

        {/* 右：SNS + 検索 + ハンバーガー */}
        <div className="flex items-center gap-4">
          {socialLinks.map(({ href, label, icon }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:underline text-black-600"
            >
              {icon && <FontAwesomeIcon icon={icon} className="text-2xl mt-0.5" />}
              {label && (
                <div className="w-10 h-8 flex items-cnter justify-center text-4xl font-bold mb-3">
                  {label}
                </div>
              )}
            </a>
          ))}

          <form onSubmit={handleSearch} className="hidden md:flex border rounded overflow-hidden">
            <input
              type="text"
              placeholder="検索"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="px-2 py-1 text-black outline-none flex-grow"
            />
            <button type="submit" className="bg-gray-800 text-white px-3">
              🔍
            </button>
          </form>

          <button onClick={() => setIsOpen(true)}>
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </div>

      {/* ハンバーガーメニュー */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-40"
            onClick={() => setIsOpen(false)}
          />
          <aside className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-50 p-6 transition-transform">
            <button onClick={() => setIsOpen(false)} className="mb-4">
              <X className="w-6 h-6 text-gray-700" />
            </button>

            <ul className="space-y-4">
              {links.map(({ href, label, }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={`block hover:underline ${
                      pathname === href ? 'font-bold text-black' : 'text-gray-700'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            <form onSubmit={handleSearch} className="mt-6 flex border rounded overflow-hidden">
              <input
                type="text"
                placeholder="検索"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="px-2 py-1 text-black outline-none flex-grow"
              />
              <button type="submit" className="bg-gray-800 text-white px-3">
                🔍
              </button>
            </form>                        
          </aside>
        </>
      )}
    </header>
  );
}
