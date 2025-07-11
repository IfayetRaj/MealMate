import { createBrowserRouter } from "react-router";
import HomePage from "../Pages/HomePage";
import MainLayout from "../Layouts/MainLayout";
import SignUpPage from "../Pages/SignUpPage";
import SignInPage from "../Pages/SignInPage";
import MealsPage from "../Pages/MealsPage";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {index: true, element: <HomePage></HomePage>},
      {path: '/meals', element: <MealsPage></MealsPage>},
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
