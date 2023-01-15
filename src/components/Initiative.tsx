import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";
import { ICharacter } from "./Characters";

const Initiative = ({ char }: { char: ICharacter }) => {
    const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id:char.id})
    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    }
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="rounded-md w-full p-3 border-indigo-500 bg-zinc-800 border flex justify-between items-center  capitalize font-bold text-gray-200 text-xl">
      {char.name}
    </div>
  );
};

export default Initiative;
