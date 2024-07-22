import { createBrowserRouter } from "react-router-dom";

import {
  ErrorPage,
  FeedPage,
  GoalEditorPage,
  GoalPage,
  Layout,
  LoginPage,
  NotificationPage,
  SignupPage,
  SplashPage,
  TemplatePage,
} from "@/pages";

const route = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <SplashPage /> },
      { path: "/feed", element: <FeedPage /> },
      { path: "/goal", element: <GoalPage /> },
      { path: "/goal/editor/:goalId", element: <GoalEditorPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/notification", element: <NotificationPage /> },
      { path: "/signup", element: <SignupPage /> },
      { path: "/template", element: <TemplatePage /> },
    ],
  },
]);

export default route;
