import React, { useState, useContext } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from 'react-hot-toast';
import { AppContext } from '../App';

const auth = getAuth();

export const Register = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setRoute, setUser } = useContext(AppContext);

    const handleRegister = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                toast(`Usuario: ${email} registrado correctamente`);
                setUser(user);
                setRoute('home');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleRegister();
    }

    return (
        <div className='flex flex-col gap-4 items-center'>
            <h1 className='text-sky-600 font-semibold text-center'>
                Registrate
            </h1>

            <form className='flex flex-col gap-2 max-w-sm' onSubmit={handleSubmit}>
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

                <button className='bg-sky-400 py-1 text-white rounded shadow'>
                    Registrar
                </button>
            </form>
        </div>
    )
}
