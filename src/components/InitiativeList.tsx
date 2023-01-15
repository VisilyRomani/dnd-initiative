import {
  DndContext,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { closestCenter } from "@dnd-kit/core";
import { DragEndEvent, UniqueIdentifier } from "@dnd-kit/core/dist/types";
import {
    arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableContext } from "@dnd-kit/sortable";
import React, { useState } from "react";
import { ICharacter } from "./Characters";
import Initiative from "./Initiative";

const InitiativeList = ({ Characters, editOrder }: { Characters: ICharacter[], editOrder:React.Dispatch<React.SetStateAction<ICharacter[]>> }) => {
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if(activeId !== over?.id && over?.id){
        editOrder((items) => {
            const oldIndex = items.map(i => i.id).indexOf(active.id.toString());
            const newIndex = items.map(i => i.id).indexOf(over.id.toString());
            return arrayMove(items, oldIndex, newIndex);
        })
    }
    setActiveId(null);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex flex-col items-center gap-5 overflow-auto m-3">
        <h1 className="text-gray-50 font-bold text-3xl">Initiative</h1>
        <div className="bg-zinc-900 w-full mb-5 flex flex-auto flex-col items-center overflow-auto h-80 rounded-md gap-2">
          <SortableContext
            items={Characters}
            strategy={verticalListSortingStrategy}
          >
            {Characters.map((c) => {
              return <Initiative key={c.id} char={c} />;
            })}
          </SortableContext>
        </div>
      </div>
    </DndContext>
  );
};
export default InitiativeList;
