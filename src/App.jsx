import React from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { store } from "./store/store";
import AuthPage from "./components/AuthPage";
import Todo from "./components/Todo";
import Counter from "./components/Counter";
import { logout } from "./store/slices/authSlice";

function ProtectedRoute({ element }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return isAuthenticated ? element : <Navigate to="/login" replace />;
}

function Navbar() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    isAuthenticated && (
      <div className="p-4 bg-white shadow-md flex justify-between items-center">
        <h1 className="text-lg font-bold">My App</h1>
        <button
          onClick={() => dispatch(logout())}
          className="px-4 py-2 bg-red-600 text-white rounded"
        >
          Logout
        </button>
      </div>
    )
  );
}

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter
        future={{
          v7_startTransition: true, // Opt into the state update transition feature for React Router v7
          v7_relativeSplatPath: true, // Opt into the relative route resolution feature for Splat routes
        }}
      >
        <Navbar />
        <div className="min-h-screen bg-gray-100">
          <Routes>
            <Route path="/login" element={<AuthPage />} />
            <Route path="/signup" element={<AuthPage />} />
            <Route
              path="/todo"
              element={<ProtectedRoute element={<Todo />} />}
            />
            <Route
              path="/counter"
              element={<ProtectedRoute element={<Counter />} />}
            />
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
