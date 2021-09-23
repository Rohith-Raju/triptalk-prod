import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/pages/login.module.css';
import GoogleButton from 'react-google-button';
import { useHistory } from 'react-router-dom';
import Slider from '../components/silder';
import gsap from 'gsap';

//module import

import { useAuth } from '../contexts/Authcontext';

const login = () => {
  const history = useHistory();
  const [error, seterror] = useState();
  var display = useRef();

  const { Googlesignup } = useAuth();

  const google_popup = async () => {
    try {
      await Googlesignup;
    } catch {
      seterror();
    }
  };

  useEffect(() => {
    gsap.to(display, {
      duration: 1,
      css: {
        opacity: 1,
      },
      delay: 2,
    });
  });

  return (
    <React.Fragment>
      <Slider page={'Sign in'} backgroundColor={'#e4cb58'} />
      <div ref={(e) => (display = e)} className={styles.display}>
        <nav className={styles.nav}>
          <img
            onClick={() => history.push('/')}
            src={process.env.PUBLIC_URL + '/icons/tt logo.png'}
            alt="logo"
          />
          <ul>
            <li>
              Not a member? <Link to="/signup">Sign up</Link>
            </li>
          </ul>
        </nav>
        <section className={styles.signin}>
          <div className={styles.sidebar}>
            <header>
              <h3>The world is you're Playground</h3>
            </header>
            <div className={styles.image}>
              <img src={process.env.PUBLIC_URL + '/images/plane.svg'} alt="" />
            </div>
          </div>
          <div className={styles.inputdiv}>
            <form>
              <h2>Sign in to Trip-Talk</h2>
              <GoogleButton onClick={Googlesignup} />
              <hr className={styles.borderline} />
              <label htmlFor="Email">Email</label>
              <input type="email" />
              <label htmlFor="Password">Password</label>
              <input type="password" />
              <input type="submit" value="Sign in" />
            </form>
          </div>
        </section>
      </div>
    </React.Fragment>
  );
};

export default login;
