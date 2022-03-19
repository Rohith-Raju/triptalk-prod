import React, { useRef, useEffect } from 'react';
import Pink from '../components/pinkcontainer';
import { gsap, Power4 } from 'gsap';

import Navbar from '../components/navbar';
import styles from '../styles/pages/homepage.module.css';

const Home = () => {
  let stagger = useRef();
  let cta = useRef();
  let carRef = useRef();
  let footerRef = useRef();

  useEffect(() => {
    gsap.set(stagger, { y: 100 });
    gsap.set(cta, { y: 50 });

    gsap.to(stagger, {
      y: 0,
      opacity: 1,
      delay: 1,
      ease: Power4.easeInOut,
    });

    gsap.to(cta, {
      y: 0,
      opacity: 1,
      delay: 1.3,
      duration: 0.5,
      ease: Power4.easeInOut,
    });
    gsap.set(carRef, { x: 10 });
    gsap.to(carRef, {
      x: 0,
      opacity: 1,
      delay: 1.5,
      duration: 1,
      ease: Power4.easeInOut,
    });
    gsap.to(footerRef, {
      opacity: 1,
      delay: 2,
      duration: 1,
    });
  });

  return (
    <React.Fragment>
      <Navbar />
      <Pink />
      <div className={styles.body}>
        <div className={styles.section}>
          <Pink />
          <section className={styles.hero}>
            <div className={styles.left}>
              <div className={styles.header}>
                <h1 ref={(e) => (stagger = e)} className={styles.heading}>
                  Make you're trips more Memorable
                </h1>
                <div ref={(e) => (cta = e)} className={styles.cta}>
                  <img src={process.env.PUBLIC_URL + '/icons/Ellipse.png'} />
                  <span>Get Started</span>
                </div>
              </div>
            </div>
            <div className={styles.right}>
              <img
                ref={(e) => (carRef = e)}
                className={styles.car}
                src={process.env.PUBLIC_URL + '/images/car_1.svg'}
                alt="car"
              ></img>
            </div>
          </section>
          <footer
            ref={(e) => {
              footerRef = e;
            }}
            className={styles.footer}
          >
            <p>
              Hi there, this application is STRICTLY not a product. This is a
              personal project made by student. Send an email to
              <span className={styles.mail}> meetrohithkraju@gmail.com </span>
              with feedback 😀;
            </p>
            <p>Created and maintained by Rohtih </p>
          </footer>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Home;
