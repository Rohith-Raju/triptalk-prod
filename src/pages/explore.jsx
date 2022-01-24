import React, { useState, useEffect } from 'react';
import Usernav from '../components/UserNavbar';
import styles from '../styles/pages/explore.module.css';
import { getDocs, getFirestore, collection } from 'firebase/firestore';

const Explore = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const db = getFirestore();
  useEffect(async () => {
    const fetchdata = [];
    const getall = await getDocs(collection(db, 'blog'));
    getall.forEach((doc) => {
      fetchdata.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    setData(fetchdata);
    setLoading(false);
  }, []);
  return (
    <React.Fragment>
      <Usernav />
      {!loading ? (
        <section className={styles.grid}>
          <div className={styles.itemone}>
            <a
              href="https://design.tutsplus.com/articles/international-artist-feature-malaysia--cms-26852"
              className={styles.card}
            >
              <div
                style={{
                  backgroundImage: `url(${data[0].Image})`,
                }}
                className={styles.thumb}
              ></div>
              <article>
                <h1>{data[0].Title}</h1>
                <p>{data[0].Description}</p>
                <span>📍{data[0].Location}</span>
              </article>
            </a>
          </div>
          {data.slice(1).map((key) => {
            return (
              <div key={key.id} className="item2">
                <a
                  href="https://webdesign.tutsplus.com/articles/how-to-conduct-remote-usability-testing--cms-27045"
                  className={styles.card}
                >
                  <div
                    className={styles.thumb}
                    style={{
                      backgroundImage: `url(${key.Image})`,
                    }}
                  ></div>
                  <article>
                    <h1>{key.Title}</h1>
                    <p>{key.Description}</p>
                    <span>📍{key.Location}</span>
                  </article>
                </a>
              </div>
            );
          })}
        </section>
      ) : (
        ''
      )}
    </React.Fragment>
  );
};

export default Explore;
