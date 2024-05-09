import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './UpdateMealPlan.css';
import Swal from 'sweetalert2';


function UpdateMealPlan() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mealPlan, setMealPlan] = useState({
    name: '',
    description: '',
    recipes: [''],
    ingredients: [''],
    cookingInstructions: [''],
    nutritionalInformation: [], // Changed to an array
    dietaryPreferences: '',
    image: null
  });
  
  useEffect(() => {
    const fetchMealPlan = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/mealplans/${id}`);
        setMealPlan(response.data);
      } catch (error) {
        console.error('Error fetching meal plan:', error);
      }
    };
    fetchMealPlan();
  }, [id]);

  const handleChange = (e, index, type) => {
    const value = e.target.value;
    if (type === 'recipes') {
      const updatedRecipes = [...mealPlan.recipes];
      updatedRecipes[index] = value;
      setMealPlan({ ...mealPlan, recipes: updatedRecipes });
    } else if (type === 'ingredients') {
      const updatedIngredients = [...mealPlan.ingredients];
      updatedIngredients[index] = value;
      setMealPlan({ ...mealPlan, ingredients: updatedIngredients });
    } else if (type === 'cookingInstructions') {
      const updatedInstructions = [...mealPlan.cookingInstructions];
      updatedInstructions[index] = value;
      setMealPlan({ ...mealPlan, cookingInstructions: updatedInstructions });
    } else if (type === 'nutritionalInformation') {
      const updatedNutritionalInformation = [...mealPlan.nutritionalInformation];
      updatedNutritionalInformation[index] = value;
      setMealPlan({ ...mealPlan, nutritionalInformation: updatedNutritionalInformation });
    } else {
      setMealPlan({ ...mealPlan, [e.target.name]: value });
    }
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setMealPlan({ ...mealPlan, image: file });
  };

  const handleAddField = (type) => {
    if (type === 'recipes') {
      setMealPlan({ ...mealPlan, recipes: [...mealPlan.recipes, ''] });
    } else if (type === 'ingredients') {
      setMealPlan({ ...mealPlan, ingredients: [...mealPlan.ingredients, ''] });
    } else if (type === 'cookingInstructions') {
      setMealPlan({ ...mealPlan, cookingInstructions: [...mealPlan.cookingInstructions, ''] });
    } else if (type === 'nutritionalInformation') {
      setMealPlan({ ...mealPlan, nutritionalInformation: [...mealPlan.nutritionalInformation, ''] });
    }
  };

  const handleRemoveField = (index, type) => {
    if (type === 'recipes') {
      const updatedRecipes = [...mealPlan.recipes];
      updatedRecipes.splice(index, 1);
      setMealPlan({ ...mealPlan, recipes: updatedRecipes });
    } else if (type === 'ingredients') {
      const updatedIngredients = [...mealPlan.ingredients];
      updatedIngredients.splice(index, 1);
      setMealPlan({ ...mealPlan, ingredients: updatedIngredients });
    } else if (type === 'cookingInstructions') {
      const updatedInstructions = [...mealPlan.cookingInstructions];
      updatedInstructions.splice(index, 1);
      setMealPlan({ ...mealPlan, cookingInstructions: updatedInstructions });
    } else if (type === 'nutritionalInformation') {
      const updatedNutritionalInformation = [...mealPlan.nutritionalInformation];
      updatedNutritionalInformation.splice(index, 1);
      setMealPlan({ ...mealPlan, nutritionalInformation: updatedNutritionalInformation });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', mealPlan.name);
      formData.append('description', mealPlan.description);
      formData.append('recipes', JSON.stringify(mealPlan.recipes));
      formData.append('ingredients', JSON.stringify(mealPlan.ingredients));
      formData.append('cookingInstructions', JSON.stringify(mealPlan.cookingInstructions));
      formData.append('nutritionalInformation', JSON.stringify(mealPlan.nutritionalInformation));
      formData.append('dietaryPreferences', mealPlan.dietaryPreferences);
  
      if (mealPlan.image) {
        formData.append('file', mealPlan.image);
      }
  
      await axios.put(`http://localhost:8080/api/mealplans/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      const result = await Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`
      });
  
      if (result.isConfirmed) {
        navigate('/viewmealplan');
        window.location.reload('/viewmealplan'); // Reload the page after navigation
      } else if (result.isDenied || result.dismiss === Swal.DismissReason.cancel) {
        // Do nothing or handle accordingly
      }
    } catch (error) {
      console.error('Error updating meal plan:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to update meal plan. Please try again.',
        confirmButtonColor: '#dc3545'
      });
    }
  };
  

  return (
    <div className="container">
      <h2>Update Meal Plan</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={mealPlan.name} onChange={(e) => handleChange(e)} />

        <label>Dietary Preferences:</label>
<div className="radioGroup">
  <label>
    <input
      type="radio"
      value="Anything"
      checked={mealPlan.dietaryPreferences === 'Anything'}
      onChange={(e) => handleChange(e)}
      name="dietaryPreferences"
    />
    Anything
  </label>
  <label>
    <input
      type="radio"
      value="Paleo"
      checked={mealPlan.dietaryPreferences === 'Paleo'}
      onChange={(e) => handleChange(e)}
      name="dietaryPreferences"
    />
    Paleo
  </label>
  <label>
    <input
      type="radio"
      value="Vegetarian"
      checked={mealPlan.dietaryPreferences === 'Vegetarian'}
      onChange={(e) => handleChange(e)}
      name="dietaryPreferences"
    />
    Vegetarian
  </label>
  <label>
    <input
      type="radio"
      value="Ketogenic"
      checked={mealPlan.dietaryPreferences === 'Ketogenic'}
      onChange={(e) => handleChange(e)}
      name="dietaryPreferences"
    />
    Ketogenic
  </label>
  <label>
    <input
      type="radio"
      value="Mediterranean"
      checked={mealPlan.dietaryPreferences === 'Mediterranean'}
      onChange={(e) => handleChange(e)}
      name="dietaryPreferences"
    />
    Mediterranean
  </label>
</div>


        <label>Description:</label>
        <textarea name="description" value={mealPlan.description} onChange={(e) => handleChange(e)}></textarea>
        <label>Recipes:</label>
        {mealPlan.recipes.map((recipe, index) => (
          <div key={index} className="add-remove-container">
            <input type="text" value={recipe} onChange={(e) => handleChange(e, index, 'recipes')} />
            {index === mealPlan.recipes.length - 1 && (
              <button type="button" onClick={() => handleAddField('recipes')} className="addButton">+</button>
            )}
            {index !== 0 && (
              <button type="button" onClick={() => handleRemoveField(index, 'recipes')} className="removeButton">-</button>
            )}
          </div>
        ))}
        <label>Ingredients:</label>
        {mealPlan.ingredients.map((ingredient, index) => (
          <div key={index} className="add-remove-container">
            <input type="text" value={ingredient} onChange={(e) => handleChange(e, index, 'ingredients')} />
            {index === mealPlan.ingredients.length - 1 && (
              <button type="button" onClick={() => handleAddField('ingredients')} className="addButton">+</button>
            )}
            {index !== 0 && (
              <button type="button" onClick={() => handleRemoveField(index, 'ingredients')} className="removeButton">-</button>
            )}
          </div>
        ))}
        <label>Cooking Instructions:</label>
        {mealPlan.cookingInstructions.map((instruction, index) => (
          <div key={index} className="add-remove-container">
            <textarea value={instruction} onChange={(e) => handleChange(e, index, 'cookingInstructions')}></textarea>
            {index === mealPlan.cookingInstructions.length - 1 && (
              <button type="button" onClick={() => handleAddField('cookingInstructions')} className="addButton">+</button>
            )}
            {index !== 0 && (
              <button type="button" onClick={() => handleRemoveField(index, 'cookingInstructions')} className="removeButton">-</button>
            )}
          </div>
        ))}
        <label>Nutritional Information:</label>
        {mealPlan.nutritionalInformation.map((info, index) => (
          <div key={index} className="add-remove-container">
            <input type="text" value={info} onChange={(e) => handleChange(e, index, 'nutritionalInformation')} />
            {index === mealPlan.nutritionalInformation.length - 1 && (
              <button type="button" onClick={() => handleAddField('nutritionalInformation')} className="addButton">+</button>
            )}
            {index !== 0 && (
              <button type="button" onClick={() => handleRemoveField(index, 'nutritionalInformation')} className="removeButton">-</button>
            )}
          </div>
        ))}
        {/* <label>Dietary Preferences:</label>
        <input type="text" name="dietaryPreferences" value={mealPlan.dietaryPreferences} onChange={(e) => handleChange(e)} /> */}
        <label>Image:</label>
        <input type="file" name="image" onChange={handleImageChange} />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default UpdateMealPlan;
