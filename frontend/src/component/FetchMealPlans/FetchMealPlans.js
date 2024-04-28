import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MealPlanView = ({ match }) => {
  const [mealPlan, setMealPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMealPlan = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/mealplans`);
        setMealPlan(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching meal plan:', error);
      }
    };

    fetchMealPlan();
  }, [match.params.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Meal Plan Details</h2>
      <h4>{mealPlan.name}</h4>
      <p>Description: {mealPlan.description}</p>
      <p>Recipes:</p>
      <ul>
        {mealPlan.recipes && mealPlan.recipes.map((recipe, index) => (
          <li key={index}>{recipe}</li>
        ))}
      </ul>
      <p>Ingredients:</p>
      <ul>
        {mealPlan.ingredients && mealPlan.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <p>Cooking Instructions:</p>
      <ul>
        {mealPlan.cookingInstructions && mealPlan.cookingInstructions.map((instruction, index) => (
          <li key={index}>{instruction}</li>
        ))}
      </ul>
      <p>Nutritional Information: {mealPlan.nutritionalInformation}</p>
      <p>Dietary Preferences: {mealPlan.dietaryPreferences}</p>
      <img src={mealPlan.imageUrl} alt={mealPlan.name} style={{ maxWidth: '300px' }} />
    </div>
  );
};

export default MealPlanView;
