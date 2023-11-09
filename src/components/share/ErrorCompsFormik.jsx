import React from 'react';

export default function ErrorCompsFormik({ name, children }) {
  return <div className="bg-red-100 px-2 py-1 text-red-700 text-sm rounded-md">{children}</div>;
}
