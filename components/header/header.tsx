import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <header>
      <nav>
        <div className="navbar justify-between bg-base-300">
          <Link href="/" className="btn btn-ghost text-lg">
            Next JS 14 Ecommerce
          </Link>
          <ul className="flex">
            <li>
              <Link href="/cart" className="btn btn-ghost rounded-btn">
                Cart
              </Link>
            </li>
            <li>
              <Link href="/cart" className="btn btn-ghost rounded-btn">
                Sign in
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Header
