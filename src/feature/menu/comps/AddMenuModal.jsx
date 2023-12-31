import React, { useState, useRef, useEffect } from 'react';
import Modal from 'react-modal';
import { Formik, Field, Form, useFormik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { getStorage, uploadBytesResumable, ref, getDownloadURL } from 'firebase/storage';
import { app } from '../../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { createNewMenu, updateMenu } from '../config/menuSlice';

// Import icons
import { AiOutlineClose } from 'react-icons/ai';
import { BiUpload, BiBookAdd } from 'react-icons/bi';
import { MdOutlineCancel } from 'react-icons/md';

// init react modal
Modal.setAppElement('#root');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxHeight: '80%',
    zIndex: '50',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    zIndex: '50',
  },
};

const categories = [
  {
    label: 'Pizza',
    value: 'pizza',
  },
  {
    label: 'Burger',
    value: 'burger',
  },
  {
    label: 'Rice',
    value: 'rice',
  },
  {
    label: 'Noodle',
    value: 'noodle',
  },
  {
    label: 'Coffee',
    value: 'coffee',
  },
  {
    label: 'Drink',
    value: 'drink',
  },
  {
    label: 'Ice Cream',
    value: 'ice_cream',
  },
];

const ErrorText = ({ message }) => {
  return <span className="text-xs bg-red-50 text-red-500 rounded-sm px-2 py-1">{message}</span>;
};
const SuccessText = ({ message }) => {
  return <span className="text-xs bg-green-50 text-green-500 rounded-sm px-2 py-1">{message}</span>;
};

