import React from 'react';
import styles from '../styles/commponents/navbar.module.css';

const navbar = () => {
  return (
    <React.Fragment>
      <nav className={styles.navbar}>
        <img
          className={styles.logo}
          src={process.env.PUBLIC_URL + '/icons/tt logo.png'}
          alt=""
        />
        <a className={styles.links} href="/">
          Explore
        </a>
        <a className={styles.links} href="/stories">
          Your Stories
        </a>
        <a className={styles.links} href="/create">
          Create
        </a>
        <a></a>
        <button className={styles.login}>
          <span>Login/Signin</span>
        </button>
      </nav>
    </React.Fragment>
  );
};
export default navbar;
