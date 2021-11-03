// modules import
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import GoogleButton from 'react-google-button';
import { useHistory } from 'react-router-dom';
import gsap from 'gsap';

// styles
import styles from '../styles/pages/login.module.css';

// components and contexts import
import Slider from '../components/Silder';
import FormError from '../components/FormError';

//custom hooks import
import { useAuth } from '../contexts/Authcontext';

const Signup = () => {
  const history = useHistory();
  const [error, seterror] = useState({
    popup: false,
    emailPassword: false,
    message: '',
  });
  const [btnloading, setbuttonloading] = useState();

  // refs

  var display = useRef();
  var emailRef = useRef();
  var passwordRef = useRef();

  //contexts

  const { Googlesignup, emailPasswordSignUp } = useAuth();

  // google popup

  const google_popup = async () => {
    Googlesignup()
      .then((res) => {
        history.push('/explore');
      })
      .catch((err) => {
        const errorMessage = err.code.split('/')[1];
        seterror({ popup: true, message: errorMessage });
      });
  };

  //creating users / signup

  const handleSubmit = (e) => {
    e.preventDefault();
    setbuttonloading(true);
    emailPasswordSignUp(emailRef.value, passwordRef.value)
      .then((res) => {
        history.push('/explore');
        setbuttonloading(false);
      })
      .catch((err) => {
        setbuttonloading(false);
        const errorMessage = err.code.split('/')[1];
        seterror({
          emailPassword: true,
          message: errorMessage,
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
      <Slider page={'Sign Up'} backgroundColor={'#50b7d6'} />
      <div ref={(e) => (display = e)} className={styles.display}>
        <nav className={styles.nav}>
          <img
            onClick={() => history.push('/')}
            src={process.env.PUBLIC_URL + '/icons/tt logo.png'}
            alt="logo"
          />
          <ul>
            <li>
              Are you a member? <Link to="/signin">Sign In</Link>
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
            <form onSubmit={handleSubmit}>
              <h2>Sign Up to Trip-Talk</h2>
              <GoogleButton onClick={google_popup} />
              <hr className={styles.borderline} />
              {error.popup ? (
                <FormError message={error.message} />
              ) : error.emailPassword ? (
                <FormError message={error.message} />
              ) : null}
              <label htmlFor="Email">Email</label>
              <input ref={(e) => (emailRef = e)} type="email" />
              <label htmlFor="Password">Password</label>
              <input ref={(e) => (passwordRef = e)} type="password" />
              <input disabled={btnloading} type="submit" value="Sign Up" />
            </form>
          </div>
        </section>
      </div>
    </React.Fragment>
  );
};

export default Signup;
