import './styles/RecipeBook.css';
import { useState } from 'react';
import RecipeCard from "./RecipeCard";

function chunkArray(array, chunkSize) {
    const results = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        results.push(array.slice(i, i + chunkSize));
    }
    return results;
}

function RecipeBook({ recipes, onZoomClick }) {
    const recipePairs = chunkArray(recipes, 2);

    const [currentPage, setCurrentPage] = useState(0);

    const handleNextPage = () => {
        if (currentPage < recipePairs.length - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="recipe-book">
            {recipePairs.map((pair, index) => (
                <div 
                    className={`recipe-pair ${index === currentPage ? 'active' : ''} ${index < currentPage ? 'flipped' : ''}`}
                    key={index}
                    style={{ zIndex: recipePairs.length - index }}
                >
                    {pair.map((recipe) => (
                        <div className="recipe-column" key={recipe.id}>
                            <RecipeCard 
                                recipe={recipe} 
                                size="medium" 
                                onZoomClick={() => onZoomClick(recipe)} 
                            />
                        </div>
                    ))}
                </div>
            ))}
            <div className="controls">
                <button 
                    className="previous" 
                    onClick={handlePreviousPage} 
                    disabled={currentPage === 0}>
                    </button>
                <button 
                    className="next"
                    onClick={handleNextPage} 
                    disabled={currentPage === recipePairs.length - 1}>
                    </button>
            </div>
        </div>
    );
}

RecipeBook.defaultProps = {
    recipes: [],
    onZoomClick: () => {},
};

export default RecipeBook;