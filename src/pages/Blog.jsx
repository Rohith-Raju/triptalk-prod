import React, { useEffect, useState } from 'react';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { useHistory } from 'react-router-dom';
import { BsCalendar2Check } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';
import { GoLocation } from 'react-icons/go';
// import styles
import styles from '../styles/pages/blog.module.css';

//components
import Usernav from '../components/UserNavbar';

const Blog = ({
  match: {
    params: { id },
  },
}) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();

  const db = getFirestore();
  const history = useHistory();

  useEffect(async () => {
    try {
      const document = await getDoc(doc(db, 'blog', id));
      if (document.exists()) setData(document.data());
      else history.push('/404');
      setLoading(false);
    } catch (e) {
      setError(e);
    }
    return () => {
      document();
    };
  }, []);

  if (error) history.push('/404');

  return !loading ? (
    <div>
      <Usernav />
      <div className={styles.container}>
        <div className={styles.title}>
          <h1>{data.Title}</h1>
        </div>
        <div
          style={{
            backgroundImage: `url(${data.Image})`,
          }}
          className={styles.photodiv}
        ></div>
        <div className={styles.details}>
          <div className={styles.username}>
            <span className={styles.userspan}>
              <span>
                <FaUser />
              </span>
              {data.UserName}
            </span>
          </div>
          <div className={styles.calendar}>
            <span className={styles.calspan}>
              <BsCalendar2Check />
              <span>{data.Date}</span>
            </span>
          </div>
          <div className={styles.location}>
            <span className={styles.locspan}>
              <GoLocation />
              <span>{data.Location}</span>
            </span>
          </div>
        </div>
        <article
          dangerouslySetInnerHTML={{ __html: data.Body }}
          className={styles.body}
        ></article>
      </div>
    </div>
  ) : (
    ''
  );
};
export default Blog;
