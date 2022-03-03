import React, { useRef, useState } from 'react';
import styles from '../styles/commponents/navbar.module.css';
import { useHistory } from 'react-router-dom';
import { gsap } from 'gsap';
import { useAuth } from '../contexts/Authcontext';

const Usernav = () => {
  const history = useHistory();
  const [clicked, setclicked] = useState(false);
  let popref = useRef('');

  //userhooks
  const { Signout, currentuser } = useAuth();

  let user = currentuser.displayName;

  if (user !== null) user = currentuser.displayName.toUpperCase().split(' ')[0];
  else user = currentuser.email.toUpperCase().slice(0, 6) + '...';

  const avatar = `https://avatars.dicebear.com/api/micah/${user}.svg?happy&background=%230000ff`;

  const handleSignOut = () => {
    Signout();
    history.push('/');
  };

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
          onClick={() => history.push('/home')}
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
        <div className={styles.avtContainer}>
          <img
            onClick={handlePopover}
            className={styles.avatar}
            src={avatar}
            alt="profile"
          />
          <div ref={(e) => (popref = e)} className={styles.popover}>
            <img className={styles.inneravatar} src={avatar} />
            <h4>{user}</h4>
            <div className={styles.profileBtn}>
              <a onClick={handleSignOut}>Logout</a>
            </div>
            <div className={styles.userLinks}>
              <div className={styles.Settings}>
                <a className={styles.animlink} href="/home">
                  Home
                </a>
              </div>
              <div className={styles.terms}>
                <a className={styles.animlink} href="/terms">
                  About Creator
                </a>
              </div>
              <div className={styles.signout}>
                <a className={styles.animlink}>Delete Account</a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Usernav;
