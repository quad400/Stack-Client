import { DragDropContext, Droppable } from "@hello-pangea/dnd";

// import { getLists } from "@/lib/actions/list-action";
import NewList from "./NewList";
import ListCard from "./ListCard";
import { IList } from "@/lib/interfaces";
import { useState } from "react";
// import useLists from "@/hooks/use-list";
import { useParams } from "react-router-dom";

const BoardContent = () => {
  const data = [
    {
      _id: "6662d30ea2e83b85b3f5e357",
      name: "Landing Page",
      board: {
        $oid: "66620068234b41aaf26c12dd",
      },
      cards: [
        {
          _id: "6662d966fe808258f5e49385",
          name: "Loading",
          list: "6662d30ea2e83b85b3f5e357",
          createdAt: "2024-06-07T09:56:54.727Z",
          updatedAt: "2024-06-08T08:59:20.209Z",
          description: "Good",
        },
        {
          _id: "6662d966fe808258f5e49388",
          name: "wejiwiw",
          list: "6662d30ea2e83b85b3f5e357",
          createdAt: "2024-06-07T09:56:54.727Z",
          updatedAt: "2024-06-08T08:59:20.209Z",
          description: "Good",
        },
      ],
      createdAt: "2024-06-07T09:29:50.076Z",
      updatedAt: "2024-06-08T09:42:23.932Z",
    },
    {
      _id: "6662d30ea2e83b85b3f5e384",
      name: "Landing Page",
      board: {
        $oid: "66620068234b41aaf26c12dd",
      },
      cards: [
        {
          _id: "6662d966fe808258f5e49387",
          name: "Loading",
          list: "6662d30ea2e83b85b3f5e357",
          createdAt: "2024-06-07T09:56:54.727Z",
          updatedAt: "2024-06-08T08:59:20.209Z",
          description: "Good",
        },
      ],
      createdAt: "2024-06-07T09:29:50.076Z",
      updatedAt: "2024-06-08T09:42:23.932Z",
    },
  ];

  const { boardId } = useParams();
  //   const lists = useLists({ boardId });

  // console.log("lists", lists);
  // const [data, setData] = useState(lists);

  // function reorder<T>(list: T[], startIndex: number, endIndex: number): T[] {
  //   const result = Array.from(list);
  //   const [removed] = result.splice(startIndex, 1);
  //   result.splice(endIndex, 0, removed);
  //   return result;
  // }

  // const onDragEnd = async (result: any) => {
  //   const { destination, source, draggableId, type } = result;

  //   if (!destination) {
  //     return;
  //   }

  //   //  if dropped in the same position
  //   if (
  //     destination.droppableId === source.droppableId &&
  //     destination.index === source.index
  //   ) {
  //     return;
  //   }

  //   // User movethe list
  //   if (type === "list") {
  //     const items = reorder(lists, source.index, destination.index).map(
  //       (list, index) => ({ ...list, index })
  //     );

  //     setData(items);
  //   }

  //   // User move card
  //   if (type === "card") {
  //     let newData = [...data];

  //     const sourceList = newData.find(
  //       (list) => list._id === source.droppableId
  //     );

  //     const destinationList = newData.find(
  //       (list) => list._id === destination.droppableId
  //     );

  //     if (!sourceList || !destinationList) {
  //       return;
  //     }

  //     // Check if cards exists on source list
  //     if (!sourceList.cards) {
  //       sourceList.cards = [];
  //     }

  //     // Check if cards exists on destination list
  //     if (!destinationList.cards) {
  //       destinationList.cards = [];
  //     }

  //     // Moving the card in the same list
  //     if (source.droppableId === destination.droppableId) {
  //       const reOrderedCards = reorder(
  //         sourceList.cards,
  //         source.index,
  //         destination.index
  //       ).map((card, index) => ({ ...card, index }));

  //       sourceList.cards = reOrderedCards;

  //       setData(newData);
  //     }
  //   }
  //   // if (type === "list") {
  //   //   return;
  //   // }

  //   // if (
  //   //   destination.droppableId === source.droppableId &&
  //   //   destination.index === source.index
  //   // ) {
  //   //   return;
  //   // }
  // };

  return (
    <DragDropContext onDragEnd={() => {}}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="mt-6 mx-8 flex flex-row justify-start items-start gap-4 flex-wrap"
          >
            {data.map((item, index) => (
              <ListCard
                key={item._id}
                index={index}
                name={item.name}
                cards={item.cards}
                id={JSON.parse(JSON.stringify(item._id))}
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
