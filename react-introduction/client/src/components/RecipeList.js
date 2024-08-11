import Recipe from "./Recipe";
import Carousel from 'react-bootstrap/Carousel';
import { Row, Col } from "react-bootstrap";
import { useState } from 'react';

function chunkArray(array, chunkSize) {
    const results = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        results.push(array.slice(i, i + chunkSize));
    }
    return results;
}

function RecipeList({ recipes }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const recipePairs = chunkArray(recipes, 2);

    const handleSelect = (selectedIndex) => {
        setActiveIndex(selectedIndex);
    };

    return (
        <div>
            <Carousel
                className="carousel"
                activeIndex={activeIndex}
                onSelect={handleSelect}
                interval={null}
            >
                {recipePairs.map((pair, index) => (
                    <Carousel.Item className="carousel-pair" key={index}>
                        <Row>
                            {pair.map((recipe, index) => (
                                <Col
                                    key={recipe.id}
                                >
                                    <Recipe recipe={recipe} />
                                </Col>
                            ))}
                        </Row>
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
}

RecipeList.defaultProps = {
    recipes: [],
};

export default RecipeList;