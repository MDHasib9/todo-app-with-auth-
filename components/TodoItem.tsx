"use client";

import { useState } from "react";
import { deleteTodo, updateTodo } from "@/app/actions";

export default function TodoItem({ id, title }: { id: string; title: string }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const handleUpdate = async () => {
    if (newTitle.trim() === "") return;
    await updateTodo(id, newTitle);
    setIsEditing(false);
  };

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg bg-white shadow-sm mb-2">
      {isEditing ? (
        <input
          autoFocus
          className="flex-1 border rounded px-2 py-1 outline-none focus:ring-2 focus:ring-blue-500"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onBlur={handleUpdate}
          onKeyDown={(e) => e.key === "Enter" && handleUpdate()}
        />
      ) : (
        <span 
          className="flex-1 cursor-pointer hover:text-blue-600"
          onClick={() => setIsEditing(true)}
        >
          {title}
        </span>
      )}

      <div className="flex gap-2 ml-4">
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className="text-sm text-gray-500 hover:text-blue-500"
        >
          {isEditing ? "Save" : "Edit"}
        </button>
        <button 
          onClick={() => deleteTodo(id)}
          className="text-sm text-red-500 hover:text-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
}