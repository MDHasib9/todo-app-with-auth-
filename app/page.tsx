import { auth } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import { prisma } from "@/lib/prisma";
import { addTodo } from "./actions";
import TodoItem from "@/components/TodoItem";

export default async function Home() {
  const { userId } = await auth();
  const todos = await prisma.todo.findMany({
    where: { userId: userId! },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="max-w-2xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Tasks</h1>
        <UserButton />
      </div>

      <form action={addTodo} className="flex gap-2 mb-8">
        <input
          name="title"
          placeholder="What needs to be done?"
          className="flex-1 border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-black"
          required
        />
        <button className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800">
          Add
        </button>
      </form>

      <div className="space-y-2">
        {todos.map((todo) => (
          <TodoItem key={todo.id} id={todo.id} title={todo.title} />
        ))}
      </div>
    </main>
  );
}