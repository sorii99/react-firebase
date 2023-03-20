import React, { useState, useContext } from 'react';
import { GoogleAuthProvider, getAuth, signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-hot-toast';
import { AppContext } from '../App';

const provider = new GoogleAuthProvider();
const auth = getAuth();

export const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUser, setRoute } = useContext(AppContext);

    const handleGoogleLogin = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                toast('Inicio de sesion valido');
                setUser(user);
                setRoute('home');
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.customData.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
            })
    }

    const handleLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                toast('Inicio de sesion valido');
                setUser(user);
                setRoute('home');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }

    return (
        <div className='flex flex-col gap-4 items-center'>
            <h1 className='text-sky-600 font-semibold text-center'>Iniciar sesión</h1>
            <div className='flex flex-col'>
                <form className='flex flex-col gap-2 max-w-sm' onSubmit={handleLogin}>
                    <input
                        className='border border-grey-500 rounded py-1 px-2 outline-none'
                        placeholder='Correo electronico'
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        className='border border-grey-500 rounded py-1 px-2 outline-none'
                        placeholder='Contraseña'
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button className='bg-sky-400 py-1 text-white rounded shadow hover:bg-sky-500 transition'>
                        Ingresar
                    </button>
                    <button className='bg-sky-400 py-1 text-white rounded shadow hover:bg-sky-500 transition' onClick={handleGoogleLogin}>
                        Ingresar con Google
                    </button>
                </form>
            </div>
        </div>)
}
