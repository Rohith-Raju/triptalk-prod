import React, { useContext, createContext } from 'react';
import app from '../firebase';
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';

const auth = getAuth(app);

const Authcontext = createContext();

export function useAuth() {
  return useContext(Authcontext);
}

export const Authprovider = ({ children }) => {
  const Googlesignup = () => {
    const google = new GoogleAuthProvider();
    return signInWithPopup(auth, google);
  };

  const emailPassword = () => {
    signInWithEmailAndPassword(auth, email, password).then(user);
  };

  const value = {
    Googlesignup,
    emailPassword,
  };

  return <Authcontext.Provider value={value}>{children}</Authcontext.Provider>;
};
