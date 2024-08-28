import './styles/RecipeTable.css';
import RecipeCard from './RecipeCard';

function RecipeTable({ recipes }) {
    return (
        <div className="recipe-table">
            {recipes.map((recipe) => (
                <div className="recipe-table-item" key={recipe.id} class="col-12 col-md-5 col-lg-4.5 col-xl-3">
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