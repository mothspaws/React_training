import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App';
import Home from './routes/Home';
import RecipeList from './routes/RecipeList';
import RecipeDetail from './routes/RecipeDetail';
import IngredientList from './routes/IngredientList';
import reportWebVitals from './reportWebVitals';
import { UserProvider } from './components/UserProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="" element={<Home />} />
            <Route path="recipeList" element={<RecipeList />} />
            <Route path="recipeDetail" element={<RecipeDetail />} />
            <Route path="ingredientList" element={<IngredientList />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
