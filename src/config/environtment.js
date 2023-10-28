export const apiURI = import.meta.env.VITE_STATUS_MODE === 'prod' ? 'https://cyclic-api-demo.cyclic.cloud/api' : 'http://localhost:3000/api';
console.log(apiURI);
