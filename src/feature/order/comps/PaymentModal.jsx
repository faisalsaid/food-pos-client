import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

// Import icons
import { AiOutlineClose } from 'react-icons/ai';
import { BiUser } from 'react-icons/bi';
import { MdOutlineTableBar } from 'react-icons/md';
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';
import ErrorCompsFormik from '../../../components/share/ErrorCompsFormik';
import { useDispatch } from 'react-redux';
import { createPurchase } from '../../purchase/config/purchaseSlice';

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
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    zIndex: '50',
  },
};

const initialValues = {
  amount: 0,
};
const validationSchema = Yup.object({
  amount: Yup.number().moreThan(0).required('Required'),
});

export default function PaymentModal({ isOpen, closeModel, content }) {
  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [change, setChange] = useState(0);
  const [orderRef, setOrderRef] = useState('');

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values, props) => {
      handleSubmit(values, props);
    },
    onReset: (values, props) => {
      handleReset(values, props);
    },
  });

  useEffect(() => {
    setOrderRef(generateRefOrder());
  }, []);

  useEffect(() => {
    const calcChange = formik.values.amount - content?.finalPrice;
    setChange(parseFloat(calcChange.toFixed(2)));
  }, [formik.values.amount]);

  const handleSubmit = (values, props) => {
    const { listOrder, ...rest } = content;
    const newListOrder = listOrder.map((order) => ({ item: order.item._id, quantity: order.quantity, orderPrice: order.orderPrice }));
    console.log(rest);
    console.log(listOrder);
    console.log(newListOrder);
    console.log(values);

    const payload =
      paymentMethod === 'cash'
        ? { ...rest, ...values, listOrder: newListOrder, change, paymentMethod, orderRef }
        : { ...rest, ...values, listOrder: newListOrder, paymentMethod, orderRef };
    console.log(payload);
    dispatch(createPurchase(payload));

    handleReset(values, props);
    closeModel();
  };

  const handleReset = (values, props) => {
    props.setSubmitting(false);
    setPaymentMethod('cash');
    closeModel();
  };

  const handlePaymentCash = () => {
    setPaymentMethod('cash');
    formik.setFieldValue('amount', 0);
  };
  const handlePaymentDebit = () => {
    setPaymentMethod('debit_card');
    formik.setFieldValue('amount', content.finalPrice.toFixed(2));
  };
  const handlePaymentCredit = () => {
    setPaymentMethod('credit_card');
    formik.setFieldValue('amount', content.finalPrice.toFixed(2));
  };

  // console.log(formik);
  return (
    <Modal isOpen={isOpen} onRequestClose={closeModel} shouldCloseOnEsc={false} shouldCloseOnOverlayClick={false} contentLabel="Payment Modal" style={customStyles}>
      <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
        <div className="w-full sm:w-[500px] ">
          <div className="flex items-center gap-2  border-b pb-2 ">
            <p className="flex-1">Paymen Order #{orderRef}</p>
            <p className="text-slate-400 text-sm">Sunday, 01 Januari 2001</p>
            <button type="reset" className="bg-red-600 p-1 text-white rounded-md">
              <AiOutlineClose />
            </button>
          </div>
          <div className="py-8 flex flex-col gap-5">
            <div>
              <p className="text-center text-sm mb-2 text-slate-500">Amount tendered</p>
              <div className="flex gap-2 border rounded-lg p-2 items-center">
                <span>$</span>

                <input
                  readOnly={paymentMethod !== 'cash'}
                  className="text-2xl font-semibold text-center w-full outline-none"
                  type="number"
                  id="amount"
                  name="amount"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.amount}
                  placeholder="eg: 100"
                />
              </div>
            </div>

            <div className="flex gap-2 ">
              <button
                disabled={paymentMethod === 'cash'}
                type="button"
                onClick={handlePaymentCash}
                className={`${paymentMethod === 'cash' ? 'bg-green-500' : 'bg-slate-400'} flex-1  hover:bg-green-400 text-white py-1 px-2 rounded-lg `}
              >
                Cash
              </button>
              <button
                type="button"
                onClick={handlePaymentDebit}
                className={`${paymentMethod === 'debit_card' ? 'bg-green-500' : 'bg-slate-400'} flex-1  hover:bg-green-400 text-white py-1 px-2 rounded-lg `}
              >
                Debit Card
              </button>
              <button
                type="button"
                onClick={handlePaymentCredit}
                className={`${paymentMethod === 'credit_card' ? 'bg-green-500' : 'bg-slate-400'} flex-1  hover:bg-green-400 text-white py-1 px-2 rounded-lg `}
              >
                Credit Card
              </button>
            </div>
            {paymentMethod === 'cash' && (
              <div>
                <p className="text-center text-sm mb-2 text-slate-500">Quick cash payment</p>
                <div className="flex gap-2">
                  <button type="button" onClick={() => formik.setFieldValue('amount', 5)} className="bg-green-500 flex-1 py-1 text-white rounded-md">
                    $5
                  </button>
                  <button type="button" onClick={() => formik.setFieldValue('amount', 10)} className="bg-green-500 flex-1 py-1 text-white rounded-md">
                    $10
                  </button>
                  <button type="button" onClick={() => formik.setFieldValue('amount', 20)} className="bg-green-500 flex-1 py-1 text-white rounded-md">
                    $20
                  </button>
                  <button type="button" onClick={() => formik.setFieldValue('amount', 50)} className="bg-green-500 flex-1 py-1 text-white rounded-md">
                    $50
                  </button>
                  <button type="button" onClick={() => formik.setFieldValue('amount', 100)} className="bg-green-500 flex-1 py-1 text-white rounded-md">
                    $100
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="py-3 border-t text-slate-500">
            <p className="text-xs">Customer Information</p>
            <div>
              <p className="flex gap-2 items-center">
                <span>
                  <BiUser />
                </span>
                <span>{content?.customerName}</span>
              </p>
              <p className="flex gap-2 items-center">
                <span>
                  <MdOutlineTableBar />
                </span>
                <span>{content?.table}</span>
              </p>
            </div>
          </div>
          <div>
            <div className="bg-slate-100 p-2 rounded-md text-sm text-slate-500 border-b">
              <div className="flex justify-between">
                <p>Subtotal</p> <p>${content?.subtotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p>Discount sales</p> <p>-${content?.discountSales.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p>Total sales tax</p> <p>${content?.saleTax.toFixed(2)}</p>
              </div>
            </div>
            <div className="bg-slate-100 p-2 rounded-lg">
              <div className="flex justify-between text-xl font-semibold">
                <p>Total</p> <p>${content?.finalPrice.toFixed(2)}</p>
              </div>
              {paymentMethod === 'cash' && (
                <div className="flex justify-between">
                  <p>Change</p> <p>${change.toFixed(2)}</p>
                </div>
              )}
            </div>
          </div>
          <div className="py-2 flex gap-2">
            <button type="reset" className="bg-red-500 text-white py-1 px-2 rounded-md">
              Cancel
            </button>
            <button
              disabled={(formik.values.amount <= 0 && paymentMethod === 'cash') || (paymentMethod === 'cash' && change < 0)}
              type="submit"
              className="disabled:bg-slate-100 disabled:text-slate-400 flex-1 bg-green-500 text-white py-1 px-2 rounded-md  text-center"
            >
              Confirm
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
}

const generateRefOrder = () => {
  // Generate a random 3-character alphanumeric string
  const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let orderRef = '';

  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * randomChars.length);
    orderRef += randomChars.charAt(randomIndex);
  }

  // Add a timestamp to make it unique (optional)
  const timestamp = new Date().getTime();
  orderRef += timestamp.toString().slice(-3); // Take the last 3 digits of the timestamp

  return orderRef;
};
