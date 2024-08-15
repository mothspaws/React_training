import './styles/RecipeTable.css';
import RecipeCard from './RecipeCard';

function RecipeTable({ recipes }) {
    return (
        <div className="recipe-table">
            {recipes.map((recipe) => (
                <div className="recipe-table-item" key={recipe.id}>
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