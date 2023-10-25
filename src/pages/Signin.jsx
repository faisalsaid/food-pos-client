import { useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const initialValues = {
  name: '',
  email: '',
  password: '',
};

const validationSchema = Yup.object({
  email: Yup.string().required('Required'),
  password: Yup.string().required('Required').min(6, 'Min 6 character'),
});

export const Signin = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      handleSignup(values);
    },
  });

  const handleSignup = (payload) => {
    console.log(payload);
    setLoading(true);
    return axios
      .post('/api/auth/signin', payload)
      .then((resp) => {
        console.log(resp.data);
        setLoading(false);
        navigate('/dashboard');
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setError(err.response.data.message);
        setLoading(false);
      });
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl text-center font-semibold py-7 text-slate-700">Sign In</h1>
      <div className="mx-auto w-96">
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
          <button type="submit" className="text-center bg-teal-600 text-white p-2 w-full rounded-md hover:bg-teal-700">
            {loading ? 'Loading ...' : 'SIGN IN'}
          </button>
        </form>
        {error && <div className="bg-red-100 text-red-900 py-1 px-2 mt-2 text-sm">{error}</div>}
      </div>
    </div>
  );
};
