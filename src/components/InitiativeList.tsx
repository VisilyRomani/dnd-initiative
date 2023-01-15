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

    if(active.id !== over?.id && over?.id){
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
      <div className="flex flex-col items-center gap-5 overflow-auto">
        <h1 className="text-gray-50 font-bold text-2xl">Initiative</h1>
        <div className="bg-slate-300 w-72 mb-10 flex-auto flex-col overflow-auto h-80 rounded-md">
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
