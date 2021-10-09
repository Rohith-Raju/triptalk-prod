import React from 'react';
import styles from '../styles/commponents/error.module.css';
import { FirebaseError } from '../FirebaseError';

const FormError = (props) => {
  const message = FirebaseError(props.message);
  return (
    <div className={styles.error}>
      <p>{message}</p>
    </div>
  );
};
export default FormError;
