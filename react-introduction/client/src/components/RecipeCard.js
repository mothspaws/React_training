import './styles/RecipeCard.css';
import { Card } from "react-bootstrap";
import RecipeModal from './RecipeModal';
import { getIngredientById } from './api/IngredientsApi';
import { useState, useEffect } from 'react';
import restaurantImage from '../components/storage/restaurant.png';

function RecipeCard({ recipe, size }) {
    const cardClass = `card ${size}`;

    // zoom
    const [modalShow, setModalShow] = useState(false);

    const handleZoomClick = () => {
        setModalShow(true);
    };

    // ingredients
    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const fetchedIngredients = await Promise.all(
                    recipe.ingredients.map(ingredient => 
                        getIngredientById(ingredient.id)
                    )
                );

                const combinedIngredients = recipe.ingredients.map((ingredient) => {
                    const fetchedIngredient = fetchedIngredients.find(item => item.id === ingredient.id);
                    return {
                        name: fetchedIngredient ? fetchedIngredient.name : 'Unknown ingredient',
                        amount: ingredient.amount,
                        unit: ingredient.unit
                    };
                });

                setIngredients(combinedIngredients);
            } catch (error) {
                console.error("Failed to load ingredients", error);
            }
        }
        fetchData();
    }, [recipe.ingredients]);
    
    return (
        <>
            <Card className={cardClass}>
                {size !== 'small' && (
                    // recipe.imgUri
                    <Card.Img className="card-image" variant="top" src={restaurantImage} />
                )}
                <Card.Body className="card-body">
                    <Card.Title className="card-title">{recipe.name}</Card.Title>
                    <Card.Text className="card-text">
                        <div dangerouslySetInnerHTML={{ __html: recipe.description }} />
                    </Card.Text>
                    {size === 'small' && (
                            <ul className="card-ingredients">
                                {ingredients.map((ingredient, index) => (
                                    <li className="card-ingredient" key={index}>{ingredient.name} {ingredient.amount} {ingredient.unit}</li>
                                ))}
                            </ul>
                        )}
                    {size !== 'large' && (
                        <div className="card-zoom" onClick={handleZoomClick}>
                            🔍
                        </div>
                    )}
                </Card.Body>
            </Card>
            <RecipeModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                recipe={recipe}
                ingredients={ingredients}
            />
        </>
    );
}

export default RecipeCard;