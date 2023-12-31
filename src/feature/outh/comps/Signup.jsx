import { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import OAuth from '../../../components/OAuth.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { register, reset } from '../config/user.slice.js';
import { toast } from 'react-toastify';

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

export const Signup = () => {
  const { curentUser, isLoading, isError, isSuccess, message } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || curentUser) {
      navigate('/dashboard');
    }

    dispatch(reset());
  }, [curentUser, isError, isSuccess, message, navigate, dispatch]);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      handleSignup(values);
    },
  });

  const handleSignup = (payload) => {
    dispatch(register(payload));
  };

  return (
    <div className="container mx-auto px-3  h-screen flex flex-col justify-center items-center content-center">
      <div className=" sm:w-96">
        <h1 className="text-3xl text-center font-semibold py-7 text-slate-700">Sign Up</h1>
        <div className="mx-auto ">
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
              {isLoading ? 'Loading ...' : 'SIGN UP'}
            </button>
          </form>
          {isError && <div className="bg-red-100 text-red-900 py-1 px-2 mt-2 text-sm">{isError}</div>}
          <OAuth />
        </div>
        <div className="text-sm mt-2 flex gap-2">
          <span className="text-slate-600">Already have an acount?</span>
          <Link to={'/signin'}>
            <span className="text-blue-600">Sign in</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
