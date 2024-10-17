import { Outlet, Link } from 'react-router-dom';
import styles from './style.module.css'

export const BaseLayout = () => {
  return (
    <>
      <header className={ styles.header }>
        <nav>
          <ul className={ styles.navList }>
            <li><Link to="/">Main</Link></li>
            <li><Link to="/templates">Templates</Link></li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet/>
      </main>
    </>
  );
};