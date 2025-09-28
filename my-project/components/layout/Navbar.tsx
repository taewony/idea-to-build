import Link from 'next/link';
import { Home, MessageSquare, Trophy, Target, Settings } from 'lucide-react';

const navLinks = [
  { href: '/wall', label: '잔소리 담벼락', icon: MessageSquare },
  { href: '/challenges', label: 'Open 도전', icon: Trophy },
  { href: '/goals', label: '나의 목표', icon: Target },
  { href: '/settings', label: '설정', icon: Settings },
];

export default function Navbar() {
  return (
    <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 text-2xl font-bold text-indigo-600">
              Nugget
            </Link>
          </div>
          <nav className="hidden md:flex md:items-center md:space-x-6">
            {navLinks.map(({ href, label, icon: Icon }) => (
              <Link key={label} href={href} className="flex items-center font-semibold text-gray-600 hover:text-indigo-600 transition-colors">
                <Icon className="mr-2 h-5 w-5" />
                {label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center">
            <span className="font-semibold text-sm text-gray-700">로그인됨</span>
          </div>
        </div>
      </div>
    </header>
  );
}
