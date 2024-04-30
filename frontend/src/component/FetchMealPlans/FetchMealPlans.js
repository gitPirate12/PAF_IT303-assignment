import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FetchMealPlans.css'; // Import CSS file

function MealPlanList() {
  const [mealPlans, setMealPlans] = useState([]);

  useEffect(() => {
    const fetchMealPlans = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/mealplans');
        setMealPlans(response.data);
      } catch (error) {
        console.error('Error fetching meal plans:', error);
      }
    };
    fetchMealPlans();
  }, []);

  return (
    <div className="mealPlansContainer">
      <h1>Meal Plans</h1>
      {mealPlans.map((mealPlan) => (
        <div key={mealPlan.id} className="mealPlanBox">
          <h2>{mealPlan.name}</h2>
          <p>Description: {mealPlan.description}</p>
          <p>Recipes: {mealPlan.recipes.join(', ')}</p>
          <p>Ingredients: {mealPlan.ingredients.join(', ')}</p>
          <p>Cooking Instructions: {mealPlan.cookingInstructions.join(', ')}</p>
          <p>Nutritional Information: {mealPlan.nutritionalInformation}</p>
          <p>Dietary Preferences: {mealPlan.dietaryPreferences}</p>
          <img src={`data:image/jpeg;base64,${mealPlan.image}`} alt={mealPlan.name} />
        </div>
      ))}
    </div>
  );
}

export default MealPlanList;
