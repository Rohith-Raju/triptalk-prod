import React from 'react';
import styles from '../styles/commponents/upload.module.css';

const Upload = ({ handleChange, file }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.fileInput}>
        <input onChange={handleChange} accept="image/*" type="file" />
        <span className={styles.button}>Choose</span>
        <span className={styles.label} data-js-label>
          {file ? file.name : 'Choose a photo to upload'}
        </span>
      </div>
    </div>
  );
};

export default Upload;
