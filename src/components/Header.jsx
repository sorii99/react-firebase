import React, { useContext } from 'react';
import { SiFirebase } from 'react-icons/si'
import { AppContext } from '../App';
import { getAuth, signOut } from "firebase/auth";
import { toast } from 'react-hot-toast';

const auth = getAuth();

export const Header = () => {

    const { setRoute, setUser, user } = useContext(AppContext);
    const handleLogout = () => {
        signOut(auth).then(() => {
            setRoute('login');
            setUser(null);
            toast('Sesion cerrada correctamente')
        }).catch((error) => {
        })
    }

    return (
        <header className='h-20 w-full bg-grey-100 shadow-lg flex items-center justify-between px-8 fixed top-0'>
            <div className='flex items-center gap-2 cursor-pointer' onClick={() => setRoute("home")}>
                <SiFirebase className='text-2xl text-pink-600' />
                <span className='text-xl semi-bold text-pink-600'>FireShopping</span>
            </div>

            <div className='flex gap-2'>
                {user ? (<>
                    <button className='bg-sky-500 text-white py-1 px-3 rounded-full hover:bg-sky-700 transition'
                        onClick={handleLogout}
                    >
                        Cerrar sesion
                    </button>
                </>) : (
                    <>
                        <button className='bg-sky-500 text-white py-1 px-3 rounded-full hover:bg-sky-700 transition'
                            onClick={() => setRoute("login")}
                        >
                            Login
                        </button>
                        <button className='bg-sky-500 text-white py-1 px-3 rounded-full hover:bg-sky-700 transition'
                            onClick={() => setRoute("register")}
                        >
                            Register
                        </button>
                    </>)
                }
            </div>
        </header>
    )
}