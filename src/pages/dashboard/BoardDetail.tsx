import BoardContent from "@/components/board/BoardContent";
import BoardHeader from "@/components/board/BoardHeader";
import BoardSIdeBar from "@/components/board/BoardSIdeBar";
import MainNav from "@/components/MainNav";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useParams } from "react-router-dom";

const BoardDetail = () => {

  const {boardId} = useParams()



  return (
    <div className="w-full h-screen flex flex-col relative">
      <MainNav />
      <ScrollArea className="w-full h-full">
        <div className="flex flex-row w-full">
          {/* <img
            alt="dhs"
            src={imageUri}
            className="object-cover absolute w-full h-full -z-10"
          /> */}
          <BoardSIdeBar />
          <div className="flex flex-col w-full h-full">
            <BoardHeader name="jkskjd" />
            <BoardContent />
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default BoardDetail;
