import React, { useRef, useState } from 'react';
import styles from '../styles/commponents/navbar.module.css';
import { useHistory } from 'react-router-dom';
import { gsap } from 'gsap';
import { useAuth } from '../contexts/Authcontext';

//mui dialog imports
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

//deleting a user
import {
  writeBatch,
  getFirestore,
  where,
  query,
  collection,
  getDocs,
} from 'firebase/firestore';

import { getStorage, ref, deleteObject } from 'firebase/storage';

const Usernav = () => {
  const history = useHistory();
  const [clicked, setclicked] = useState(false);
  let popref = useRef('');

  //states for dialogs
  const [logout, setLogout] = useState(false);
  const [deleteUser, setDeleteUser] = useState(false);

  //userhooks
  const { Signout, currentuser, DeleteUser, reAuthenticate } = useAuth();

  let user = currentuser.displayName;

  if (user !== null) user = currentuser.displayName.toUpperCase().split(' ')[0];
  else user = currentuser.email.toUpperCase().slice(0, 6) + '...';

  const avatar = `https://avatars.dicebear.com/api/micah/${user}.svg?happy&background=%230000ff`;

  const handleSignOut = () => {
    Signout();
  };

  const handlePopover = () => {
    if (!clicked) {
      gsap.to(popref, {
        opacity: 1,
        pointerEvents: 'all',
        duration: 0.3,
      });
      setclicked(true);
    }
    if (clicked) {
      gsap.to(popref, {
        opacity: 0,
        pointerEvents: 'none',
        duration: 0.3,
      });
      setclicked(false);
    }
  };

  const handleDeleteUser = async () => {
    reAuthenticate()
      .then(async () => {
        const storage = getStorage();
        const db = getFirestore();
        const dbref = collection(db, 'blog');
        const batch = writeBatch(db);
        const delteQuery = query(dbref, where('Uid', '==', currentuser.uid));
        const docs = await getDocs(delteQuery);
        docs.forEach((doc) => {
          const storageRef = ref(storage, doc.data().Imagepath);
          deleteObject(storageRef);
          batch.delete(doc.ref);
        });
        DeleteUser();
        setDeleteUser(false);
        return batch.commit();
      })
      .catch((err) => setError(err));
  };

  return (
    <React.Fragment>
      {/* dialog code for logout */}
      <Dialog
        open={logout}
        onClose={() => setLogout(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Logout from Trip-Talk</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setLogout(false);
            }}
          >
            Cancel
          </Button>
          <Button
            color="error"
            variant="outlined"
            onClick={handleSignOut}
            autoFocus
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={deleteUser}
        onClose={() => setDeleteUser(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to delete you're account
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Beware, if you delete you're account all data will be lost. Are you
            sure you want to delete you're account
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setDeleteUser(false);
            }}
          >
            Cancel
          </Button>
          <Button
            color="error"
            variant="outlined"
            onClick={handleDeleteUser}
            autoFocus
          >
            Delete Account
          </Button>
        </DialogActions>
      </Dialog>
      <nav className={styles.navbar}>
        <img
          onClick={() => history.push('/home')}
          className={styles.logo}
          src={process.env.PUBLIC_URL + '/icons/ttlogo.png'}
          alt="triptalk logo"
        />
        <a className={styles.links} href="/">
          Explore
        </a>
        <a className={styles.links} href="/stories">
          Your Stories
        </a>
        <a className={styles.links} href="/create">
          Create
        </a>
        <div className={styles.avtContainer}>
          <img
            onClick={handlePopover}
            className={styles.avatar}
            src={avatar}
            alt="profile"
          />
          <div ref={(e) => (popref = e)} className={styles.popover}>
            <img className={styles.inneravatar} src={avatar} />
            <h4>{user}</h4>
            <div className={styles.profileBtn}>
              <a onClick={() => setLogout(true)}>Logout</a>
            </div>
            <div className={styles.userLinks}>
              <div className={styles.Settings}>
                <a className={styles.animlink} href="/home">
                  Home
                </a>
              </div>
              <div className={styles.terms}>
                <a
                  className={styles.animlink}
                  href="https://www.linkedin.com/in/rohith-raju-11250a19b"
                >
                  About Creator
                </a>
              </div>
              <div className={styles.signout}>
                <a
                  onClick={() => setDeleteUser(true)}
                  className={styles.animlink}
                >
                  Delete Account
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Usernav;
