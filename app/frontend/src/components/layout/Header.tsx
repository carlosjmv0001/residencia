'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'

export function Header() {
  const { data: session } = useSession()

  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">RNP Residência</Link>
        <ul className="flex space-x-4">
          <li><Link href="/">Home</Link></li>
          {session ? (
            <>
              <li><Link href="/dashboard">Dashboard</Link></li>
              <li><button onClick={() => signOut()}>Sign Out</button></li>
            </>
          ) : (
            <>
              <li><Link href="/auth/signin">Sign In</Link></li>
              <li><Link href="/auth/register">Register</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  )
}