export default function AddMenuModal({ isOpen, closeModel, content, isEdit }) {
  const { isLoading, isSuccess, isError, message } = useSelector((state) => state.menu);
  const fileRef = useRef();
  const [file, setFile] = useState(undefined);
  const [imageName, setImageName] = useState(isEdit ? content.image.name : 'Menu Default Image');
  const [imageURL, setImageUrl] = useState(isEdit ? content.image.url : 'https://cdn3d.iconscout.com/3d/premium/thumb/fast-food-5727930-4800414.png');
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    file && handleFileUpload(file);
  }, [file]);

  const initialValues = {
    title: '',
    description: '',
    category: '',
    image: {
      url: imageURL,
      name: imageName,
    },

    price: 0,
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
    category: Yup.string().required('Required'),
    image: Yup.object({
      url: Yup.string().required(),
      name: Yup.string().required(),
    }),
    price: Yup.number().moreThan(0.09, 'min price is $0.1').required('Required'),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
  });

  const resetForm = () => {
    setImageName(isEdit ? content.image.name : 'Menu Default Image');
    setImageUrl(isEdit ? content.image.url : 'https://cdn3d.iconscout.com/3d/premium/thumb/fast-food-5727930-4800414.png');
    setFilePerc(0);
    formik.resetForm();
  };

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    setImageName(fileName);

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
          setImageUrl(downloadUrl);
        });
      },
    );
  };

  const handleSubmitForm = (values) => {
    if (isEdit) {
      const payload = { ...values, image: { url: imageURL, name: imageName } };
      // console.log(payload);
      dispatch(updateMenu(payload));
    } else {
      const payload = { ...values, image: { url: imageURL, name: imageName } };
      // console.log(payload);
      dispatch(createNewMenu(payload));
    }
    resetForm();
    closeModel();
  };

  const handleCancelSubmit = () => {
    resetForm();
    closeModel();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModel} shouldCloseOnEsc={false} shouldCloseOnOverlayClick={false} contentLabel="Payment Modal" style={customStyles}>
      <div className=" md:w-[500px] ">
        <div className="flex items-center gap-2  border-b pb-2 ">
          <p className="text-teal-500 flex-1 font-semibold">{isEdit ? 'Edit Menu' : 'Add New Menu'}</p>
          <button onClick={handleCancelSubmit} className="bg-red-600 p-1 text-white rounded-md">
            <AiOutlineClose />
          </button>
        </div>
        <Formik
          initialValues={isEdit ? content : initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              handleSubmitForm(values);
              actions.setSubmitting(false);
            }, 1000);
          }}
        >
          {(formik) => {
            // console.log(formik);
            const { setFieldValue } = formik;
            return (
              <Form>
                <div className="flex flex-col gap-6 mt-3">
                  <div className="flex flex-col gap-2 ">
                    <label className=" text-teal-400" htmlFor="title">
                      Menu Title :
                    </label>
                    {formik.touched.title && formik.errors.title && <ErrorText message={formik.errors.title} />}
                    <input
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.title}
                      className={`text-slate-500 border py-1 px-2 outline-slate-400 rounded-lg ${formik.touched.title && formik.errors.title && 'border-red-500'} `}
                      name="title"
                      id="title"
                      type="text"
                      placeholder="Input menu title..."
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className=" text-teal-400" htmlFor="description">
                      Description :
                    </label>
                    {formik.touched.description && formik.errors.description && <ErrorText message={formik.errors.description} />}
                    <textarea
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.description}
                      placeholder="Type menu description..."
                      className={`text-slate-500 p-2 border outline-slate-400 rounded-lg ${formik.touched.description && formik.errors.description && 'border-red-500'}`}
                      id="description"
                      name="description"
                      rows={6}
                    ></textarea>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-teal-400" htmlFor="category">
                      Category :
                    </label>
                    {formik.touched.category && formik.errors.category && <ErrorText message={formik.errors.category} />}
                    <Field
                      className={` text-slate-500 border py-1 px-2 rounded-lg ${formik.touched.category && formik.errors.category && 'border-red-500'}`}
                      as="select"
                      name="category"
                    >
                      <option className="text-slate-200" value="" label="> Select food category" />
                      {categories.map((category, i) => (
                        <option key={i} value={category.value} label={category.label} />
                      ))}
                    </Field>
                  </div>

                  <div className="flex items-end gap-2">
                    <img className="w-12 h-12 object-cover rounded-lg" src={imageURL} alt="" />
                    <div className="flex-1 flex flex-col gap-2 ">
                      <p className="text-sm text-slate-500">{imageName}</p>
                      {fileUploadError ? (
                        <ErrorText message={'Error Image Upload'} />
                      ) : filePerc > 0 && filePerc < 100 ? (
                        <div className=" bg-slate-100 h-1 rounded-full overflow-hidden">
                          <div className={`w-[${filePerc}%] bg-green-400 h-1 `}></div>
                        </div>
                      ) : filePerc === 100 ? (
                        <SuccessText message={'Upload Success'} />
                      ) : (
                        ''
                      )}
                    </div>
                    <input onChange={(e) => setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept="image/.*" />
                    {/* <Field name={'image.url'} value={imageURL} hidden />
                    <Field name={'image.name'} value={imageName} hidden /> */}
                    <button
                      onClick={() => fileRef.current.click()}
                      type="button"
                      className=" bg-green-500 flex items-center gap-2 hover:bg-green-600 text-white rounded-md py-1 px-2"
                    >
                      <BiUpload /> <span> {isEdit ? 'Change Image' : 'Upload Image'}</span>
                    </button>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-teal-400" htmlFor="price">
                      Price :
                    </label>
                    {formik.touched.price && formik.errors.price && <ErrorText message={formik.errors.price} />}
                    <div className={`flex gap-2 items-center p-2 border rounded-lg ${formik.touched.price && formik.errors.price && 'border-red-500'}`}>
                      <span>$</span>
                      <input
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.price}
                        className="w-full outline-none text-slate-500"
                        type="number"
                        id="price"
                        name="price"
                      />
                    </div>
                  </div>
                  <div className="py-2 flex justify-end gap-2">
                    <button onClick={handleCancelSubmit} className="flex items-center gap-1 bg-red-500 text-white py-1 px-2 rounded-md">
                      <MdOutlineCancel /> <span>Cancel</span>
                    </button>
                    <button
                      type="submit"
                      disabled={!formik.dirty || (formik.dirty && !formik.isValid)}
                      className="disabled:bg-slate-100 disabled:text-slate-400 flex items-center gap-1 bg-green-500 text-white py-1 px-2 rounded-md  text-center"
                    >
                      <BiBookAdd /> <span>{isEdit ? 'Update Menu' : 'Add Menu'}</span>
                    </button>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </Modal>
  );
}
