import { ICharacter } from "./Characters";
import React from "react";
import { AiOutlineRight, AiOutlineStar } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { style } from "../App";

interface CharacterInterface {
  char: ICharacter;
  setListChar: React.Dispatch<React.SetStateAction<ICharacter[]>>;
  listChar: ICharacter[];
  AddInititive: (c: ICharacter) => void;
}
const Character = ({
  char,
  setListChar,
  listChar,
  AddInititive,
}: CharacterInterface) => {
  return (
    <div
    style={style}
      className="w-full p-3 bg-zinc-800 flex justify-between items-center"
      key={char.id}
    >
      <div className="flex flex-row items-center gap-2 capitalize font-bold text-gray-200 text-xl">
        {char.name}
        <AiOutlineStar
          onClick={() => {
            const cIdx = listChar.findIndex((lChar) => lChar.id === char.id);
            const replace = [...listChar];
            replace[cIdx] = { ...listChar[cIdx], star: !listChar[cIdx].star };
            console.log("asdf");
            setListChar(replace);
            localStorage.setItem("characters", JSON.stringify(replace));
          }}
          size={30}
          className={`${
            char.star ? "text-indigo-500" : "text-gray-400"
          } hover:text-indigo-500`}
        />
      </div>
      <div className="flex flex-row items-center ">
        <BsTrash
          onClick={() => {
            const newList = listChar.filter((lChar) => lChar.id !== char.id);

            setListChar(newList);
            localStorage.setItem("characters", JSON.stringify(newList));
          }}
          size={30}
          className="hover:text-indigo-500 text-gray-200"
        />
        <AiOutlineRight
          onClick={() => AddInititive(char)}
          size={40}
          className="hover:text-indigo-500 text-gray-200"
        />
      </div>
    </div>
  );
};

export default Character;
