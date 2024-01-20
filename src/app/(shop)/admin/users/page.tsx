export const revalidate = 0;

import { redirect } from 'next/navigation';
import { Pagination, Title } from '@/components';
import { UsersTable } from './ui/UsersTable';

import { getPaginatedUsers } from '@/actions';


export default async function OrdersPage() {

  const { ok, users } = await getPaginatedUsers();

  if( !ok ) redirect("/auth/login");
  if( !users )redirect("/auth/login");

  return (
    <>
      <Title title="Mantenimiento de Usuarios" />

      <div className="mb-10">
        <UsersTable users={ users } />

        <Pagination totalPages={ 1 } />
      </div>
    </>
  );
}