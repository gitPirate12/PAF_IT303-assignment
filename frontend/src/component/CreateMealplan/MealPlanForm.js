import React, { useState } from 'react';
import axios from 'axios';

function MealPlanForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [cookingInstructions, setCookingInstructions] = useState([]);
  const [nutritionalInformation, setNutritionalInformation] = useState('');
  const [dietaryPreferences, setDietaryPreferences] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('recipes', JSON.stringify(recipes));
    formData.append('ingredients', JSON.stringify(ingredients));
    formData.append('cookingInstructions', JSON.stringify(cookingInstructions));
    formData.append('nutritionalInformation', nutritionalInformation);
    formData.append('dietaryPreferences', dietaryPreferences);
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:8080/api/mealplans', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccessMessage('Meal plan created successfully!');
      // Clear form fields after successful submission
      setName('');
      setDescription('');
      setRecipes([]);
      setIngredients([]);
      setCookingInstructions([]);
      setNutritionalInformation('');
      setDietaryPreferences('');
      setFile(null);
      setError(null);
    } catch (error) {
      setError('Failed to create meal plan');
    }
  };

  return (
    <div>
      <h2>Create Meal Plan</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        <br />
        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        <br />
        <label>Recipes:</label>
        <input type="text" value={recipes} onChange={(e) => setRecipes(e.target.value.split(','))} />
        <br />
        <label>Ingredients:</label>
        <input type="text" value={ingredients} onChange={(e) => setIngredients(e.target.value.split(','))} />
        <br />
        <label>Cooking Instructions:</label>
        <input
          type="text"
          value={cookingInstructions}
          onChange={(e) => setCookingInstructions(e.target.value.split(','))}
        />
        <br />
        <label>Nutritional Information:</label>
        <input
          type="text"
          value={nutritionalInformation}
          onChange={(e) => setNutritionalInformation(e.target.value)}
          required
        />
        <br />
        <label>Dietary Preferences:</label>
        <input
          type="text"
          value={dietaryPreferences}
          onChange={(e) => setDietaryPreferences(e.target.value)}
          required
        />
        <br />
        <label>Image:</label>
        <input type="file" onChange={handleFileChange} required />
        <br />
        <button type="submit">Create Meal Plan</button>
      </form>
    </div>
  );
}


export default MealPlanForm;
