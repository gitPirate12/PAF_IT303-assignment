import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MealPlanView() {
  const [mealPlans, setMealPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMealPlans() {
      try {
        const response = await axios.get('http://localhost:8080/api/mealplans');
        setMealPlans(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch meal plans');
        setLoading(false);
      }
    }

    fetchMealPlans();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>All Meal Plans</h2>
      {mealPlans.map((mealPlan) => (
        <div key={mealPlan.id}>
          <h3>{mealPlan.name}</h3>
          <p>Description: {mealPlan.description}</p>
          <p>Recipes: {mealPlan.recipes.join(', ')}</p>
          <p>Ingredients: {mealPlan.ingredients.join(', ')}</p>
          <p>Cooking Instructions: {mealPlan.cookingInstructions.join(', ')}</p>
          <p>Nutritional Information: {mealPlan.nutritionalInformation}</p>
          <p>Dietary Preferences: {mealPlan.dietaryPreferences}</p>
          {mealPlan.imageUrl && <img src={`http://localhost:8080${mealPlan.imageUrl}`} alt={mealPlan.name} style={{ maxWidth: '200px' }} />}
        </div>
      ))}
    </div>
  );
}

export default MealPlanView;
