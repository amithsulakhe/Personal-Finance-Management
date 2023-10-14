import React from 'react';
import './App.css';
import MyExpenseManagerPage from './Components/Pages/MyExpenseManagerPage';
import LoginPage from './Components/LoignForm/LoginPage';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

function App() {
  const appRouter = createBrowserRouter([
    {
      path: '/',
      element: <LoginPage />,
    },
    {
      path: '/dataPage',
      element: <MyExpenseManagerPage />,
    },
  ]);

  return (
    <div className="App">
    
        <RouterProvider router={appRouter}>
          <MyExpenseManagerPage />
        </RouterProvider>
  
    </div>
  );
}

export default App;
