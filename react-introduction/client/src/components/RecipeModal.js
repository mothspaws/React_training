import './styles/RecipeModal.css';
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function RecipeModal({ show, onHide, recipe }) {
    if (!recipe) return null;

    return (
        <Modal show={show} onHide={onHide} centered className="recipe-modal">
            <Modal.Header closeButton>
                <Modal.Title>{recipe.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{recipe.description}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Zavřít
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default RecipeModal;