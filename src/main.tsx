import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import LandingPage from "./pages/LandingPage.tsx";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import NotFound from "./pages/NotFound";
import NotAuthorizedPage from "./pages/NotAuthorizedPage";
import HomePage from "./pages/HomePage";
import TopicsPage from "./pages/TopicPage.tsx";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage.tsx";
import LogoutPage from "./pages/auth/LogoutPage.tsx";
import { AuthProvider } from "./providers/AuthContext.tsx";
import SettingsPage from "./pages/SettingsPage.tsx";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/home", element: <HomePage /> },
      { path: "/topics", element: <TopicsPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/logout", element: <LogoutPage /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/forgotpassword", element: <ForgotPasswordPage /> },
      { path: "/settings", element: <SettingsPage /> },
      { path: "/notauthorized", element: <NotAuthorizedPage /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
