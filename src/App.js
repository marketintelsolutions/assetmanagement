import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import MainLayout from "./components/MainLayout";
import About from "./pages/About";
import Team from "./pages/Team";
import MutualFund from "./pages/MutualFund";
import FixedIncomeTrading from "./pages/FixedIncomeTrading";
import WealthManagement from "./pages/WealthManagement";
import AlternativeInvestment from "./pages/AlternativeInvestment";
import Services from "./pages/Services";
import Contact from "./pages/Contact";

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
      path: '/services',
      element: (
        <MainLayout>
          <Services />
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
    {
      path: '/services/fixed-income-trading',
      element: (
        <MainLayout>
          <FixedIncomeTrading />
        </MainLayout>
      )
    },
    {
      path: '/services/wealth-management',
      element: (
        <MainLayout>
          <WealthManagement />
        </MainLayout>
      )
    },
    {
      path: '/services/alternative-investment',
      element: (
        <MainLayout>
          <AlternativeInvestment />
        </MainLayout>
      )
    },
    {
      path: '/contact',
      element: (
        <MainLayout>
          <Contact />
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
