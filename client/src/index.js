import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Dashboard from "./pages/Dashboard";
import Documents from "./pages/Documents";
import Editor from "./pages/Editor";
import Plans from "./pages/Plans";
import Calendar from "./pages/Calendar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ContextProvider } from "./contexts/contextProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "documents",
        element: <Documents />,
      },
      {
        path: "editor",
        element: <Editor />,
      },
      {
        path: "pricing",
        element: <Plans />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "calendar",
        element: <Calendar />,
      },
    ],
  },
]);

const Index = () => {
  const [theme, colorMode] = useMode();
  return (
    <ContextProvider>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <RouterProvider router={router} />
        </ThemeProvider>
      </ColorModeContext.Provider>
    </ContextProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Index />);
