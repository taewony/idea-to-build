'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
    const pathname = usePathname();
    const getLinkClass = (path: string) => {
        const baseClass = "text-sm font-medium transition-colors";
        const activeClass = "text-primary font-semibold";
        const inactiveClass = "hover:text-primary";
        
        if (path === '/' && pathname === '/') return `${baseClass} ${activeClass}`;
        if (path !== '/' && pathname.startsWith(path)) return `${baseClass} ${activeClass}`;
        
        return `${baseClass} ${inactiveClass}`;
    };

    return (
        <header className="sticky top-0 z-30 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link href="/" className="flex items-center gap-4">
                        <div className="text-primary size-7">
                           <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path clipRule="evenodd" d="M12.0799 24L4 19.2479L9.95537 8.75216L18.04 13.4961L18.0446 4H29.9554L29.96 13.4961L38.0446 8.75216L44 19.2479L35.92 24L44 28.7521L38.0446 39.2479L29.96 34.5039L29.9554 44H18.0446L18.04 34.5039L9.95537 39.2479L4 28.7521L12.0799 24Z" fill="currentColor" fillRule="evenodd"></path></svg>
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">GoalCracker</h2>
                    </Link>
                    <nav className="hidden md:flex items-center gap-8">
                        <Link className={getLinkClass('/')} href="/">Home</Link>
                        <Link className={getLinkClass('/goals')} href="/goals">My Goals</Link>
                        <Link className={getLinkClass('/challenges')} href="/challenges">Challenges</Link>
                        <Link className={getLinkClass('/wall')} href="/wall">AI Wall</Link>
                        <Link className={getLinkClass('/settings')} href="/settings">AI Settings</Link>
                        <Link className={getLinkClass('/community')} href="/community">Community</Link>
                    </nav>
                    <div className="flex items-center gap-4">
                        <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                           <span className="material-symbols-outlined text-gray-600 dark:text-gray-300">notifications</span>
                        </button>
                        <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" style={{ backgroundImage: `url("https://picsum.photos/seed/avatar/100/100")` }}></div>
                    </div>
                </div>
            </div>
        </header>
    );
};
