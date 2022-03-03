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
import { getFirestore, updateDoc, Timestamp, doc } from 'firebase/firestore';
const db = getFirestore();

// firebase cloud
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
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
    value: 50,
    message: 'Title  should not exceed 40 characters',
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
    message: 'Description  should not exceed 150 characters',
  },
  minLength: {
    value: 35,
    message: 'Description  should exceed 25 charecters',
  },
};

const bodySchema = yup.object().shape({
  Body: yup.string().required().min(500).max(6000),
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

const Update = ({ data, PreError, id }) => {
  //states
  const [Body, setBody] = useState(data.Body);
  const [image, setImage] = useState({ name: data.Imagepath.split('/')[1] });
  const [error, setError] = useState(PreError);
  const [loading, setLoading] = useState(false);

  //image name from document to compare
  const docImage = data.Imagepath.split('/')[1];

  //react router
  const history = useHistory();

  //error Ref
  const errorRef = useRef('');

  const { currentuser } = useAuth();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const { handleSubmit, control } = useForm({
    defaultValues: {
      Title: data.Title,
      Description: data.Description,
      Date: data.Date,
      Location: data.Location,
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

  console.log(image.name);

  const onSubmit = async (formdata) => {
    setError(null);
    console.log(docImage, image);
    if (docImage !== image.name) {
      const delref = ref(storage, data.Imagepath);
      deleteObject(delref);
    }

    Promise.all([isBodyValid(Body), isImagevalid(image)])
      .then(async () => {
        setLoading(true);
        formdata['Body'] = Body;
        const storageRef = ref(storage, `${currentuser.uid}/${image.name}`);

        try {
          const upload = await uploadBytes(storageRef, image);
          console.log(upload);
          formdata['Imagepath'] = upload.metadata.fullPath;
        } catch (e) {
          errorMessage('Problem in uploading the image');
        }
        await getDownloadURL(storageRef)
          .then((res) => (formdata['Image'] = res))
          .catch((e) =>
            errorMessage('Problem in fethcing the image' + e.message)
          );
        formdata['Timestamp'] = Timestamp.fromDate(new Date());
        formdata['UserName'] = currentuser.displayName;
        formdata['Uid'] = currentuser.uid;

        try {
          await updateDoc(doc(db, 'blog', id), formdata);
          history.push('/explore');
        } catch (e) {
          errorMessage("Problem in saving you're data");
          console.log(e);
        }
        setLoading(false);
      })
      .catch(() => setError('something went wrong please try again'));
  };

  return (
    <React.Fragment>
      <Usernav />
      {data ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.container}>
            <header className={styles.createHeader}>
              <h1>Update you're story</h1>
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
              <button disabled={loading} className={styles.submit}>
                <span>Submit</span>
              </button>
              {loading ? <Barloader /> : ''}
            </div>
          </div>
        </form>
      ) : (
        ''
      )}
    </React.Fragment>
  );
};

export default Update;
