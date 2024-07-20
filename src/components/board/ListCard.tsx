
import { Plus } from "lucide-react";

import ListHeader from "./ListHeader";
import NewCard from "./NewCard";
import ListAction from "./ListAction";
import { Button } from "../ui/button";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { ICard } from "@/lib/interfaces";
import Card from "./Card";

interface ListCardProps {
  name: string;
  _id: string;
  cards: ICard[];
  index: number;
}

const ListCard = ({ name, _id, index, cards }: ListCardProps) => {
  
  return (
    <Draggable draggableId={_id} index={index}> 
      {(provided) => (
        <li
        {...provided.dragHandleProps}
        {...provided.draggableProps}
        ref={provided.innerRef}
        className="bg-white/80 w-[250px] rounded-lg shadow-lg py-2 px-2.5 transition-all flex flex-col"
        >
          <div
  
            className="flex-row justify-between flex my-1 space-x-1 items-center"
          >
            <ListHeader name={name} _id={_id} />

            <ListAction listId={_id} name={name} />
          </div>
          <Droppable  droppableId={_id} type="card">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="flex flex-col space-y-2 mb-2"
              >
                {cards.map((card, index) => (
                  <Card key={card._id} card={card} index={index} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <NewCard listId={_id}>
            <Button
              variant="ghost"
              className="flex justify-start space-x-3 w-full items-center"
            >
              <Plus className="text-neutral-700 h-5 w-5" />
              <div className="text-neutral-700 text-sm font-medium">
                Add Card
              </div>
            </Button>
          </NewCard>
        </li>
      )}
    </Draggable>
  );
};

export default ListCard;
