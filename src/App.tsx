import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home";
import { useAppDispatch } from "./hooks/useRedux";
import { Boards, Dashboard, Login, Register, Verify } from "./pages";
import BoardDetail from "./pages/dashboard/BoardDetail";
import { Helmet } from "react-helmet";
import BoardList from "./pages/dashboard/BoardList";
import { useEffect } from "react";
import { Token, UserDetails } from "./features/userSlice";
import Protected from "./components/Protected";
import Settings from "./pages/dashboard/Settings";
import Activity from "./pages/dashboard/Activity";
import Invite from "./pages/dashboard/Invite";
import Members from "./pages/dashboard/Members";

const App = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(UserDetails(token));
    }
  }, []);

  useEffect(() => {
    dispatch(Token());
  }, [dispatch]);

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
          path: "",
          element: <BoardList />,
        },
        {
          path: ":workspaceId/activity",
          element: <Activity />,
        },
        {
          path: ":workspaceId",
          element: <Boards />,
        },
        {
          path: ":workspaceId/settings",
          element: <Settings />,
        },
        {
          path: ":workspaceId/members",
          element: <Members />,
        },
      ],
    },
    {
      path: "invite/:inviteCode",
      element: (
        <Protected>
          <Invite />
        </Protected>
      ),
    },
    {
      path: "boards/:boardId",
      element: (
        <Protected>
          <BoardDetail />
        </Protected>
      ),
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
      <Helmet>
        <title>Stack</title>
        <meta
          name="description"
          content=""
        />
        <meta name="keywords" content="Stack, Project Management, Project" />
        <meta property="og:title" content="Stack" />
        <meta
          property="og:description"
          content="The Ultimate Teamwork — Stack tells you what's being worked on, who's assigned, and where. Stack Brings All Your Tasks, Teammates, And Tools Together."
        />
        <meta property="og:image" content="http://res.cloudinary.com/dupox1iqn/image/upload/v1721515087/Stack/394e2b0cdb17c7afd9d96d3473544b53.png" />
        <meta property="og:url" content="https://example.com" />
      </Helmet>

      <RouterProvider router={router} />
    </div>
  );
};

export default App;
