import React, { useState, useEffect } from 'react';
import { addNew, deleteWish, getWish, updateWish } from '../firebase/controller';

const list = {
    title: 'Title',
    description: 'description'
}

export const Wishlist = () => {

    //const [title, setTitle] = useState('');
    //const [description, setDescription] = useState('');
    const [list, setList] = useState({ title: '', description: '' });
    const [wishlist, setWishlist] = useState([]);
    const [mode, setMode] = useState('add');

    const createNewWish = async () => {
        await addNew(list);
        setList({ title: '', description: '' });
        initializeWish();
    }

    const initializeWish = () => {
        getWish()
            .then(t => setWishlist([...t]))
            .catch((e) => console.error(e))
    }

    const editWish = id => {
        setMode('update');
        const edit = wishlist.find(t => t.id === id);
        setList({ ...edit });
    }

    const updateAWish = async () => {
        await updateWish(list);
        initializeWish();
        setMode('add');
    }

    const removeWish = async id => {
        await deleteWish(id);
        initializeWish();
    }

    useEffect(() => {
        initializeWish();
    }, [])

    return (
        <div className='flex flex-col gap-4 items-center'>
            <h1 className='text-sky-700 font-semibold text-lg'>Wishlist</h1>
            <div className='flex flex-col gap-4'>
                <h2 className='font-semibold px-1'>Make a wish:</h2>
                <input
                    className='border shadow outline-none focus:ring ring-sky-200 rounded px-2 py-1'
                    type='text'
                    placeholder='Product'
                    value={list.title}
                    onChange={(e) => setList({ ...list, title: e.target.value })}
                />

                <textarea
                    className='border shadow outline-none focus:ring ring-sky-200 rounded px-2 py-1'
                    type='text'
                    rows={3}
                    placeholder='Why you need it?'
                    value={list.description}
                    onChange={(e) => setList({ ...list, description: e.target.value })}
                />

                <button
                    className='bg-sky-400 text-white rounded shadow py-2 hover:bg-sky-500 transition font-semibold'
                    onClick={() => mode === 'add' ? createNewWish() : updateAWish()}
                >
                    {mode === 'add' ? 'Add' : 'Update'}
                </button>

                <button
                    className='bg-sky-400 text-white rounded shadow py-2 hover:bg-sky-500 transition font-semibold'
                    onClick={getWish}
                >
                    Obtain
                </button>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    {wishlist.map((list) => (
                        <div key={list.id} className='rounded-lg border border-sky-300 p-4 flex flex-col gap-2'>
                            <h1 className='font-semibold'>{list.title}</h1>
                            <div className='border-t border-sky-300' />
                            <p>{list.description}</p>

                            <div className='flex justify-between'>
                                <button
                                    onClick={() => editWish(list.id)}
                                    className='bg-sky-400 text-white rounded shadow py-1 px-2 m-1 hover:bg-green-500 transition font-semibold'
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => window.confirm('Are you sure?') && removeWish(list.id)}
                                    className='bg-sky-400 text-white rounded shadow m-1 py-1 px-2 hover:bg-red-500 transition font-semibold'
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

