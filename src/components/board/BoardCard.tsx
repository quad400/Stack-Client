import { IBoard } from "@/lib/interfaces";
import { useNavigate } from "react-router-dom";


type IBoardCardProps = Pick<IBoard, "image" | "_id" | "name">

const BoardCard = ({ _id, image, name }: IBoardCardProps) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/boards/${_id}`);
  };

  return (
    <button onClick={handleClick} className="relative group rounded-md h-32">
      <img
        src={image}
        alt={name}
        className="h-full w-full rounded-md object-cover"
      />
      <div className="absolute inset-0 rounded-md group-hover:bg-neutral-800/30 transition bg-neutral-800/20 p-2">
        <div className="text-white text-small font-medium">{name}</div>
      </div>
    </button>
  );
};

export default BoardCard;
