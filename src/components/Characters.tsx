// import { useDraggable } from "@dnd-kit/core";
import cuid from "cuid";
import React, { useState } from "react";
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

  const OnFormSubmit = () => {
    if (character) {
      const newList = [
        ...listChar,
        { id: cuid(), name: character, star: false },
      ];
      localStorage.setItem("characters", JSON.stringify(newList));
      setListChar(newList);
      setCharacter("");
    }
  }

  return (
    <div className="flex flex-col items-center gap-5 overflow-auto">
      <h1 className="text-gray-50 font-bold text-2xl">Characters</h1>
        <form onSubmit={OnFormSubmit} className="flex flex-row gap-3 w-72">
        <input
          value={character}
          className="rounded-sm w-full"
          onChange={(e) => setCharacter(e.target.value)}
          ></input>
        <button
          type="submit"
          className="bg-slate-50 p-2 hover:bg-slate-200 active:bg-slate-500 rounded-sm">
          submit
        </button>
          </form>

      <div className="bg-slate-300 w-72 mb-10 flex-auto flex-col overflow-auto h-80 rounded-md">
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
