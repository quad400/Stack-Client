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
        dispatch(ShowModal(true, "cardModal", card))
    }

  return (
    <Draggable draggableId={card._id} index={index}>
      {(provided) => (
        <li 
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={handleOpen}
          className="bg-white cursor-pointer p-2 rounded-md shadow-sm"
        >
          <div className="text-neutral-900 font-medium text-start text-sm">
            {card.name}
          </div>
        </li>
      )}
    </Draggable>
  );
};

export default Card;
