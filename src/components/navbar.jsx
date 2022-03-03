import React from 'react';
import styles from '../styles/commponents/navbar.module.css';
import { useHistory } from 'react-router-dom';

const navbar = () => {
  const history = useHistory();
  return (
    <React.Fragment>
      <nav className={styles.navbar}>
        <img
          className={styles.logo}
          src={process.env.PUBLIC_URL + '/icons/tt logo.png'}
          alt="triptalk logo"
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
        <button
          onClick={() => history.push('/signin')}
          className={styles.login}
        >
          <span>Login/Signup</span>
        </button>
      </nav>
    </React.Fragment>
  );
};
export default navbar;
