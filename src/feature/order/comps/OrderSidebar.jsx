import { BiReset, BiEdit, BiUser } from 'react-icons/bi';
import { MdOutlineTableBar, MdOutlineSwipeUp } from 'react-icons/md';
import { BiGridHorizontal } from 'react-icons/bi';

// Import icons

import React, { useEffect, useState } from 'react';
import ListOrderCard from './ListOrderCard';
import PaymentModal from './PaymentModal';
import { useDispatch, useSelector } from 'react-redux';
import { resetListOder } from '../config/orderSlice';
import { Field, Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ErrorCompsFormik from '../../../components/share/ErrorCompsFormik';
import { tableOptions } from '../../../config/staticState';

const validationSchema = Yup.object({
  customerName: Yup.string().required('Please type customer name').min(3, 'Min 3 character'),
  table: Yup.string().required('Please select table'),
});

export default function OrderSidebar() {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { listOrder } = useSelector((state) => state.order);
  const { listPurchase } = useSelector((state) => state.purchase);
  const [subtotal, setSubtotal] = useState(0);
  const [discountSales, setDiscountSales] = useState(0);
  const [saleTax, setSaleTax] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const [prePayload, setPrePayload] = useState();
  const [initialValues, setInitalValues] = useState({
    customerName: '',
    table: '',
  });

  useEffect(() => {
    // calculate subtotal
    const calcSubtotal = listOrder.length ? listOrder.map((order) => order.orderPrice).reduce((total, item) => total + item) : 0;
    setSubtotal(parseFloat(calcSubtotal.toFixed(2)));
    // console.log(parseFloat(calcSubtotal.toFixed(2)));

    // calculate discount
    const setDiscount = 0;
    const calcDiscountSales = calcSubtotal * setDiscount;
    setDiscountSales(parseFloat(calcDiscountSales.toFixed(2)));

    // calculate total sale tax
    const setTax = 0.11;
    const calcSaleTax = (calcSubtotal - calcDiscountSales) * setTax;
    setSaleTax(parseFloat(calcSaleTax.toFixed(2)));
    // console.log(parseFloat(calcSaleTax.toFixed(2)));

    // calculate final price
    const calcFinalPrice = calcSubtotal - calcDiscountSales + calcSaleTax;
    setFinalPrice(parseFloat(calcFinalPrice.toFixed(2)));
  }, [listOrder]);

  useEffect(() => {
    if (listPurchase) {
      dispatch(resetListOder());
      setInitalValues({
        customerName: '',
        table: '',
      });
    }
  }, [listPurchase]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (values, props) => {
    const prePayload = { ...values, listOrder, subtotal, discountSales, saleTax, finalPrice };
    setPrePayload(prePayload);
    openModal();
  };
  const handleReset = (value, props) => {
    props?.setSubmitting(false);
    dispatch(resetListOder());
  };
  return (
    <Formik enableReinitialize initialValues={initialValues} onReset={handleReset} validationSchema={validationSchema} onSubmit={handleSubmit}>
      {(formik) => (
        <Form>
          <div className="h-[calc(100vh-60px)] w-full sm:w-[310px]  bg-white p-3  ">
            <div className="flex sm:hidden text-center justify-center bg-slate-200 py-1 mb-2">
              <BiGridHorizontal />
            </div>
            <div className="flex flex-col  gap-3 h-full ">
              <div className="flex items-center gap-2 text-sm">
                <p className="flex-1 font-semibold text-lg">Order #645</p>
                <button type="reset" className=" flex items-center gap-2 justify-center bg-red-500 hover:bg-red-600 text-white py-1 rounded-lg px-2">
                  <BiReset />
                  <span>Reset</span>
                </button>
              </div>
              <div>
                <p className="font-semibold mb-1">Customer Information :</p>
                <div className="flex flex-col gap-1">
                  <div>
                    <div className="flex items-center text-sm gap-2 text-slate-400 border py-1 px-2 rounded-md mb-1">
                      <BiUser />
                      <Field className="outline-none bg-transparent w-full" type="text" name="customerName" placeholder="Customer Name" />
                    </div>
                    <ErrorMessage name="customerName" component={ErrorCompsFormik} />
                  </div>
                  <div>
                    <div className="flex items-center text-sm gap-2 text-slate-400 border py-1 px-2 rounded-md  mb-1">
                      <MdOutlineTableBar />
                      <Field as="select" className="outline-none bg-transparent w-full" name="table" placeholder="Table">
                        <option value="">Select Table</option>
                        {tableOptions.map((table, i) => (
                          <option key={i} value={table.value}>
                            {table.label}
                          </option>
                        ))}
                      </Field>
                    </div>
                    <ErrorMessage name="table" component={ErrorCompsFormik} />
                  </div>
                </div>
              </div>
              <div className="flex-1 overflow-hidden min-h-[80px] flex flex-col border rounded-lg p-2">
                <p className="font-semibold mb-1">Order Details :</p>
                <div className="overflow-y-scroll">
                  {listOrder.map((data, i) => (
                    <ListOrderCard index={i} key={i} orderInfo={data} />
                  ))}
                </div>
              </div>
              <div className="py-3">
                <div className="flex bg-green-50 py-1 px-2 rounded-lg text-xs gap-2 mb-2">
                  <span className="flex-1 font-semibold">Add</span>
                  <button type="button" className="text-slate-500">
                    Discound
                  </button>
                  <button type="button" className="text-slate-500">
                    Coupon Code
                  </button>
                  <button type="button" className="text-slate-500">
                    Note
                  </button>
                </div>
                <div className="bg-slate-50 p-2 rounded-lg text-xs border-b">
                  <div className="flex items-center justify-between">
                    <p>Subtotal</p>
                    <p>${subtotal.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p>Discount sales</p>
                    <p>-${discountSales.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p>Total sale tax</p>
                    <p>${saleTax.toFixed(2)}</p>
                  </div>
                </div>
                <div className="bg-slate-50 p-2 rounded-md flex justify-between mb-2 font-bold">
                  <p>Total </p>
                  <p>${finalPrice.toFixed(2)}</p>
                </div>
                <button
                  disabled={!formik.dirty || (formik.dirty && listOrder.length === 0)}
                  type="submit"
                  className="disabled:bg-slate-100 disabled:text-slate-400 bg-green-500 text-white justify-center w-full items-center rounded-lg py-1 px-2 hover:bg-green-600"
                >
                  Payment Proccess
                </button>
                <PaymentModal isOpen={isModalOpen} closeModel={closeModal} content={prePayload} />
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
