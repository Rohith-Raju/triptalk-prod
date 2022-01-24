import React from 'react';
//styles
import styles from '../styles/commponents/input.module.css';
//conetxts

import { useController } from 'react-hook-form';

export const Input = (props) => {
  const { field, fieldState } = useController(props);

  const { label, type = 'text', name, placeholder } = props;

  return (
    <div className={styles.group}>
      <input
        {...field}
        className={styles.input}
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete="off"
      />
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <div className={styles.bar}></div>
      <p className={styles.error}>
        {fieldState.error ? '⚠ ' + fieldState.error.message : ''}
      </p>
    </div>
  );
};
