import React, { useState } from 'react';
import axios from 'axios';
import './MealPlanForm'

function MealPlanForm() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    recipes: '',
    ingredients: '',
    cookingInstructions: '',
    nutritionalInformation: '',
    dietaryPreferences: '',
    file: null
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataObj = new FormData();
      for (let key in formData) {
        formDataObj.append(key, formData[key]);
      }
      await axios.post('http://localhost:8080/api/mealplans', formDataObj, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Meal plan created successfully!');
      // Reset form data after successful submission
      setFormData({
        name: '',
        description: '',
        recipes: '',
        ingredients: '',
        cookingInstructions: '',
        nutritionalInformation: '',
        dietaryPreferences: '',
        file: null
      });
      setError(null);
    } catch (error) {
      console.error('Error creating meal plan:', error);
      setError('Error creating meal plan. Please try again.');
    }
  };

  return (
    <div>
      <h2>Create Meal Plan</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required />
        </div>
        <div>
          <label>Recipes:</label>
          <textarea name="recipes" value={formData.recipes} onChange={handleChange} required />
        </div>
        <div>
          <label>Ingredients:</label>
          <textarea name="ingredients" value={formData.ingredients} onChange={handleChange} required />
        </div>
        <div>
          <label>Cooking Instructions:</label>
          <textarea name="cookingInstructions" value={formData.cookingInstructions} onChange={handleChange} required />
        </div>
        <div>
          <label>Nutritional Information:</label>
          <textarea name="nutritionalInformation" value={formData.nutritionalInformation} onChange={handleChange} required />
        </div>
        <div>
          <label>Dietary Preferences:</label>
          <input type="text" name="dietaryPreferences" value={formData.dietaryPreferences} onChange={handleChange} required />
        </div>
        <div>
          <label>Image:</label>
          <input type="file" name="file" onChange={handleFileChange} required />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default MealPlanForm;
