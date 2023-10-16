import React, { useEffect, useState } from 'react'
import DesktopNavbar from './DesktopNavbar'
import MobileNavbar from './MobileNavbar'

const Header = () => {
  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 768px)").matches
  )

  useEffect(() => {
    window
    .matchMedia("(min-width: 768px)")
    .addEventListener('change', e => setMatches( e.matches ));
  }, []);
  return (
    <header className='navbar'>
      {matches && <DesktopNavbar/>}
      {!matches && <MobileNavbar/>}
    </header>
  )
}

export default Header
