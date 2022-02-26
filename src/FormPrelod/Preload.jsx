import React, { useEffect, useState } from 'react';

import Update from '../pages/Update';

//firestore imports
import { getDoc, doc, getFirestore } from 'firebase/firestore';

//initialize firebase

const db = getFirestore();

const Preload = ({
  match: {
    params: { id },
  },
}) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  //useEffect to fetch data
  useEffect(async () => {
    try {
      const document = await getDoc(doc(db, 'blog', id));
      if (document.exists()) {
        setData(document.data());
      } else history.push('/404');
    } catch (e) {
      setError(e);
    }
    return () => document();
  }, []);

  return data ? <Update id={id} PreError={error} data={data} /> : 'loading';
};

export default Preload;
