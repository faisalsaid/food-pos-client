import { useSelector } from 'react-redux';
import { MdEdit } from 'react-icons/md';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const initialValues = {
  name: '',
  email: '',
  password: '',
};

const validationSchema = Yup.object({
  name: Yup.string().required('Required').min(5, 'Min 5 character'),
  email: Yup.string().required('Required'),
  password: Yup.string().required('Required').min(6, 'Min 6 character'),
});

export default function Profile() {
  const { data, isLoading, error } = useSelector((state) => state.user.curentUser);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      handleSignup(values);
    },
  });

  return (
    <div className="container w-96 mx-auto">
      <h1 className="text-3xl font-semibold text-slate-700 py-4 text-center">Profile</h1>
      <div>
        <div className="w-24 overflow-hidden relative mx-auto">
          <button className="bg-green-700 text-white p-2 rounded-full absolute bottom-0 right-0">
            <MdEdit />
          </button>
          <img className="rounded-full" src={data.avatar} alt="profile picture" />
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
