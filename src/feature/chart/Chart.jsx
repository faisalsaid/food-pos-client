import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const initialValues = {
  customerName: '',
  table: '',
};
const validationSchema = Yup.object({
  customerName: Yup.string().required('customerName required'),
  table: Yup.string().required('table required'),
});

export default function Chart() {
  const handleSubmit = (values) => {
    console.log(values);
  };
  const onReset = (value, props) => {
    props.setSubmitting(false);
    dispatch(resetListOder());
  };
  return (
    <Formik onReset={onReset} initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      <Form>
        <Field type="text" name="customerName" />
        <ErrorMessage name="customerName" component="div" />
        <Field type="text" name="table" />
        <ErrorMessage name="table" component="div" />
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
}
