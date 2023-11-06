import React from 'react';
import Modal from 'react-modal';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Import icons
import { AiOutlineClose } from 'react-icons/ai';
import { BiUpload, BiBookAdd } from 'react-icons/bi';
import { MdOutlineCancel } from 'react-icons/md';
import { CiPizza, CiBowlNoodles } from 'react-icons/ci';
import { IoIceCreamOutline } from 'react-icons/io5';
import { CgMenuGridO } from 'react-icons/cg';
import { PiHamburger, PiCoffee } from 'react-icons/pi';
import { BiBowlRice } from 'react-icons/bi';
import { space } from 'postcss/lib/list';

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
    maxHeight: '70%',
    zIndex: '100',
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
export default function AddMenuModal({ isOpen, closeModel, content, isEdit }) {
  const initialValues = {
    title: '',
    descripton: '',
    category: '',
    image: {
      url: 'https://cdn3d.iconscout.com/3d/premium/thumb/fast-food-5727930-4800414.png',
      name: 'Default Menu Image',
    },
    price: 0,
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Required'),
    descripton: Yup.string().required('Required'),
    category: Yup.string().required('Required'),
    image: Yup.object({
      url: Yup.string().required(),
      name: Yup.string().required(),
    }),
    price: Yup.number().moreThan(0.09, 'min price is $0.1').required('Required'),
  });
  const handleAddMenu = (values) => {
    console.log('PAYLOAD >> ', values);
  };
  return (
    <Modal isOpen={isOpen} onRequestClose={closeModel} contentLabel="Payment Modal" style={customStyles}>
      <div className="w-[500px] ">
        <div className="flex items-center gap-2  border-b pb-2 ">
          <p className="text-teal-500 flex-1 font-semibold">{isEdit ? 'Edit Menu' : 'Add New Menu'}</p>
          <button onClick={closeModel} className="bg-red-600 p-1 text-white rounded-md">
            <AiOutlineClose />
          </button>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              handleAddMenu(values);
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
                    <label className=" text-teal-400" htmlFor="descripton">
                      Description :
                    </label>
                    {formik.touched.descripton && formik.errors.descripton && <ErrorText message={formik.errors.descripton} />}
                    <textarea
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.descripton}
                      placeholder="Type menu description..."
                      className={`text-slate-500 p-2 border outline-slate-400 rounded-lg ${formik.touched.descripton && formik.errors.descripton && 'border-red-500'}`}
                      id="descripton"
                      name="descripton"
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
                    <img className="w-10 h-10 object-cover rounded-lg" src={formik.values.image.url} alt="" />
                    <div className="flex-1 flex flex-col gap-2 ">
                      <p className="text-sm text-slate-500">{formik.values.image.name}</p>
                      <div className=" bg-slate-100 h-1 rounded-full overflow-hidden">
                        <div className="w-[0%] bg-green-400 h-1"></div>
                      </div>
                    </div>
                    <button type="button" className=" bg-green-500 flex items-center gap-2 hover:bg-green-600 text-white rounded-md py-1 px-2">
                      <BiUpload /> <span> {isEdit ? 'Change Image' : 'Upload Image'}</span>
                    </button>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-teal-400" htmlFor="price">
                      Price :
                    </label>
                    {formik.touched.price && formik.errors.price && <ErrorText message={formik.errors.price} />}
                    <div className={`flex gap-2 items-center p-2 border rounded-lg ${formik.touched.category && formik.errors.price && 'border-red-500'}`}>
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
                    <button onClick={closeModel} className="flex items-center gap-1 bg-red-500 text-white py-1 px-2 rounded-md">
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
        {/* <form action="">
          <div className="flex flex-col gap-3 mt-3">
            <div className="flex flex-col gap-2 ">
              <label className=" text-slate-700" htmlFor="title">
                Menu Title
              </label>
              <input className="border py-1 px-2 outline-slate-400 rounded-lg" name="title" id="title" type="text" placeholder="Input menu title..." />
            </div>
            <div className="flex flex-col gap-2">
              <label className=" text-slate-700" htmlFor="desc">
                Description
              </label>
              <textarea placeholder="Type menu description..." className="p-2 border outline-slate-400 rounded-lg" id="desc" name="desc" rows={6}></textarea>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="category">Category :</label>
              <select className="border p-2 border-slate-400 rounded-lg" id="category" name="category " defaultValue={'pizza'}>
                <option className="p-2" value="coofee">
                  Coffee
                </option>
                <option className="p-2" value="pizza">
                  Pizza
                </option>
              </select>
            </div>

            <div className="flex items-end gap-2">
              <div className="flex-1 bg-slate-100 h-1 rounded-full overflow-hidden">
                <div className="w-[45%] bg-green-400 h-1"></div>
              </div>
              <button type="button" className=" bg-green-500 flex items-center gap-2 hover:bg-green-600 text-white rounded-md py-1 px-2">
                <BiUpload /> <span> {isEdit ? 'Change Image' : 'Upload Image'}</span>
              </button>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="price">Price</label>
              <div className=" flex gap-2 items-center p-2 border rounded-lg">
                <span>$</span>
                <input className="w-full outline-none" type="number" id="price" name="price" />
              </div>
            </div>
            <div className="py-2 flex justify-end gap-2">
              <button onClick={closeModel} className="flex items-center gap-1 bg-red-500 text-white py-1 px-2 rounded-md">
                <MdOutlineCancel /> <span>Cancel</span>
              </button>
              <button type="button" className="flex items-center gap-1 bg-green-500 text-white py-1 px-2 rounded-md  text-center">
                <BiBookAdd /> <span>{isEdit ? 'Update Menu' : 'Add Menu'}</span>
              </button>
            </div>
          </div>
        </form> */}
      </div>
    </Modal>
  );
}
