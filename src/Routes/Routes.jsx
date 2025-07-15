import { createBrowserRouter } from "react-router";
import HomePage from "../Pages/HomePage";
import MainLayout from "../Layouts/MainLayout";
import SignUpPage from "../Pages/SignUpPage";
import SignInPage from "../Pages/SignInPage";
import MealsPage from "../Pages/MealsPage";
import UpcomingMealsPage from "../Pages/UpcomingMealsPage";
import AdminDashboardPage from "../Pages/AdminDashboardPage";
import UserDashboardPage from "../Pages/UserDashboardPage";
import CheckoutPage from "../Pages/CheckoutPage";
import MealDetailPage from "../Pages/MealDetailPage";



const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {index: true, element: <HomePage></HomePage>},
      {path: '/meals', element: <MealsPage></MealsPage>},
      {path: '/upcoming-meals', element: <UpcomingMealsPage></UpcomingMealsPage>},
      {path: '/admin-dashboard', element: <AdminDashboardPage></AdminDashboardPage>}, 
      {path: '/user-dashboard', element: <UserDashboardPage></UserDashboardPage>},
      {path: '/checkout', element: <CheckoutPage></CheckoutPage>}, 
      {path: '/meal-details', element: <MealDetailPage></MealDetailPage>}// Placeholder for CheckoutPage
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
