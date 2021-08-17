import React, { useEffect, useRef } from 'react';
import { gsap, Power4 } from 'gsap';
import styles from '../styles/commponents/pink.module.css';

const Pink = (color) => {
  let pink = useRef();

  useEffect(() => {
    gsap.to(pink, {
      duration: 1,
      width: '50%',
      ease: Power4.easeOut,
      delay: 0.5,
    });
  });

  return (
    <div>
      <div ref={(e) => (pink = e)} className={styles.pink}></div>
    </div>
  );
};
export default Pink;
