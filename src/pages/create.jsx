//modules
import React, { useState } from 'react';
import { usePlacesWidget } from 'react-google-autocomplete';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

//components
import Usernav from '../components/UserNavbar';

//styles
import styles from '../styles/pages/create.module.css';

const Create = () => {
  const [value, setValue] = useState('');

  const { ref } = usePlacesWidget({
    apiKey: 'AIzaSyC2SCOJRcGE3-xVeIMDLoaaL3Yy5xo-U6k',
    onPlaceSelected: (place) => console.log(place),
  });

  return (
    <React.Fragment>
      <Usernav />
      <header className={styles.createHeader}>
        <h1 className={styles.createHeading}>Write you're story</h1>
      </header>
      <div className={styles.firstInput}>
        <div className={styles.group}>
          <input
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
            autoComplete="off"
            required="required"
            placeholder=""
          />
          <label className={styles.label} htmlFor="Location">
            Location
          </label>
          <div className={styles.bar}></div>
        </div>
      </div>
      <div className={styles.editor}>
        <ReactQuill
          style={{
            fontSize: '2rem',
          }}
          theme="snow"
          value={value}
          onChange={setValue}
        />
      </div>
    </React.Fragment>
  );
};

export default Create;
