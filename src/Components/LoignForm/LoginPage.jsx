import React, { useEffect, useRef, useState } from 'react';
import { checkValidateform } from '../Firebase/utils/Validate';
import { auth } from '../Firebase/firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const [isloggedin, setisloggedin] = useState(true);
  const [errormessage, seterrormessage] = useState(null);
  const email = useRef(null);
  const name = useRef(null);
  const password = useRef(null);

  const submitform = (e) => {
    e.preventDefault();

    const message = checkValidateform(email.current.value, password.current.value);
    seterrormessage(message)
    if (isloggedin) {
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          const user = userCredential.user;
          sessionStorage.setItem("user", JSON.stringify(user));

          updateProfile(user, {
            displayName: name.current.value,
            photoURL: 'https://example.com/jane-q-user/profile.jpg',
          }).then(() => {
            // const { vid, email, displayName } = auth.currentUser;
          }).catch((error) => {
            seterrormessage(error.message);
          });

          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          seterrormessage(errorCode + errorMessage);
        });
    } else {
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          const user = userCredential.user;
          sessionStorage.setItem("user", JSON.stringify(user));
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          seterrormessage(errorCode + '-' + errorMessage);
        });
    }
  };

  useEffect(() => {
    const unsubsrcibe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // const { vid, email, displayName } = user;
        navigate('/dataPage');
      } else {
        navigate('/');
      }
    });

    return () => unsubsrcibe();
  }, [navigate]);

  return (
    <div className='h-[100vh] grid place-items-center bg-[#B70860] w-full absolute top-0'>
      <form action='' className='flex flex-col gap-2 rounded-lg bg-[#F2F2F2] p-6 shadow-xl w-80 md:p-4 md:w-96'>
        <h1 className='font-bold text-2xl text-center'>Login Page</h1>
        {isloggedin && (
          <div className='flex flex-col gap-2 font-bold'>
            <label htmlFor='name'>Name</label>
            <input ref={name} type='text' placeholder='Full name' id='name' required className='px-4 py-3 shadow-lg bg-gray-300 outline-none placeholder:text-black placeholder:font-normal' />
          </div>
        )}
        <div className='flex flex-col gap-2 font-bold'>
          <label htmlFor='email'>Email</label>
          <input ref={email} className='px-4 py-3 shadow-lg bg-gray-300 outline-none placeholder:text-black placeholder:font-normal' type='text' id='email' placeholder='Enter the Email' required />
        </div>
        <div className='flex flex-col gap-2 font-bold'>
          <label htmlFor='password'>Password</label>
          <input ref={password} className='px-4 py-3 shadow-lg bg-gray-300 outline-none placeholder:text-black placeholder:font-normal' type='password' id='password' placeholder='Enter the Password' required />
        </div>
        <p className='text-red-700 font-bold text-center'>{errormessage}</p>
        <button className='px-4 py-3 rounded-md bg-green-500 transition-all transition-500 text-xl hover:shadow-lg hover:bg-green-600' onClick={submitform}>
          {!isloggedin ? 'Sign In' : 'Sign Up'}
        </button>
        <p className='my-5'>
          {isloggedin ? 'Already registered' : 'New to Netflix-gpt'}{' '}
          <span className='hover:underline cursor-pointer' onClick={() => setisloggedin(!isloggedin)}>
            {isloggedin ? 'Sign in now' : 'Sign up now'}
          </span>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
