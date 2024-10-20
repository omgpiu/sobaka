import { Outlet, NavLink } from 'react-router-dom';
import styles from './style.module.css'
import { useAuth } from '../../context';

export const BaseLayout = () => {

  const { logout } = useAuth()

  return (
    <>
      <header className={ styles.header }>
        <nav>
          <ul className={ styles.navList }>
            <li><NavLink to="/" className={ ({ isActive }) => (isActive ? styles.active : '') }>Main</NavLink></li>
            <li><NavLink to="/templates"
                         className={ ({ isActive }) => (isActive ? styles.active : '') }>Templates</NavLink></li>
            <span className={ styles.divider }/>
            <li>
              <button className={ styles.button } onClick={ logout }>Logout</button>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet/>
      </main>
    </>
  );
};