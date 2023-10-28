import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { app } from '../firebase';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { signInStart, signInFailure, signInSuccess } from '../redux/user/user.slice.js';
import { apiURI } from '../config/environtment';

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      // console.log(result);
      const payload = {
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      };

      console.log(payload);
      return axios
        .post(`${apiURI}/auth/google`, payload)
        .then((resp) => {
          console.log(resp);
          dispatch(signInSuccess(resp.data));
          navigate('/dashboard');
        })
        .catch((err) => {
          console.log(err);
          dispatch(signInFailure(err.message));
        });
    } catch (error) {
      console.log('Could not sign in with google', error);
    }
  };

  return (
    <button onClick={handleGoogleClick} type="button" className=" mt-2 bg-red-600 text-white w-full rounded-md uppercase py-2 hover:bg-red-700">
      Continue With Google
    </button>
  );
}
