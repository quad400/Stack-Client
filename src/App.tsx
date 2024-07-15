import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home";
import { useAppDispatch, useAppSelector } from "./hooks/useRedux";
import { Boards, Dashboard, Login, Register, Verify } from "./pages";
import BoardDetail from "./pages/dashboard/BoardDetail";
import WorkspaceHome from "./pages/dashboard/WorkspaceHome";
import BoardList from "./pages/dashboard/BoardList";
import { useEffect } from "react";
import { UserDetails } from "./features/userSlice";
import Protected from "./components/Protected";

const App = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");

    console.log(token);
    if (token) {
      dispatch(UserDetails());
    }
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "workspace",
      element: (
        <Protected>
          <Dashboard />
        </Protected>
      ),
      children: [
        {
          path: "home",
          element: <WorkspaceHome />,
        },
        {
          path: "boards",
          element: <BoardList />,
        },
        {
          path: ":workspaceId",
          element: <Boards />,
        },

        {
          path: ":workspaceId/settings",
          element: <Boards />,
        },
        {
          path: ":workspaceId/members",
          element: <Boards />,
        },
      ],
    },
    {
      path: "boards/:boardId",
      element: <BoardDetail />,
    },
    {
      path: "/login/*",
      element: <Login />,
    },
    {
      path: "/register/*",
      element: <Register />,
    },
    {
      path: "/verify/:verifyId",
      element: <Verify />,
    },
  ]);

  return (
    <div className="min-h-screen w-full">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
