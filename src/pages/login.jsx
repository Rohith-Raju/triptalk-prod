import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/pages/login.module.css';
import GoogleButton from 'react-google-button';
import { useHistory } from 'react-router-dom';
import gsap from 'gsap';

// components import

import Slider from '../components/Silder';
import { FormError } from '../components/FormError';

// custom  hooks import

import { useAuth } from '../contexts/Authcontext';

const login = () => {
  let emailref = useRef('');
  let passwordRef = useRef('');
  const history = useHistory();
  const [error, seterror] = useState({
    popup: false,
    emailPassword: false,
    message: '',
  });
  const { Googlesignup, emailPasswordSignIn } = useAuth();
  const [loading, setloading] = useState(false);
  var display = useRef();

  const google_popup = async () => {
    Googlesignup()
      .then(() => {
        history.push('/');
      })
      .catch((err) => {
        const errMessage = err.code.split('/')[1];
        seterror({
          popup: true,
          message: errMessage,
        });
      });
  };

  const formSubmit = (e) => {
    e.preventDefault();
    setloading(true);
    emailPasswordSignIn(emailref.value, passwordRef.value)
      .then((res) => {
        setloading(false);
        if (res) history.push('/explore');
      })
      .catch((err) => {
        setloading(false);
        const errMessage = err.code.split('/')[1];
        seterror({
          popup: true,
          message: errMessage,
        });
      });
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
            onClick={() => history.push('/home')}
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
              <img src={process.env.PUBLIC_URL + '/images/plane.svg'} />
            </div>
          </div>
          <div className={styles.inputdiv}>
            <form onSubmit={formSubmit}>
              <h2>Sign in to Trip-Talk</h2>
              <GoogleButton
                style={{
                  width: '100%',
                }}
                onClick={google_popup}
              />
              <hr className={styles.borderline} />
              {error.popup ? (
                <FormError message={error.message} />
              ) : error.emailPassword ? (
                <FormError message={error.message} />
              ) : null}
              <label htmlFor="Email">Email</label>
              <input ref={(e) => (emailref = e)} type="email" />
              <label htmlFor="Password">Password</label>
              <input ref={(e) => (passwordRef = e)} type="password" />
              <input disabled={loading} type="submit" value="Sign in" />
            </form>
          </div>
        </section>
      </div>
    </React.Fragment>
  );
};

export default login;
