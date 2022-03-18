import React, { useState, useEffect } from 'react';
import Usernav from '../components/UserNavbar';

import InfiniteScroll from 'react-infinite-scroll-component';

//firestore
import {
  getDocs,
  query,
  getFirestore,
  collection,
  orderBy,
  limit,
  startAfter,
  where,
  deleteDoc,
  doc,
} from 'firebase/firestore';

import { deleteObject, ref, getStorage } from 'firebase/storage';

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

//mui dialog imports
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Stories = () => {
  //dialog states
  const [dialog, setDialog] = useState(false);

  //other data
  const [data, setData] = useState('');
  const [deletePost, setDeletePost] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hasmore, setHasmore] = useState(true);
  const [documentSnapshot, setDocumentSnapshot] = useState();
  const [empty, setEmpty] = useState(false);
  const history = useHistory();
  const { currentuser } = useAuth();

  //databse initilization and referencing
  const db = getFirestore();
  const storage = getStorage();

  const blogRef = collection(db, 'blog');

  const handleDocumentDelete = async () => {
    if (deletePost) {
      const imageDoc = data.filter((key) => key.id === deletePost)[0];
      const imagepath = imageDoc.Imagepath;
      const storageref = ref(storage, imagepath);
      const ImageDeleted = deleteObject(storageref);
      const DocDeleted = deleteDoc(doc(db, 'blog', deletePost));
      Promise.all([ImageDeleted, DocDeleted]).then(() => {
        const newData = data.filter((key) => key.id != deletePost);
        if (newData.length === 0) setEmpty(true);
        setData(newData);
        setDeletePost(false);
        setDialog(false);
      });
    }
  };

  useEffect(async () => {
    const fetchdata = [];
    const timestampQuery = query(
      blogRef,
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
    console.log(getall);
    if (getall.empty) setEmpty(true);
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
      blogRef,
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
      {/* dialog code for delete  */}
      <Dialog
        open={dialog}
        onClose={() => setDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Are you sure you want to delete this post?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Beware,the post once deleted cannot be recoverd. Please make sure
            you're deleting the right post
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setDialog(false);
              setDeletePost(false);
            }}
          >
            Cancel
          </Button>
          <Button
            color="error"
            variant="outlined"
            onClick={handleDocumentDelete}
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Usernav />
      <div className={styles.container}>
        <h1> {empty ? 'No records found' : "You're Stories"} </h1>
        {empty ? (
          <div className={styles.cross}>
            <div className={stories.cross}>
              <ImCross color="#9F1D35" size={'10vw'} />
            </div>
          </div>
        ) : !loading ? (
          <InfiniteScroll
            dataLength={data.length}
            next={fetchNext}
            hasMore={hasmore}
          >
            <section className={styles.grid}>
              <div className={styles.itemone}>
                <a className={styles.card}>
                  <div
                    onClick={() => history.push(`/explore/${data[0].id}`)}
                    style={{
                      backgroundImage: `url('${data[0].Image}')`,
                    }}
                    className={styles.thumb}
                  ></div>
                  <article>
                    <div onClick={() => history.push(`/explore/${data[0].id}`)}>
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
                          onClick={() => {
                            setDialog(true);
                            setDeletePost(data[0].id);
                          }}
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
                          onClick={() => history.push(`/update/${data[0].id}`)}
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
                          backgroundImage: `url('${key.Image}')`,
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
                              size={'max(1rem,1.8vw)'}
                              onClick={() => {
                                setDialog(true);
                                setDeletePost(key.id);
                              }}
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
                              onClick={() => history.push(`/update/${key.id}`)}
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
