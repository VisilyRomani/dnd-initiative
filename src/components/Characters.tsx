// import { useDraggable } from "@dnd-kit/core";
import cuid from "cuid";
import React, { DetailedHTMLProps, FormEvent, FormEventHandler, FormHTMLAttributes, useState } from "react";
import { style } from "../App";
import Character from "./Character";

export interface ICharacter {
  id: string;
  name: string;
  star: boolean;
}

const Characters = ({
  AddInititive,
  initiative,
}: {
  AddInititive: (a: ICharacter) => void;
  initiative: ICharacter[];
}) => {
  const [character, setCharacter] = useState<string>("");
  const [listChar, setListChar] = useState<ICharacter[]>(() => {
    return JSON.parse(
      localStorage.getItem("characters") || "[]"
    ) as ICharacter[];
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const OnFormSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (character) {
      const newList = [
        ...listChar,
        { id: cuid(), name: character, star: false },
      ];
      localStorage.setItem("characters", JSON.stringify(newList));
      setListChar(newList);
      setCharacter("");
    }
  };

  return (
    
    <div className="flex flex-col items-center gap-5 overflow-auto m-3">
      <h1 className="text-gray-50 font-bold text-3xl">Characters</h1>
      <form onSubmit={OnFormSubmit} className='w-full'>
        <div className="flex flex-row items-center justify-center gap-3 w-full">
        <input
          value={character}
          style={style}
          className="rounded-md w-full h-12 mx-1 p-2"
          onChange={(e) => setCharacter(e.target.value)}
          />
        <button
          type="submit"
          style={style}
          className="text-indigo-500 whitespace-nowrap hover:text-white border border-indigo-500 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 h-12 text-center dark:border-blue-500 dark:hover:text-white dark:hover:bg-indigo-500 m-1"
          >
          New Character
        </button>
          </div>
      </form>

      <div className="bg-zinc-900 w-full mb-5 flex flex-auto flex-col items-center overflow-auto h-80 rounded-md gap-2">
        {listChar
          .filter((lc) => !initiative.find((i) => lc.id === i.id))
          .sort((a, b) => (b.star ? 1 : 0) - (a.star ? 1 : 0))
          .map((c) => {
            return (
              <Character
                char={c}
                setListChar={setListChar}
                listChar={listChar}
                key={c.id}
                AddInititive={AddInititive}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Characters;
