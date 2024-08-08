import { Card } from "react-bootstrap";

function Recipe({ recipe }) {
    return (
        <Card className="card">
            <Card.Img className="card-image" variant="top" src={'./storage/restaurant.png'} />
            <Card.Body className="card-body">
                <Card.Title className="card-title">{recipe.name}</Card.Title>
                <Card.Text className="card-text">
                    {recipe.description}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default Recipe;