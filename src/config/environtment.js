export const apiURI = import.meta.env.VITE_STATUS_MODE === 'prod' ? 'https://pos-api-ohvj.onrender.com/api' : 'http://localhost:3000/api';
console.log(apiURI);
