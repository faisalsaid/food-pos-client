import React from 'react';

export default function Chart() {
  const myArray = [1, 2, 3, 4, 5, 6, 7, 8];
  console.log(myArray);

  const myStatus = myArray.includes(3);
  console.log(myStatus);
  return <div>Chart</div>;
}
