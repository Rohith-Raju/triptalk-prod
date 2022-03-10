import React from 'react';
import { useAuth } from '../contexts/Authcontext';

import {
  writeBatch,
  getFirestore,
  where,
  query,
  collection,
} from 'firebase/firestore';

const onDelete = () => {
  const { currentuser } = useAuth();
  const db = getFirestore();
  const ref = collection(db, 'blog');

  const batch = writeBatch(db);

  const delteQuery = query(ref, where('Uid', '==', currentuser.uid));

  const deleted = batch.delete(delteQuery);

  return [deleted];
};

export default onDelete;
