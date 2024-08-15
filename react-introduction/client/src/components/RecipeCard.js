import './styles/RecipeCard.css';
import { Card } from "react-bootstrap";
import RecipeModal from './RecipeModal';
import { useState } from 'react';
import restaurantImage from './storage/restaurant.png';

function RecipeCard({ recipe, size }) {
    const cardClass = `card ${size}`;

    // zoom
    const [modalShow, setModalShow] = useState(false);

    const handleZoomClick = () => {
        setModalShow(true);
    };
    
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
                        {recipe.description}
                    </Card.Text>
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
            />
        </>
    );
}

export default RecipeCard;