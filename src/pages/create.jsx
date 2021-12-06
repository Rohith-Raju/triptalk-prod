//modules
import React, { useState } from 'react';
import { usePlacesWidget } from 'react-google-autocomplete';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

//components
import Usernav from '../components/UserNavbar';

//database firestore
import { getFirestore, collection, addDoc } from 'firebase/firestore';
const db = getFirestore();

//styles
import styles from '../styles/pages/create.module.css';

const Create = () => {
  //states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState(' ');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [body, setBody] = useState('');

  const data = {
    title: title,
    description: description,
    data: date,
    location: location,
    body: body,
  };

  const sendData = async () => {
    console.log(data);
    try {
      const docRef = await addDoc(collection(db, 'blog'), data);
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  const { ref } = usePlacesWidget({
    apiKey: process.env.REACT_APP_GOOGLE,
    onPlaceSelected: (place) => {
      console.log(place.formatted_address);
      setLocation(place.formatted_address);
    },
  });

  return (
    <React.Fragment>
      <Usernav />
      <header className={styles.createHeader}>
        <h1 className={styles.createHeading}>Write you're story</h1>
      </header>
      <form action="">
        <div className={styles.firstInput}>
          <div className={styles.group}>
            <input
              onInput={(e) => setTitle(e.target.value)}
              className={styles.input}
              id="name"
              type="text"
              autoComplete="off"
              required="required"
            />
            <label className={styles.label} htmlFor="name">
              You're Title
            </label>
            <div className={styles.bar}></div>
          </div>
          <div className={styles.group}>
            <input
              onInput={(e) => setDescription(e.target.value)}
              className={styles.input}
              id="Description"
              type="text"
              autoComplete="off"
              required="required"
            />
            <label className={styles.label} htmlFor="Description">
              Description
            </label>
            <div className={styles.bar}></div>
          </div>
        </div>
        <div className={styles.secondInput}>
          <div className={styles.group}>
            <input
              onInput={(e) => setDate(e.target.value)}
              className={styles.input}
              id="name"
              type="date"
              autoComplete="off"
              required="required"
            />
            <label className={styles.label} htmlFor="name">
              Date
            </label>
            <div className={styles.bar}></div>
          </div>
          <div className={styles.group}>
            <input
              ref={ref}
              className={styles.input}
              id="Location"
              type="text"
              required="required"
              placeholder=""
            />
            <label className={styles.label} htmlFor="Location">
              Location
            </label>
            <div className={styles.bar}></div>
          </div>
        </div>
      </form>
      <div className={styles.editor}>
        <ReactQuill
          style={{
            height: '100%',
          }}
          theme="snow"
          value={body}
          onChange={setBody}
        />
      </div>
      <div>
        <button onClick={(e) => sendData()} type="submit">
          submit
        </button>
      </div>
    </React.Fragment>
  );
};

export default Create;
