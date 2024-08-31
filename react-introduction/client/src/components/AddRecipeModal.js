import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import { createRecipe, updateRecipe } from './api/RecipeApi.js';
import 'react-quill/dist/quill.snow.css';

function AddRecipeModal({ show, handleClose, ingredientsAll, recipe, recipeIngredients }) {
    const isEditMode = !!recipe; // zda je modal v editacnim modu
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [titleError, setTitleError] = useState(''); // pro validaci delky nazvu
    const [descriptionError, setDescriptionError] = useState(''); // pro validaci delky popisu
    const [ingredients, setIngredients] = useState([{ name: '', amount: '', unit: '' }]);
    const [ingredientErrors, setIngredientErrors] = useState({});

    useEffect(() => {
        if (!!recipe) {
            setTitle(recipe.name || '');
            setDescription(recipe.description || '');
            setIngredients(recipeIngredients || [{ name: '', amount: '', unit: '' }]);
        }
    }, [recipe, recipeIngredients]);

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

        if (!validateForm()) {
            return;
        }

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
            if (isEditMode) {
                await updateRecipe(recipe.id, recipeData);
            } else {
                await createRecipe(recipeData);
            }
            resetForm();
            handleClose();
        } catch (error) {
            console.error(`Error ${isEditMode ? "updating" : "creating"} recipe:`, error);
            alert("Nastala neočekávaná chyba při zpracování receptu.");
        }
    };

    const validateForm = () => {
        let valid = true;
        const errors = {};

        if (!title.trim()) {
            setTitleError('Pole "Název" musí být vyplněno.');
            valid = false;
        } else {
            setTitleError('');
        }

        if (description.trim().length === 0) {
            setDescriptionError('Pole "Postup" musí být vyplněno.');
            valid = false;
        } else if (description.length > 500) {
            setDescriptionError('Popis nesmí být delší než 500 znaků.');
            valid = false;
        } else {
            setDescriptionError('');
        }

        ingredients.forEach((ingredient, index) => {
            if (!ingredient.name) {
                errors[index] = { ...errors[index], name: 'Vyběrte si ingredience' };
                valid = false;
            }
            if (!ingredient.amount) {
                errors[index] = { ...errors[index], amount: 'Zadejte počet ingrediencí' };
                valid = false;
            }
            if (!ingredient.unit) {
                errors[index] = { ...errors[index], unit: 'Vyběrte si jednotky' };
                valid = false;
            }
        });

        setIngredientErrors(errors);
        return valid;
    };

    const handleDescriptionChange = (value) => {
        if (value.length <= 500) {
            setDescription(value);
            setDescriptionError('');
        } else {
            setDescriptionError('Popis nesmí být delší než 500 znaků.');
        }
    };

    const resetForm = () => {
        setTitle('');
        setDescription('');
        setIngredients([{ name: '', amount: '', unit: '' }]);
        setDescriptionError('');
        setTitleError('');
        setIngredientErrors({});
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>{isEditMode ? 'Upravit recept' : 'Vytvoření receptu'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Název</Form.Label>
                        <Form.Control
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            isInvalid={!!titleError}
                        />
                        {titleError && (
                            <Form.Control.Feedback type="invalid">
                                {titleError}
                            </Form.Control.Feedback>
                        )}
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Postup</Form.Label>
                        <ReactQuill value={description} onChange={handleDescriptionChange} />
                        {descriptionError && (
                            <small className="text-danger">{descriptionError}</small>
                        )}
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
                                    isInvalid={!!ingredientErrors[index]?.name}
                                >
                                    <option value="">Vyberte ingredienci</option>
                                    {ingredientsAll.map((ingredient) => (
                                        <option key={ingredient.id} value={ingredient.name}>
                                            {ingredient.name}
                                        </option>
                                    ))}
                                </Form.Control>
                                {ingredientErrors[index]?.name && (
                                    <Form.Control.Feedback type="invalid">
                                        {ingredientErrors[index].name}
                                    </Form.Control.Feedback>
                                )}
                            </Col>
                            <Col md={3}>
                                <Form.Control
                                    type="number"
                                    value={ingredient.amount}
                                    min={0}
                                    step={0.01}
                                    max={1000}
                                    onChange={(e) => handleIngredientChange(index, 'amount', e.target.value)}
                                    isInvalid={!!ingredientErrors[index]?.amount}
                                />
                                {ingredientErrors[index]?.amount && (
                                    <Form.Control.Feedback type="invalid">
                                        {ingredientErrors[index].amount}
                                    </Form.Control.Feedback>
                                )}
                            </Col>
                            <Col md={2}>
                                <Form.Control
                                    type="text"
                                    value={ingredient.unit}
                                    maxLength={5}
                                    onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
                                    isInvalid={!!ingredientErrors[index]?.unit}
                                />
                                {ingredientErrors[index]?.unit && (
                                    <Form.Control.Feedback type="invalid">
                                        {ingredientErrors[index].unit}
                                    </Form.Control.Feedback>
                                )}
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
                        {isEditMode ? 'Uložit změny' : 'Vytvořit'}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default AddRecipeModal;