import React, { useRef, useState } from 'react';
import styles from '../styles/commponents/navbar.module.css';
import { useHistory } from 'react-router-dom';
import { gsap } from 'gsap';

const Usernav = () => {
  const history = useHistory();
  const [clicked, setclicked] = useState(false);
  let popref = useRef('');

  const handlePopover = () => {
    if (!clicked) {
      gsap.to(popref, {
        opacity: 1,
        pointerEvents: 'all',
        duration: 0.3,
      });
      setclicked(true);
    }
    if (clicked) {
      gsap.to(popref, {
        opacity: 0,
        pointerEvents: 'none',
        duration: 0.3,
      });
      setclicked(false);
    }
  };

  return (
    <React.Fragment>
      <nav className={styles.navbar}>
        <img
          className={styles.logo}
          src={process.env.PUBLIC_URL + '/icons/tt logo.png'}
          alt="triptalk logo"
        />
        <a className={styles.links} href="/explore">
          Explore
        </a>
        <a className={styles.links} href="/stories">
          Your Stories
        </a>
        <a className={styles.links} href="/create">
          Create
        </a>
        <div className={styles.avtContainer}>
          <img
            onClick={handlePopover}
            className={styles.avatar}
            src="https://avatars.dicebear.com/api/micah/rah.svg?background=%230000ff"
            alt="profile"
          />
          <div ref={(e) => (popref = e)} className={styles.popover}>
            <img
              className={styles.inneravatar}
              src="https://avatars.dicebear.com/api/micah/rah.svg?background=%230000ff"
              alt=""
            />
            <h3>Rohtih Raju</h3>
            <div className={styles.profileBtn}>
              <a href="/edit">Edit profile</a>
            </div>
            <div className={styles.userLinks}>
              <div className={styles.Settings}>
                <a href="/accountset">Account Settings</a>
              </div>
              <div className={styles.terms}>
                <a href="/terms">Terms</a>
              </div>
              <div className={styles.signout}>
                <a onClick={console.log('signout')} href="/signout">
                  Signout
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Usernav;
