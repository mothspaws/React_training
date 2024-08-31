import './styles/RecipeBook.css';
import { useState } from 'react';
import RecipeCard from "./RecipeCard";

function RecipeBook({ recipes }) {
    // listing recipes
    const [currentPage, setCurrentPage] = useState(0);

    const handleNextPage = () => {
        if (currentPage < Math.ceil(recipes.length / 2) - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Calculate start and end indices for the current page
    const startIndex = currentPage * 2;
    const endIndex = startIndex + 2;

    // Extract the recipes to be shown on the current page
    const currentRecipes = recipes.slice(startIndex, endIndex);

    return (
        <div className="recipe-book">
            <div 
                className={`recipe-pair active`} 
                style={{ zIndex: recipes.length - currentPage }}
            >
                {currentRecipes.map((recipe) => (
                    <div className="recipe-column flipped" key={recipe.id}>
                        <RecipeCard 
                            recipe={recipe} 
                            size="medium" 
                        />
                    </div>
                ))}
            </div>
            <div className="controls">
                <button 
                    className="previous" 
                    onClick={handlePreviousPage} 
                    disabled={currentPage === 0}>
                    </button>
                <button 
                    className="next"
                    onClick={handleNextPage} 
                    disabled={currentPage === Math.ceil(recipes.length / 2) - 1}>
                    </button>
            </div>
        </div>
    );
}

export default RecipeBook;