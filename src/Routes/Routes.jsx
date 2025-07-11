import { createBrowserRouter } from "react-router";
import HomePage from "../Pages/HomePage";
import MainLayout from "../Layouts/MainLayout";
import SignUpPage from "../Pages/SignUpPage";
import SignInPage from "../Pages/SignInPage";
import MealsPage from "../Pages/MealsPage";
import UpcomingMealsPage from "../Pages/UpcomingMealsPage";
import AdminDashboard from "../Pages/AdminDashboard";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {index: true, element: <HomePage></HomePage>},
      {path: '/meals', element: <MealsPage></MealsPage>},
      {path: '/upcoming-meals', element: <UpcomingMealsPage></UpcomingMealsPage>},
      {path: 'admin-dashboard', element: <AdminDashboard></AdminDashboard>}
    ]
  },
  {
    path: '/signup',
    Component: SignUpPage
  },
  {
    path: '/signin',
    Component: SignInPage
  }
]);

export default router;
