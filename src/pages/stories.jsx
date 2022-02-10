import React, { useState, useEffect } from 'react';
import Usernav from '../components/UserNavbar';

import InfiniteScroll from 'react-infinite-scroll-component';
import {
  getDocs,
  query,
  getFirestore,
  collection,
  orderBy,
  limit,
  startAfter,
  where,
} from 'firebase/firestore';
import { useHistory } from 'react-router-dom';
import { GoLocation } from 'react-icons/go';

//react icons
import { ImCross } from 'react-icons/im';
import { MdDeleteForever, MdEdit } from 'react-icons/md';

//auth context import
import { useAuth } from '../contexts/Authcontext';

//styles import
import styles from '../styles/pages/explore.module.css';
import stories from '../styles/pages/stories.module.css';

const Stories = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasmore, setHasmore] = useState(true);
  const [documentSnapshot, setDocumentSnapshot] = useState();
  const [empty, setEmpty] = useState(true);
  const history = useHistory();
  const { currentuser } = useAuth();

  const db = getFirestore();
  const blogref = collection(db, 'blog');

  useEffect(async () => {
    const fetchdata = [];
    console.log(typeof currentuser.uid);
    const timestampQuery = query(
      blogref,
      where('Uid', '==', currentuser.uid),
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
    if (!getall.empty) setEmpty(false);
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
        console.log(doc);
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
        <h1> {empty ? 'No records found' : "You're Stories"} </h1>
        <div className={styles.cross}>
          {empty ? (
            <div className={stories.cross}>
              <ImCross color="#9F1D35" size={'10vw'} />
            </div>
          ) : (
            ''
          )}
        </div>
        {!loading ? (
          <InfiniteScroll
            dataLength={data.length}
            next={fetchNext}
            hasMore={hasmore}
          >
            <section className={styles.grid}>
              <div className={styles.itemone}>
                <a className={styles.card}>
                  <div
                    onClick={(e) => history.push(`/explore/${data[0].id}`)}
                    style={{
                      backgroundImage: `url(${data[0].Image})`,
                    }}
                    className={styles.thumb}
                  ></div>
                  <article>
                    <div
                      onClick={(e) => history.push(`/explore/${data[0].id}`)}
                    >
                      <h1>{data[0].Title}</h1>
                      <p>{data[0].Description}</p>
                    </div>

                    <div className={stories.iconsdiv}>
                      <span className={stories.location}>
                        <GoLocation size={'max(1rem,2vw)'} />
                        {data[0].Location}
                      </span>
                      <span className={stories.extra}>
                        <MdDeleteForever
                          onMouseEnter={({ target }) =>
                            (target.style.color = '#9F1D35')
                          }
                          onMouseLeave={({ target }) => {
                            target.style.color = '';
                          }}
                          style={{
                            cursor: 'pointer',
                          }}
                          size={'max(1rem,2vw)'}
                        />
                        <MdEdit
                          onMouseEnter={({ target }) =>
                            (target.style.color = '#318CE7')
                          }
                          onMouseLeave={({ target }) => {
                            target.style.color = '';
                          }}
                          style={{
                            cursor: 'pointer',
                          }}
                          size={'max(1rem,2vw)'}
                        />
                      </span>
                    </div>
                  </article>
                </a>
              </div>
              {data.slice(1).map((key) => {
                return (
                  <div key={key.id}>
                    <a className={styles.card}>
                      <div
                        onClick={() => history.push(`/explore/${key.id}`)}
                        className={styles.thumb}
                        style={{
                          backgroundImage: `url(${key.Image})`,
                        }}
                      ></div>
                      <article>
                        <div onClick={() => history.push(`/explore/${key.id}`)}>
                          <h1>{key.Title}</h1>
                          <p>{key.Description}</p>
                        </div>
                        <div className={stories.iconsdiv}>
                          <span className={stories.location}>
                            <GoLocation size={'max(1rem,1.8vw)'} />
                            {key.Location}
                          </span>
                          <span className={stories.extrasmall}>
                            <MdDeleteForever
                              style={{
                                cursor: 'pointer',
                              }}
                              onMouseEnter={({ target }) =>
                                (target.style.color = '#9F1D35')
                              }
                              onMouseLeave={({ target }) => {
                                target.style.color = '';
                              }}
                              onClick={() => history.push('/delete')}
                              size={'max(1rem,1.8vw)'}
                            />
                            <MdEdit
                              style={{
                                cursor: 'pointer',
                              }}
                              onMouseEnter={({ target }) =>
                                (target.style.color = '#318CE7')
                              }
                              onMouseLeave={({ target }) => {
                                target.style.color = '';
                              }}
                              size={'max(1rem,1.8vw)'}
                            />
                          </span>
                        </div>
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

export default Stories;
