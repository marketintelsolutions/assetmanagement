import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import MainLayout from "./components/MainLayout";
import About from "./pages/About";
import Team from "./pages/Team";
import MutualFund from "./pages/MutualFund";

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <MainLayout>
          <Landing />
        </MainLayout>
      )
    },
    {
      path: '/about',
      element: (
        <MainLayout>
          <About />
        </MainLayout>
      )
    },
    {
      path: '/team',
      element: (
        <MainLayout>
          <Team />
        </MainLayout>
      )
    },
    {
      path: '/services/mutual-funds',
      element: (
        <MainLayout>
          <MutualFund />
        </MainLayout>
      )
    },
  ])
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
