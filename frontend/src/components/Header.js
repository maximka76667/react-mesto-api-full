import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import menu from '../images/menu-icon.png'
import close from '../images/close-icon.svg'

function Header(props) {
  const location = useLocation();

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isMenuAllowed, setIsMenuAllowed] = React.useState(false);

  function toggleMenu() {
    if(isMenuOpen) {
      setIsMenuOpen(false);
    } else {
      setIsMenuOpen(true);
    }
  }

  function checkResize() {
    if(window.innerWidth < 500) {
      setIsMenuAllowed(true);
    } else {
      setIsMenuAllowed(false);
      setIsMenuOpen(false);
    }
  }

  function handleLogoutClick() {
    setIsMenuOpen(false);
    props.onLogout();
  }

  React.useEffect(() => {
    window.addEventListener("resize", checkResize);
    checkResize();
  }, [])

  return (
    <header className="header">
      <div className={`header__menu ${isMenuOpen ? 'header__menu_opened' : ''}`}>
        <p className="header__login">{props.email}</p>
        <Link to="/sign-in" className="header__link header__link_logged-in" onClick={handleLogoutClick}>Выйти</Link>
      </div>
      <div className="header__container">
        <a href="/" className="logo" rel="noreferrer" target="_blank"> </a>
        { (() => {
          switch (location.pathname) {
            case '/sign-in':
              return <Link to="/sign-up" className="header__link">Регистрация</Link>

            case '/sign-up':
              return <Link to="/sign-in" className="header__link">Войти</Link>

            case '/':
              return (
                <>
                  <p className={`header__login ${isMenuAllowed ? 'header__login_hidden' : ''}`}>{props.email}</p>
                  <Link to="/sign-in" className={`header__link header__link_logged-in ${isMenuAllowed ? 'header__link_hidden' : ''}`} onClick={handleLogoutClick}>Выйти</Link>
                  <button className="header__menu-button" onClick={toggleMenu}>
                    <img src={isMenuOpen ? close : menu} alt="Меню" />
                  </button>
                </>
              )

            default:
              return <Link to="/" className="header__link">Ссылка</Link>
          }
        })()
        }
      </div>
    </header>
  )
}

export default Header;