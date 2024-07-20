import CardModal from "./CardModal"
import CreateBoardModal from "./CreateBoardModal"
import CreateWorkSpaceModal from "./CreateWorkSpaceModal"
import ManageMemberModal from "./ManageMemberModal"

const ModalProvider = () => {
  return (
    <>
    <CreateWorkSpaceModal />
    <CreateBoardModal />
    <CardModal />
    <ManageMemberModal />
    </>
  )
}

export default ModalProvider