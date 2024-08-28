import './styles/IngredientList.css';
import { getIngredients } from '../components/api/IngredientsApi.js';
import { useState, useEffect, useMemo } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function IngredientList() {
  // ingredients
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedIngredients = await getIngredients();
        setIngredients(fetchedIngredients);
        setLoading(false);
      } catch (error) {
        console.error("Failed to load ingredients", error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // search
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredIngredients = useMemo(() => {
    return ingredients.filter((ingredient) => {
      return ingredient.name.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [searchQuery, ingredients]);

  return (
    <div className="IngredientList">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Hledat ingredience..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <div className="ingredient-table">
            {filteredIngredients.map((ingredient) => (
              <div className="ingredient-item" key={ingredient.id}>
                {ingredient.name}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default IngredientList;