export const revalidate = 60; // 60 seconds

import { redirect } from "next/navigation";
import { Gender } from "@prisma/client";
import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";

interface Props {
  params: {
    gender: string;
  };
  searchParams: {
    page?: string;
  };
}

export default async function GenderByPage({ searchParams, params }: Props) {
  const { gender } = params;

  const page = searchParams.page ? parseInt( searchParams.page ) : 1;
  const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({ page, gender: gender as Gender });

  if( products.length === 0 ) redirect(`/gender/${ gender }`);

  const labels: Record<string, string> = {
    'men': 'Para Hombres',
    'women': 'Para Mujeres',
    'kid': 'Para Niños',
    'unisex': 'Para Todos'
  };

  // if( params.id == 'kids') {
  //   notFound();
  // }

  return (
    <>
      <Title title={`Artículos de ${ labels[ gender ] }`} subtitle='Todos los productos' className='mb-2' />

      <ProductGrid products={ products } />

      <Pagination totalPages={ totalPages }  />
    </>
  );
}