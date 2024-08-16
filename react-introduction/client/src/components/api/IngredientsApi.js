const API_BASE_URL = "http://localhost:8000/ingredient";

async function getIngredients() {
  try {
    const response = await fetch(`${API_BASE_URL}/list`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch ingredients");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching ingredients:", error);
    throw error;
  }
}

async function getIngredientById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/get?id=${id}`, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch the ingredient");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching the ingredient:", error);
      throw error;
    }
  }

export { getIngredients, getIngredientById };