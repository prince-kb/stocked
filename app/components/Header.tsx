'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header = () => {
  const pathName = usePathname();

  return (
    <header>
      <div className="main-container inner">
        <Link href="/" className="flex items-center">
          <Image src="/logo.svg" alt="Stocked" height={40} width={40} className="h-8" />
          <p className="text-lg font-medium">Stockeδ</p>
        </Link>
        <nav>
          <Link
            href="/"
            className={cn('nav-link', {
              'is-active': pathName === '/',
              'is-home': true,
            })}
          >
            Home
          </Link>
          <p className="">Search Modal</p>
          <Link
            href="/coins"
            className={cn('nav-link', {
              'is-active': pathName === '/coins',
            })}
          >
            All Coins
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
