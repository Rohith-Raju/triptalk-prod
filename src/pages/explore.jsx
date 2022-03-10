import React, { useState, useEffect } from 'react';
import Usernav from '../components/UserNavbar';
import styles from '../styles/pages/explore.module.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  getDocs,
  query,
  getFirestore,
  collection,
  orderBy,
  limit,
  startAfter,
} from 'firebase/firestore';
import { useHistory } from 'react-router-dom';
import { GoLocation } from 'react-icons/go';

const Explore = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasmore, setHasmore] = useState(true);
  const [documentSnapshot, setDocumentSnapshot] = useState();
  const history = useHistory();

  const db = getFirestore();
  const blogref = collection(db, 'blog');

  useEffect(async () => {
    const fetchdata = [];
    const timestampQuery = query(
      blogref,
      orderBy('Timestamp', 'desc'),
      limit(3)
    );
    const getall = await getDocs(timestampQuery);
    getall.forEach((doc) => {
      fetchdata.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    setData(fetchdata);
    setDocumentSnapshot(getall);
    setLoading(false);
    return () => {
      getall();
    };
  }, []);

  const fetchNext = async () => {
    const nextdata = [];
    const lastDoc = documentSnapshot.docs[documentSnapshot.size - 1];
    const nextQuery = query(
      blogref,
      orderBy('Timestamp', 'desc'),
      startAfter(lastDoc),
      limit(4)
    );
    const getNext = await getDocs(nextQuery);
    if (getNext.empty) {
      setHasmore(false);
    } else {
      getNext.forEach((doc) => {
        nextdata.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setDocumentSnapshot(getNext);
      setData(data.concat(nextdata));
    }
  };

  return (
    <React.Fragment>
      <Usernav />
      <div className={styles.container}>
        <h1>Top Stories</h1>
        {!loading ? (
          <InfiniteScroll
            dataLength={data.length}
            next={fetchNext}
            hasMore={hasmore}
          >
            <section className={styles.grid}>
              <div
                onClick={(e) => history.push(`/explore/${data[0].id}`)}
                className={styles.itemone}
              >
                <a className={styles.card}>
                  <div
                    style={{
                      backgroundImage: `url(${data[0].Image})`,
                    }}
                    className={styles.thumb}
                  ></div>
                  <article>
                    <h1>{data[0].Title}</h1>
                    <p>{data[0].Description}</p>
                    <span className={styles.location}>
                      <GoLocation />
                      {data[0].Location}
                    </span>
                  </article>
                </a>
              </div>
              {data.slice(1).map((key) => {
                return (
                  <div
                    onClick={(e) => history.push(`/explore/${key.id}`)}
                    key={key.id}
                  >
                    <a className={styles.card}>
                      <div
                        className={styles.thumb}
                        style={{
                          backgroundImage: `url(${key.Image})`,
                        }}
                      ></div>
                      <article>
                        <h1>{key.Title}</h1>
                        <p>{key.Description}</p>
                        <span className={styles.location}>
                          <GoLocation />
                          {key.Location}
                        </span>
                      </article>
                    </a>
                  </div>
                );
              })}
            </section>
          </InfiniteScroll>
        ) : (
          ''
        )}
      </div>
    </React.Fragment>
  );
};

export default Explore;
