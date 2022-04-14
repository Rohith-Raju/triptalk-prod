//modules
import React, { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
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
import { Barloader } from '../components/loader';

const TitleFormRules = {
  required: {
    value: true,
    message: 'This input is requiered ',
  },

  maxLength: {
    value: 60,
    message: 'Title  should not exceed 60 characters',
  },
  minLength: {
    value: 20,
    message: 'Title  should exceed 20 charecters',
  },
};

const DescFormRules = {
  required: {
    value: true,
    message: 'Description input is requiered ',
  },

  maxLength: {
    value: 250,
    message: 'Description  should not exceed 250 characters',
  },
  minLength: {
    value: 35,
    message: 'Description  should exceed 35 charecters',
  },
};

const LocationFormRules = {
  required: {
    value: true,
    message: 'location input is requiered ',
  },

  maxLength: {
    value: 15,
    message: 'location  should not exceed 15 characters',
  },
  minLength: {
    value: 1,
    message: 'Description should exceed 1 charecters',
  },
};

const bodySchema = yup.object().shape({
  Body: yup.string().required().min(500).max(8000),
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
  const [loading, setLoading] = useState(false);
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

  const isBodyValid = async (data) => {
    const body = {
      Body: data,
    };
    await bodySchema.validate(body).catch((err) => errorMessage(err.message));
    const result = await bodySchema.isValid(body);
    if (result) return Promise.resolve(true);
    else return Promise.reject();
  };

  const isImagevalid = async (image) => {
    if (image == null) {
      errorMessage('Image is missing please select one');
      return Promise.reject();
    } else {
      return Promise.resolve(true);
    }
  };

  const onSubmit = async (data) => {
    setError(null);
    Promise.all([isBodyValid(Body), isImagevalid(image)])
      .then(async () => {
        setLoading(true);
        data['Body'] = Body;
        const storageRef = ref(storage, `${currentuser.uid}/${image.name}`);

        try {
          const upload = await uploadBytes(storageRef, image);
          upload;
          data['Imagepath'] = upload.metadata.fullPath;
        } catch (e) {
          errorMessage('Problem in uploading the image');
        }
        await getDownloadURL(storageRef)
          .then((res) => (data['Image'] = res))
          .catch((e) =>
            errorMessage('Problem in fethcing the image' + e.message)
          );
        data['Timestamp'] = Timestamp.fromDate(new Date());
        data['UserName'] = currentuser.displayName;
        data['Uid'] = currentuser.uid;

        try {
          await addDoc(collection(db, 'blog'), data);
          history.push('/');
        } catch (e) {
          errorMessage('Problem in saving your data');
        }
        setLoading(false);
      })
      .catch();
  };

  return (
    <React.Fragment>
      <Usernav />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.container}>
          <header className={styles.createHeader}>
            <h1>Write your story</h1>
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
              rules={LocationFormRules}
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
              placeholder="Your body goes here"
              formats={formats}
              modules={modules}
            />
          </div>
          <div className={styles.submitDiv}>
            <button disabled={loading} className={styles.submit}>
              <span>Submit</span>
            </button>
            {loading ? <Barloader /> : ''}
          </div>
        </div>
      </form>
    </React.Fragment>
  );
};

export default Create;
