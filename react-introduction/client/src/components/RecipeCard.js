import './styles/RecipeCard.css';
import { Card } from "react-bootstrap";
import restaurantImage from './storage/restaurant.png';

function RecipeCard({ recipe, size, onZoomClick }) {
    const cardClass = `card ${size}`;
    
    return (
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
                    <div className="card-zoom" onClick={onZoomClick}>
                        🔍
                    </div>
                )}
            </Card.Body>
        </Card>
    );
}

export default RecipeCard;