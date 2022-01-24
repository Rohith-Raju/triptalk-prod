//modules
import React, { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import * as yup from 'yup';

import 'react-quill/dist/quill.snow.css';

//components
import Usernav from '../components/UserNavbar';
import { Input } from '../components/Inputfield';
import Upload from '../components/Upload';

//contexts
import { useAuth } from '../contexts/Authcontext';

//database firestore
import {
  getFirestore,
  collection,
  addDoc,
  Timestamp,
} from 'firebase/firestore';
const db = getFirestore();

// firebase cloud
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
const storage = getStorage();

//styles
import styles from '../styles/pages/create.module.css';

const TitleFormRules = {
  required: {
    value: true,
    message: 'This input is requiered ',
  },

  maxLength: {
    value: 40,
    message: 'Title  should not exceed 40 characters',
  },
  minLength: {
    value: 15,
    message: 'Title  should exceed 20 charecters',
  },
};

const DescFormRules = {
  required: {
    value: true,
    message: 'Description input is requiered ',
  },

  maxLength: {
    value: 150,
    message: 'Description  should not exceed 150 characters',
  },
  minLength: {
    value: 35,
    message: 'Description  should exceed 25 charecters',
  },
};

const schema = yup.object().shape({
  Title: yup.string().required().min(15).max(40),
  Description: yup.string().required().min(35).max(150),
  Date: yup.date().required(),
  Location: yup.string().required(),
  Body: yup.string().required().min(250).max(2000),
});

const modules = {
  toolbar: [
    [{ header: [3, 4, false] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }],
  ],
};

const formats = [
  'size',
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
];

const Create = () => {
  //states
  const [Body, setBody] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const history = useHistory();

  //error Ref
  const errorRef = useRef('');

  const { currentuser } = useAuth();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const { handleSubmit, control } = useForm({
    defaultValues: {
      Title: '',
      Description: '',
      Date: '',
      Location: '',
    },
    mode: 'onChange',
    criteriaMode: 'all',
  });

  const errorMessage = (message) => {
    setError(message);
    if (message != null) window.scrollTo(0, 0);
  };

  const ValidateSchema = (data) => {
    schema
      .validate(data)
      .then(() => {
        return false;
      })
      .catch((err) => {
        errorMessage(err.message);
        return true;
      });
  };

  const ValidateImage = (image) => {
    if (image == null) {
      errorMessage('Image is missing please select one');
      return true;
    } else return false;
  };

  const ValidateData = (data, image) => {
    if (!ValidateSchema(data) && !ValidateImage(image)) return true;
    else return false;
  };

  const onSubmit = async (data) => {
    data['Body'] = Body;
    if (ValidateData(data, image)) {
      if (error == null) {
        const storageRef = ref(
          storage,
          `images/${currentuser.uid + image.name}`
        );
        try {
          await uploadBytes(storageRef, image);
        } catch (e) {
          errorMessage('Problem in uploading the image');
        }

        await getDownloadURL(storageRef)
          .then((res) => (data['Image'] = res))
          .catch((e) => errorMessage('Problem in uploading the image'));

        data['Timestamp'] = Timestamp();
        data['UserName'] = currentuser.displayName;
        try {
          await addDoc(collection(db, 'blog'), data);
          history.push('/explore');
        } catch (e) {
          errorMessage("Problem in saving you're data");
        }
      }
    }
  };

  return (
    <React.Fragment>
      <Usernav />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.container}>
          <header className={styles.createHeader}>
            <h1>Write you're story</h1>
          </header>
          {error ? (
            <div ref={errorRef}>
              <p className={styles.error}>⚠ {error}</p>
            </div>
          ) : (
            ''
          )}

          <div className={styles.firstdiv}>
            <Input
              rules={TitleFormRules}
              placeholder="Title"
              control={control}
              name="Title"
              label="Title"
            />
            <Input
              rules={DescFormRules}
              control={control}
              placeholder="Description"
              name="Description"
              label="Description"
            />
          </div>
          <div className={styles.secdiv}>
            <Input
              rules={{
                required: {
                  value: true,
                  message: 'date should not be empty',
                },
              }}
              control={control}
              label="Date"
              name="Date"
              type="date"
            />
            <Input
              rules={{
                required: {
                  value: true,
                  message: 'Location cant be empty',
                },
              }}
              control={control}
              label="Location"
              name="Location"
              placeholder="Location"
            />
          </div>
          <Upload file={image} handleChange={handleImageChange} />
          <div className={styles.quillContainer}>
            <ReactQuill
              theme="snow"
              value={Body}
              onChange={setBody}
              className={styles.quill}
              placeholder="You're body goes here"
              formats={formats}
              modules={modules}
            />
          </div>
          <div className={styles.submitDiv}>
            <button className={styles.submit}>
              <span>Submit</span>
            </button>
          </div>
        </div>
      </form>
    </React.Fragment>
  );
};

export default Create;
