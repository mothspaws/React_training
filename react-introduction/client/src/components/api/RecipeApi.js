const API_BASE_URL = "http://localhost:8000/recipe";

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

export { getRecipes };