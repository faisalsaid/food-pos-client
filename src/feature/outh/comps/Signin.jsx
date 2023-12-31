import { useEffect } from 'react';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { login, reset } from '../config/user.slice.js';
import OAuth from '../../../components/OAuth.jsx';
import { toast } from 'react-toastify';

/*
THis dispatch use https://www.youtube.com/watch?v=VAaUy_Moivw&t=7808s technique, 
in the future change use same way in POS-APP-DEMO use extra reducer and createAsyncThunk
put to user slice
*/

const initialValues = {
  email: '',
  password: '',
};

const validationSchema = Yup.object({
  email: Yup.string().required('Required'),
  password: Yup.string().required('Required').min(6, 'Min 6 character'),
});

export const Signin = () => {
  const dispatch = useDispatch();
  const { curentUser, isLoading, isError, isSuccess, message } = useSelector((state) => state.user);
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
      handleSignin(values);
    },
  });

  const handleSignin = (payload) => {
    dispatch(login(payload));
  };

  return (
    <div className="container mx-auto px-3  h-screen flex flex-col justify-center items-center content-center">
      <div className=" sm:w-96">
        <h1 className="text-3xl text-center font-semibold py-7 text-slate-700">Sign In</h1>
        <div className="mx-auto ">
          <form onSubmit={formik.handleSubmit}>
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
            <button type="submit" className="text-center bg-teal-600 text-white p-2 w-full rounded-md hover:bg-teal-700 uppercase">
              {isLoading ? 'Loading ...' : 'Sign In'}
            </button>
          </form>
          {isError && <div className="bg-red-100 text-red-900 py-1 px-2 mt-2 text-sm">{isError}</div>}
          <OAuth />
        </div>
        <div className="text-sm mt-2 flex gap-2">
          <span className="text-slate-600">Dont have an acount?</span>
          <Link to={'/signup'}>
            <span className="text-blue-600">Sign up</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
