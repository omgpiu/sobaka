import { Outlet,  NavLink } from 'react-router-dom';
import styles from './style.module.css'

export const BaseLayout = () => {
  return (
    <>
      <header className={ styles.header }>
        <nav>
          <ul className={ styles.navList }>
            <li><NavLink to="/" className={({ isActive }) => (isActive ? styles.active : '')}>Main</NavLink></li>
            <li><NavLink to="/templates" className={({ isActive }) => (isActive ? styles.active : '')}>Templates</NavLink></li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet/>
      </main>
    </>
  );
};