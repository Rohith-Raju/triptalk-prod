import React from 'react';
import Usernav from '../components/UserNavbar';
import styles from '../styles/pages/explore.module.css';

const Explore = () => {
  return (
    <React.Fragment>
      <Usernav />
      <section className={styles.grid}>
        <div className={styles.itemone}>
          <a
            href="https://design.tutsplus.com/articles/international-artist-feature-malaysia--cms-26852"
            className={styles.card}
          >
            <div className={styles.thumb}></div>
            <article>
              <h1>International Artist Feature: Malaysia</h1>
              <span>Mary Winkler</span>
            </article>
          </a>
        </div>
        <div class="item-2">
          <a
            href="https://webdesign.tutsplus.com/articles/how-to-conduct-remote-usability-testing--cms-27045"
            className={styles.card}
          >
            <div
              className={styles.thumb}
              style={{
                backgroundImage:
                  'url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/users-2.png)',
              }}
            ></div>
            <article>
              <h1>How to Conduct Remote Usability Testing</h1>
              <span>Harry Brignull</span>
            </article>
          </a>
        </div>
        <div class="item-2">
          <a
            href="https://webdesign.tutsplus.com/articles/how-to-conduct-remote-usability-testing--cms-27045"
            className={styles.card}
          >
            <div
              className={styles.thumb}
              style={{
                backgroundImage:
                  'url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/users-2.png)',
              }}
            ></div>
            <article>
              <h1>How to Conduct Remote Usability Testing</h1>
              <span>Harry Brignull</span>
            </article>
          </a>
        </div>
        <div class="item-2">
          <a
            href="https://webdesign.tutsplus.com/articles/how-to-conduct-remote-usability-testing--cms-27045"
            className={styles.card}
          >
            <div
              className={styles.thumb}
              style={{
                backgroundImage:
                  'url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/users-2.png)',
              }}
            ></div>
            <article>
              <h1>How to Conduct Remote Usability Testing</h1>
              <span>Harry Brignull</span>
            </article>
          </a>
        </div>
        <div class="item-2">
          <a
            href="https://webdesign.tutsplus.com/articles/how-to-conduct-remote-usability-testing--cms-27045"
            className={styles.card}
          >
            <div
              className={styles.thumb}
              style={{
                backgroundImage:
                  'url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/users-2.png)',
              }}
            ></div>
            <article>
              <h1>How to Conduct Remote Usability Testing</h1>
              <span>Harry Brignull</span>
            </article>
          </a>
        </div>
        <div class="item-2">
          <a
            href="https://webdesign.tutsplus.com/articles/how-to-conduct-remote-usability-testing--cms-27045"
            className={styles.card}
          >
            <div
              className={styles.thumb}
              style={{
                backgroundImage:
                  'url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/users-2.png)',
              }}
            ></div>
            <article>
              <h1>How to Conduct Remote Usability Testing</h1>
              <span>Harry Brignull</span>
            </article>
          </a>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Explore;
