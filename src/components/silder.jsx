import React, { useEffect, useRef } from 'react';
import { gsap, Power3 } from 'gsap';
import '../styles/commponents/slider.css';

const slider = (props) => {
  let loadref = new useRef();
  let pageref = new useRef();

  useEffect(() => {
    const t1 = new gsap.timeline();
    t1.to(loadref, {
      duration: 1.2,
      height: '100%',
      top: '0%',
      ease: Power3.easeInOut,
    });
    t1.to(loadref, {
      duration: '1.2',
      top: '100%',
      ease: Power3.easeInOut,
      delay: 0.2,
    });
    t1.set(loadref, { left: '-100%' });

    const t2 = new gsap.timeline();

    t2.set(pageref, {
      css: {
        top: '100px',
        opacity: 0,
      },
    });
    t2.to(pageref, {
      duration: 1,
      css: {
        top: '0px',
        opacity: 1,
      },
    }).delay(0.5);

    t2.to(pageref, {
      duration: 0.5,
      css: {
        opacity: '0',
      },
    });
    return () => {};
  }, []);

  return (
    <React.Fragment>
      <div className="load-container">
        <div
          style={{ backgroundColor: props.backgroundColor }}
          className="load-screen1"
          ref={(el) => (loadref = el)}
        ></div>
      </div>
      <div ref={(el) => (pageref = el)} className="page">
        <h1>{props.page}</h1>
      </div>
    </React.Fragment>
  );
};

export default slider;
