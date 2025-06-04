'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';

export function Navigation() {
  const { status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="container mx-auto px-4 py-2 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold">RNP Residência</Link>
      <div className="hidden md:flex space-x-4">
        <Link href="/" className="hover:text-gray-300">Home</Link>
        {status === 'authenticated' ? (
          <>
            <Link href="/dashboard" className="hover:text-gray-300">Dashboard</Link>
            <button onClick={() => signOut()} className="hover:text-gray-300">Sign Out</button>
          </>
        ) : (
          <Link href="/auth/signin" className="hover:text-gray-300">Sign In</Link>
        )}
      </div>
      <button
        className="md:hidden"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        Menu
      </button>
      {isMenuOpen && (
        <div className="absolute top-16 right-0 bg-gray-800 p-4 md:hidden">
          <Link href="/" className="block py-2 hover:text-gray-300">Home</Link>
          {status === 'authenticated' ? (
            <>
              <Link href="/dashboard" className="block py-2 hover:text-gray-300">Dashboard</Link>
              <button onClick={() => signOut()} className="block py-2 hover:text-gray-300">Sign Out</button>
            </>
          ) : (
            <Link href="/auth/signin" className="block py-2 hover:text-gray-300">Sign In</Link>
          )}
        </div>
      )}
    </nav>
  );
}
