import './styles/RecipeTable.css';
import RecipeCard from './RecipeCard';

function RecipeTable({ recipes }) {
    return (
        <div className="recipe-table">
            {recipes.map((recipe) => (
                <div className="recipe-table-item" key={recipe.id} class="col-12 col-md-6 col-lg-4 col-xl-2">
                    <RecipeCard 
                        recipe={recipe} 
                        size="small"
                    />
                </div>
            ))}
        </div>
    );
}

export default RecipeTable;