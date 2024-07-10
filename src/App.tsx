import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home";
import { useAppSelector } from "./hooks/useRedux";
import { Dashboard, Login, Register, Verify } from "./pages";

const App = () => {
  const { token } = useAppSelector((state) => state.user);

  const router = createBrowserRouter([
    {
      path: "/",
      element: token ? <Dashboard /> : <Home />,
    },
    {
      path: "workspace/",
      element: token ? <Dashboard /> : <Login />,
      children: [],
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
      path: "/verify/*",
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
