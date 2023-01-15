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
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="w-full p-3 border-slate-400 bg-gray-100 border flex justify-between items-center  capitalize font-bold text-gray-600 text-xl">
      {char.name}
    </div>
  );
};

export default Initiative;
