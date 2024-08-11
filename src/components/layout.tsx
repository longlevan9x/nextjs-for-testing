'use client'
 
import { usePathname } from 'next/navigation'
import Nav from './nav';

const routeNotShowNav = ['/', '', '/login', '/register'];
export default function Layout({ children }: any) {
  const pathname = usePathname();
  let navElem = null;
 
  if (!routeNotShowNav.includes(pathname)) {
    navElem = <Nav></Nav>
  }

  return (
    <div>
      {navElem}
      <main >
        {children}
      </main>
    </div>
  );
}
