import React, { useEffect, useState } from 'react';
import { getProducts } from '../controllers/productController';

export const Home = () => {

    const [product, setProduct] = useState([]);

    useEffect(() => {
        getProducts()
            .then((r) => setProduct(r.data))
            .catch((e) => console.log(e));
    }, [])

    return (
        <>
            {
                product.length === 0
                    ?
                    "Sin stock disponible por el momento"
                    :
                    <div className='mt-4 grid grid-cols-3 md:grid-cols-5 gap-3'>
                        {product.map((product, i) =>
                            <div
                                key={i}
                                className='flex flex-col gap-2 border border-slate-100 p-4 shadow rounded'
                            >
                                <img src={product.image} />
                                <h2 className='font-semibold text-slate-700'>{product.title}</h2>
                                <span className='text-right text-slate-400'>${product.price}</span>
                            </div>
                        )}
                    </div>
            }
        </>
    )
}
