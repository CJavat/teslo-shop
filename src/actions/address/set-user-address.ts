"use server";

import prisma from "@/lib/prisma";
import type { Address } from "@/interfaces";

export const setUserAddress = async ( address: Address, userId: string ) => {
  try {
    const newAddress = await createOrReplaceAddress( address, userId );

    return {
      ok: true,
      address: newAddress
    }
  } catch (error) {
    console.log(error);

    return {
      ok: false,
      message: 'No se pu1do guardar la dirección'
    }
  }
};

const createOrReplaceAddress = async ( address: Address, userId: string ) => {
  try {
    const storeAddress = await prisma.userAddress.findUnique({
      where: {
        userId: userId
      }
    })

    const addressToSave = {
      userId: userId,
      firstName: address.firstName,
      lastName: address.lastName,
      address: address.address,
      address2: address.address2,
      countryId: address.country,
      postalCode: address.postalCode,
      phone: address.phone,
      city: address.city
    };

    if( !storeAddress ) {
      const newAddress = await prisma.userAddress.create({
        data: addressToSave
      })

      return newAddress;
    }

    const updatedAddress = await prisma.userAddress.update({
      where: { userId },
      data: addressToSave
    });

    return updatedAddress;

  } catch (error) {
    console.log( error );
    throw new Error('No se pudo guardar la dirección');
  }
};