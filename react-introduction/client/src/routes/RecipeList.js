import './styles/RecipeList.css';
import RecipeBook from '../components/RecipeBook';
import RecipeTable from '../components/RecipeTable';
import { getRecipes } from '../components/api/RecipeApi.js';
import { getIngredients } from '../components/api/IngredientsApi.js';
import { useState, useMemo, useEffect, useContext } from 'react';
import AddRecipeModal from '../components/AddRecipeModal.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserContext from '../components/UserProvider.js';

function RecipeList() {
  // recipes
  const [recipes, setRecipes] = useState([]);
  const [recipesLoading, setRecipesLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedRecipes = await getRecipes();
        setRecipes(fetchedRecipes);
        setRecipesLoading(false);
      } catch (error) {
        console.error("Failed to load recipes", error);
        setRecipesLoading(false);
      }
    }
    fetchData();
  }, []);

  // ingredients
  const [ingredients, setIngredients] = useState([]);
  const [ingredientsLoading, setIngredientsLoading] = useState(true);

  useEffect(() => {
      async function fetchData() {
          try {
              const fetchedIngredients = await getIngredients();
              setIngredients(fetchedIngredients);
              setIngredientsLoading(false);
          } catch (error) {
              console.error("Failed to load ingredients", error);
              setIngredientsLoading(false);
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
  }, [searchQuery, recipes]);

  // modal
  const [showAddRecipeModal, setShowAddRecipeModal] = useState(false);
  const handleShowAddRecipeModal = () => setShowAddRecipeModal(true);
  const handleCloseAddRecipeModal = () => setShowAddRecipeModal(false);

  // context
  const { user } = useContext(UserContext);
  const canCreate = user.role === 'admin' || user.role === 'user';

  return (
    <div className="App">
      {recipesLoading && ingredientsLoading ?(
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
            {canCreate && (
              <button onClick={handleShowAddRecipeModal}>
                Přidat recept
              </button>
            )}
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