import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import NewList from "./NewList";
import ListCard from "./ListCard";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { GetListCardDispatch } from "@/features/workspaceSlice";
import { onDragEnd } from "@/lib/utils";
import BoardDetailLoader from "../loaders/BoardDetailLoader";

const BoardContent = () => {
  const { lists, loading } = useAppSelector((state) => state.workspace);
  const { boardId } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!boardId) return;

    dispatch(GetListCardDispatch(boardId));
  }, [boardId, dispatch]);

  if (loading) {
    return <BoardDetailLoader />;
  }

  return (
    <DragDropContext onDragEnd={(result) => onDragEnd(result, lists, dispatch)}>
      <Droppable droppableId="lists" type="list">
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="mt-6 mx-8 mb-10 flex flex-row justify-start items-start gap-4 flex-wrap"
          >
            {lists.map((item, index) => (
              <ListCard
                key={item._id}
                index={index}
                name={item.name}
                cards={item.cards}
                _id={item._id}
              />
            ))}
            {provided.placeholder}
            <NewList />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default BoardContent;
