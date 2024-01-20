"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const changeUserRole = async ( userId: string, role: string ) => {
  const session = await auth();

  if( !session ) return { ok: false, message: "Debe de estar autenticado como ADMIN" };

  try {

    const newRol = role === "admin" ? "admin" : "user";
    
    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        role: newRol
      }
    });

    revalidatePath('/admin/users');

    return {
      ok: true,
      user: user
    }

  } catch (error) {
    console.log( error );

    return {
      ok: false,
      message: "No se pudo actualizar el rol. Revisar logs"
    }
  }

};