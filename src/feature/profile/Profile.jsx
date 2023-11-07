import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { MdEdit } from 'react-icons/md';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import { getStorage, uploadBytesResumable, ref, getDownloadURL } from 'firebase/storage';
import { app } from '../../firebase.js';

export default function Profile() {
  const fileRef = useRef();
  const { curentUser, isLoading, isError } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);

  const initialValues = {
    name: curentUser.name,
    email: curentUser.email,
    password: '',
  };

  //   console.log(formik);
  const validationSchema = Yup.object({
    name: Yup.string().required('Required').min(5, 'Min 5 character'),
    email: Yup.string().required('Required'),
    password: Yup.string().min(6, 'Min 6 character'),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      handleEdit(values);
    },
  });

  useEffect(() => {
    file && handleFileUpload(file);
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getDate() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    console.log(Formik);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          console.log(downloadUrl);
        });
      },
    );
  };

  const handleEdit = (values) => {
    console.log(values);
  };

  return (
    <div className="container w-96 mx-auto">
      <h1 className="text-3xl font-semibold text-slate-700 py-4 text-center">Profile</h1>
      <div>
        <div className="w-24  relative mx-auto">
          <input onChange={(e) => setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept="image/.*" />
          <button onClick={() => fileRef.current.click()} className="bg-teal-600 text-white p-2 rounded-full absolute bottom-0 right-0 hover:bg-teal-700 drop-shadow-md">
            <MdEdit />
          </button>
          <img className="rounded-full" src={curentUser.avatar} alt="profile picture" />
        </div>
        <div className="mt-4 w-full text-xs">
          {fileUploadError ? (
            <p className="bg-red-100 px-2 py-1 rounded-md text-red-700">Error Image Upload</p>
          ) : filePerc > 0 && filePerc < 100 ? (
            <p className="bg-green-100 px-2 py-1 rounded-md text-green-600">{`Uploading ${filePerc}%`}</p>
          ) : filePerc === 100 ? (
            <p className="bg-green-100 px-2 py-1 rounded-md text-green-600">Image successfuly uploaded</p>
          ) : (
            ''
          )}
        </div>
        <div
          className="mt-4
        "
        >
          <form onSubmit={formik.handleSubmit}>
            <input
              type="text"
              placeholder="name"
              className={`border p-3 rounded-md w-full mb-2  ${formik?.errors?.name && 'border-red-500'} `}
              name="name"
              id="name"
              aria-label="name"
              onChange={formik.handleChange}
              value={formik.values.name}
            ></input>
            {formik?.errors?.name && <div className="mb-2 text-xs rounded-sm bg-red-100 p-1 text-red-900">{formik?.errors?.name}</div>}
            <input
              type="email"
              placeholder="email"
              className={`border p-3 rounded-md w-full mb-2  ${formik?.errors?.email && 'border-red-500'} `}
              name="email"
              id="email"
              aria-label="email"
              onChange={formik.handleChange}
              value={formik.values.email}
            ></input>
            {formik?.errors?.email && <div className="mb-2 text-xs rounded-sm bg-red-100 p-1 text-red-900">{formik?.errors?.email}</div>}
            <input
              type="password"
              placeholder="password"
              className={`border p-3 rounded-md w-full mb-2  ${formik?.errors?.password && 'border-red-500'} `}
              name="password"
              id="password"
              aria-label="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            ></input>
            {formik?.errors?.password && <div className="mb-2 text-xs rounded-sm bg-red-100 p-1 text-red-900">{formik?.errors?.password}</div>}
            <button type="submit" className="text-center bg-teal-600 text-white p-2 w-full rounded-md hover:bg-teal-700">
              {isLoading ? 'Loading ...' : 'Update'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
