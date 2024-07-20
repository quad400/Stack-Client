import { ShowModal } from "@/features/workspaceSlice";
import { useAppDispatch } from "@/hooks/useRedux";
import { ICard } from "@/lib/interfaces";
import { Draggable } from "@hello-pangea/dnd";

interface CardProps {
  card: ICard;
  index: number;
}

const Card = ({ card, index }: CardProps) => {

    const dispatch = useAppDispatch()

    const handleOpen = ()=> {
      console.log(card)
        dispatch(ShowModal(true, "cardModal", card))
    }
  return (
    <Draggable draggableId={card._id} index={index}>
      {(provided) => (
        <div 
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          role="button"
          onClick={handleOpen}
          className="bg-white p-2 rounded-md hover:ring-1 hover:ring-neutral-700 shadow-md text-neutral-900 font-medium text-start text-sm"
        >
            {card.name}
         </div>
      )}
    </Draggable>
  );
};

export default Card;
