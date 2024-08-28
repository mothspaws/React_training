import './styles/RecipeList.css';
import RecipeBook from '../components/RecipeBook';
import RecipeTable from '../components/RecipeTable';
import { getRecipes } from '../components/api/RecipeApi.js';
import { getIngredients } from '../components/api/IngredientsApi.js';
import { useState, useMemo, useEffect } from 'react';
import AddRecipeModal from '../components/AddRecipeModal.js';
import 'bootstrap/dist/css/bootstrap.min.css';

function RecipeList() {
  // recipes
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedRecipes = await getRecipes();
        setRecipes(fetchedRecipes);
        setLoading(false);
      } catch (error) {
        console.error("Failed to load recipes", error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // ingredients
  const [ingredients, setIngredients] = useState([]);

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

  // view mode
  const [viewMode, setViewMode] = useState('table');

  const handleViewChange = (mode) => {
    setViewMode(mode);
  };

  // search
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      return (
        recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [searchQuery]);

  // modal
  const [showAddRecipeModal, setShowAddRecipeModal] = useState(false);
  const handleShowAddRecipeModal = () => setShowAddRecipeModal(true);
  const handleCloseAddRecipeModal = () => setShowAddRecipeModal(false);

  return (
    <div className="App">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="view-toggle">
            <button onClick={() => handleViewChange('table')} disabled={viewMode === 'table'}>
              Administrace
            </button>
            <button onClick={() => handleViewChange('book')} disabled={viewMode === 'book'}>
              Kniha receptů
            </button>
            <button onClick={handleShowAddRecipeModal}>
              Přidat recept
            </button>
            <AddRecipeModal show={showAddRecipeModal} handleClose={handleCloseAddRecipeModal} ingredientsAll={ingredients}/>
          </div>

          {viewMode === 'table' ? (
            <>
              <div className="search-bar">
                <input
                  type="text"
                  placeholder="Hledat recepty..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
              <RecipeTable recipes={filteredRecipes ? filteredRecipes : recipes} />
            </>

          ) : (
            <RecipeBook recipes={recipes} />
          )}
        </>
      )}
    </div>
  );
}

export default RecipeList;