import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {useState, useRef, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setStateQuery} from "../thunks/productsThunk";

export default function Header() {
  const {pathname} = useLocation()
  const [active, setActive] = useState(false);
  const [query, setQuery] = useState('');
  const searchInput  = useRef(null);

  const navigate = useNavigate()

  const dispatch = useDispatch();
  const totalItems = useSelector(state => state.cart.totalItems)

  useEffect(() => {
    active && searchInput.current.focus();
  })

  const handleSearchTogglerClick = () => {
    setActive(active => !active);
    active && navigate('/ra16-diploma/catalog')
    dispatch(setStateQuery(query));
    setQuery('')
  }

  return (
    <header className="container">
      <div className="row">
        <div className="col">
          <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <a className="navbar-brand" href="/">
              <img src="/ra16-diploma/img/header-logo.png" alt="Bosa Noga" />
            </a>
            <div className="collapase navbar-collapse" id="navbarMain">
              <ul className="navbar-nav mr-auto">
                <li className={`nav-item${pathname === '/ra16-diploma/' ? ' active' : ''}`}>
                  <NavLink to="/ra16-diploma/" className="nav-link">Главная</NavLink>
                </li>
                <li className={`nav-item${pathname === '/ra16-diploma/catalog' ? ' active' : ''}`}>
                  <NavLink className="nav-link" to="/ra16-diploma/catalog">Каталог</NavLink>
                </li>
                <li className={`nav-item${pathname === '/ra16-diploma/about' ? ' active' : ''}`}>
                  <NavLink className="nav-link" to="/ra16-diploma/about">О магазине</NavLink>
                </li>
                <li className={`nav-item${pathname === '/ra16-diploma/contacts' ? ' active' : ''}`}>
                  <NavLink className="nav-link" to="/ra16-diploma/contacts">Контакты</NavLink>
                </li>
              </ul>
              <div>
                <div className="header-controls-pics">
                  <div onClick={handleSearchTogglerClick} data-id="search-expander" className="header-controls-pic header-controls-search"></div>
                  <div className="header-controls-pic header-controls-cart">
                    {totalItems && totalItems > 0 ? <div className="header-controls-cart-full">{totalItems}</div> : ''}
                    <div className="header-controls-cart-menu"></div>
                  </div>
                </div>
                <form data-id="search-form" className={`header-controls-search-form form-inline${active ? '' : ' invisible'}`}>
                  <input className="form-control" placeholder="Поиск" value={query} ref={searchInput} onChange={(e) => setQuery(e.target.value)} />
                </form>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
