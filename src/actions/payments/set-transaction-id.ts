"use server";

import prisma from "@/lib/prisma";

export const setTransactionId = async ( transactionId: string, orderId: string ) => {
  try {
    const order = await prisma.order.update({
      data: { transactionId: transactionId },

      where: { id: orderId }
    });

    if( !order ) return { ok: false, message: `No se encontró una orden con el id ${ orderId }` }

    return {
      ok: true,
      message: "ID de la transacción guardada correctamente"
    }
  } catch (error) {
    console.log( error );

    return {
      ok: false,
      message: "Eror al guardar el ID de la transacción en la Base de Datos"
    }
  }
};