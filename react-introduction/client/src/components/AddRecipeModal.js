import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import { createRecipe } from './api/RecipeApi.js';
import 'react-quill/dist/quill.snow.css';

function AddRecipeModal({ show, handleClose, ingredientsAll }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState([{ name: '', amount: '', unit: '' }]);

    const handleAddIngredient = () => {
        setIngredients([...ingredients, { name: '', amount: '', unit: '' }]);
    };

    const handleRemoveIngredient = (index) => {
        const newIngredients = ingredients.filter((_, i) => i !== index);
        setIngredients(newIngredients);
    };

    const handleIngredientChange = (index, field, value) => {
        const newIngredients = [...ingredients];
        newIngredients[index][field] = value;
        setIngredients(newIngredients);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const recipeData = {
            name: title,
            description: description,
            ingredients: ingredients.map((ingredient) => ({
                id: ingredientsAll.find((item) => item.name === ingredient.name)?.id || '',
                amount: parseFloat(ingredient.amount),
                unit: ingredient.unit
            }))
        };
    
        try {
            await createRecipe(recipeData);
            handleClose();
        } catch (error) {
            console.error("Error creating recipe:", error);
            alert("Nastala neočekávaná chyba při vytváření receptu");
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>Vytvoření receptu</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Název</Form.Label>
                        <Form.Control
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Postup</Form.Label>
                        <ReactQuill value={description} onChange={setDescription} />
                    </Form.Group>
                    <Row className="mb-2">
                        <Col md={5}><strong>Ingredience</strong></Col>
                        <Col md={3}><strong>Počet</strong></Col>
                        <Col md={2}><strong>Jednotka</strong></Col>
                        <Col></Col>
                    </Row>
                    {ingredients.map((ingredient, index) => (
                        <Row key={index} className="mb-3">
                            <Col md={5}>
                                <Form.Control
                                    as="select"
                                    value={ingredient.name}
                                    onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                                    required
                                >
                                    <option value="">Vyberte ingredienci</option>
                                    {ingredientsAll.map((ingredient) => (
                                        <option key={ingredient.id} value={ingredient.name}>
                                            {ingredient.name}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Col>
                            <Col md={3}>
                                <Form.Control
                                    type="number"
                                    value={ingredient.amount}
                                    min={0}
                                    onChange={(e) => handleIngredientChange(index, 'amount', e.target.value)}
                                    required
                                />
                            </Col>
                            <Col md={2}>
                                <Form.Control
                                    type="text"
                                    value={ingredient.unit}
                                    onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
                                    required
                                />
                            </Col>
                            <Col>
                                <Button variant="danger" onClick={() => handleRemoveIngredient(index)}>
                                    &times;
                                </Button>
                            </Col>
                        </Row>
                    ))}
                    <Button variant="secondary" onClick={handleAddIngredient}>
                        Přidat ingredienci
                    </Button>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Zavřít
                    </Button>
                    <Button variant="primary" type="submit">
                        Vytvořit
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default AddRecipeModal;