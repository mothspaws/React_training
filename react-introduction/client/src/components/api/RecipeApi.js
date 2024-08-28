const API_BASE_URL = "http://localhost:8000/recipe";

// Fetch recipes
async function getRecipes() {
    try {
        const response = await fetch(`${API_BASE_URL}/list`, {
            method: "GET",
        });
        if (!response.ok) {
            throw new Error("Failed to fetch recipes");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching recipes:", error);
        throw error;
    }
}

// Create recipe
async function createRecipe(recipeData) {
    try {
        const response = await fetch(`${API_BASE_URL}/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(recipeData),
        });
        if (!response.ok) {
            throw new Error("Failed to create recipe");
        }
        return await response.json();
    } catch (error) {
        console.error("Error creating recipe:", error);
        throw error;
    }
}

export { getRecipes, createRecipe };