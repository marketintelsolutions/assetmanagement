import { RouterProvider, createBrowserRouter } from "react-router-dom";
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
import FundManager from "./pages/FundManager";
import Faqs from "./pages/Faqs";
import FundCalculator from "./pages/FundCalculator";
import Career from "./pages/Career";
import TeamMember from "./pages/TeamMember";
import Forms from "./pages/Forms";
import WhatWeDo from "./pages/WhatWeDo";

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
      path: '/about/what-we-do',
      element: (
        <MainLayout>
          <WhatWeDo />
        </MainLayout>
      )
    },
    {
      path: '/about/team',
      element: (
        <MainLayout>
          <Team />
        </MainLayout>
      )
    },
    {
      path: '/team/:id',
      element: (
        <MainLayout>
          <TeamMember />
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
      path: '/insights/fund-manager',
      element: (
        <MainLayout>
          <FundManager />
        </MainLayout>
      )
    },
    {
      path: '/insights/faqs',
      element: (
        <MainLayout>
          <Faqs />
        </MainLayout>
      )
    },
    {
      path: '/insights/fund-calculator',
      element: (
        <MainLayout>
          <FundCalculator />
        </MainLayout>
      )
    },
    {
      path: '/insights/forms',
      element: (
        <MainLayout>
          <Forms />
        </MainLayout>
      )
    },
    {
      path: '/careers',
      element: (
        <MainLayout>
          <Career />
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
