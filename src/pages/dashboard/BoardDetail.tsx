import BoardContent from "@/components/board/BoardContent";
import BoardHeader from "@/components/board/BoardHeader";
import BoardSIdeBar from "@/components/board/BoardSIdeBar";
import MainNav from "@/components/MainNav";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GetBoardDispatch } from "@/features/workspaceSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const BoardDetail = () => {
  const { boardId } = useParams();

  const { board } = useAppSelector((state) => state.workspace);
  const dispatch = useAppDispatch();

  if (!boardId) return;
  
  useEffect(() => {
    dispatch(GetBoardDispatch(boardId));
  }, [dispatch, boardId]);
  

  return (
    <div className="w-full h-screen flex flex-col relative">
      <MainNav />
      <ScrollArea className="w-full h-full whitespace-nowrap">
        <div className="flex flex-row w-full">
          <img
            alt="dhs"
            src={board?.image}
            className="object-cover absolute w-full h-full -z-10"
          />
          <BoardSIdeBar />
          <div className="flex flex-col w-full h-full">
            <BoardHeader name={board?.name} />
            <BoardContent />
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default BoardDetail;
