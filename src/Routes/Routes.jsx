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
import PrivateRoute from "../Context/PrivateRoute";
import AdminRoute from "../Context/AdminRoute";
import UserRoute from "../Context/UserRoute";
import UpdatePage from "../Pages/UpdatePage";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, element: <HomePage></HomePage> },
      {
        path: "/meals",
        element: <MealsPage></MealsPage>,
      },
      {
        path: "/upcoming-meals",
        element: (
          <PrivateRoute>
            <UpcomingMealsPage></UpcomingMealsPage>
          </PrivateRoute>
        ),
      },
      {
        path: "/admin-dashboard",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AdminDashboardPage></AdminDashboardPage>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/user-dashboard",
        element: (
          <PrivateRoute>
            <UserRoute>
              <UserDashboardPage></UserDashboardPage>
            </UserRoute>
          </PrivateRoute>
        ),
      },
      {
        path: '/update-meal/:id',
        element: (
          <PrivateRoute>
            <AdminRoute>
              <UpdatePage></UpdatePage>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/checkout/:planName/:price",
        element: (
          <PrivateRoute>
            <CheckoutPage></CheckoutPage>
          </PrivateRoute>
        ),
      },
      {
        path: "/meal-details/:id",
        element: (
          <PrivateRoute>
            <MealDetailPage></MealDetailPage>
          </PrivateRoute>
        ),
      }, // Placeholder for CheckoutPage
    ],
  },
  {
    path: "/signup",
    Component: SignUpPage,
  },
  {
    path: "/signin",
    Component: SignInPage,
  },
]);

export default router;
