"use server";

import { prisma } from "@/lib/prisma"; // Your Prisma client instance
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { todoSchema } from "@/lib/zod";

export async function addTodo(formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const title = formData.get("title") as string;
  const validated = todoSchema.parse({ title });

  await prisma.todo.create({
    data: {
      title: validated.title,
      userId,
    },
  });

  revalidatePath("/");
}

export async function deleteTodo(id: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  await prisma.todo.delete({
    where: { id, userId },
  });

  revalidatePath("/");
}

export async function updateTodo(id: string, title: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  await prisma.todo.update({
    where: { id, userId },
    data: { title },
  });

  revalidatePath("/");
}