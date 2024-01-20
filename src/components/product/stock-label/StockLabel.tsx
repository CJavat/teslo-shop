"use client";

import { useEffect, useState } from "react";
import { titleFont } from "@/config/fonts";
import { getStockBySlug } from "@/actions";

interface Props {
  slug: string;
};

export const StockLabel = ({ slug }: Props) => {

  const [stock, setStock] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getStock = async () => {
      setIsLoading( true );
      const inStock = await getStockBySlug( slug );
      setStock( inStock );
      setIsLoading( false );
    }

    getStock();
  }, [ slug ])

  return (
    <>
      {
        isLoading 
          ? (
            <h2 className={`${ titleFont.className } antialiased font-bold text-lg bg-gray-200 animate-pulse`}>
              &nbsp;
            </h2>
          )
          : (
            <h2 className={`${ titleFont.className } antialiased font-bold text-lg `}>
              Stock: { stock }
            </h2>
          )
      }
    </>
  )
}
