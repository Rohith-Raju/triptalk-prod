import React, { useRef, useEffect } from 'react';
import Pink from '../components/pinkcontainer';
import { gsap, Power4 } from 'gsap';

import Navbar from '../components/Navbar';
import styles from '../styles/pages/homepage.module.css';

const Home = () => {
  let stagger = useRef();
  let cta = useRef();
  let carRef = useRef();

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
  });

  return (
    <React.Fragment>
      <Navbar />
      <div>
        <Pink />
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
        </div>
      </div>
    </React.Fragment>
  );
};
export default Home;
