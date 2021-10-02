import React, { useContext, createContext, useEffect, useState } from 'react';
import app from '../firebase';
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

const auth = getAuth(app);

const Authcontext = createContext();

export function useAuth() {
  return useContext(Authcontext);
}

export const Authprovider = ({ children }) => {
  const [currentuser, setcurrentuser] = useState();
  const [loading, setloading] = useState(true);

  const Googlesignup = () => {
    const google = new GoogleAuthProvider();
    return signInWithPopup(auth, google);
  };

  const emailPasswordSignIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const emailPasswordSignUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setcurrentuser(user);
      setloading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentuser,
    Googlesignup,
    emailPasswordSignIn,
    emailPasswordSignUp,
  };
  return (
    <Authcontext.Provider value={value}>
      {!loading && children}
    </Authcontext.Provider>
  );
};
