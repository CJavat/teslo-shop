"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";

export const ProductsInCart = () => {
  const [loaded, setLoaded] = useState( false );
  const productsInCart = useCartStore( state => state.cart );

  useEffect(() => {
    setLoaded( true ); //? Está es la forma de eliminar el error con la hidratación.
  }, [])
  
  if( !loaded ) return <p className="text-blue-500 font-bold text-5xl"> CARGANDO... </p>

  return (
    <>
      {
        productsInCart.map( product => (
          <div key={ `${ product.slug }-${ product.size }` } className="flex mb-5">
            <Image 
              src={`/products/${ product.image }`}
              width={ 100 }
              height={ 100 }
              style={{
                width: '100px',
                height: '100px'
              }}
              alt={ product.title }
              className="mr-5 rounded" 
            />

            <div>
              <span className="hover:underline cursor-pointer">
                <p>{ product.size } - { product.title } ({ product.quantity })</p>
              </span>

              <p className="font-bold">{ currencyFormat( product.price ) }</p>
            </div>
          </div>
        ))
      }
    </>
  )
}
