import { useSession } from "@clerk/clerk-react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

const App = () => {
  const { isSignedIn,isLoaded } = useSession();

  const router = createBrowserRouter([
    {
      path: "/",
      element: isSignedIn ? <Dashboard /> : <Home />,
    },
    {
      path: "workspace/",
      // loader: isLoaded,
      element: isSignedIn && isLoaded ? <Dashboard /> : <Login />,
      children: [

      ]
    },
    {
      path: "/sign-in/*",
      element: <Login />,
    },
  ]);

  return (
    <div className="min-h-screen w-full">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
