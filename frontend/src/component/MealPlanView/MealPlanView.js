import React from 'react';

const MealPlanView = ({ plan }) => {
  return (
    <div>
      <h4>{plan.name}</h4>
      <p>Description: {plan.description}</p>
      <p>Recipes:</p>
      <ul>
        {plan.recipes.map((recipe, index) => (
          <li key={index}>{recipe}</li>
        ))}
      </ul>
      <p>Ingredients:</p>
      <ul>
        {plan.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <p>Cooking Instructions:</p>
      <ul>
        {plan.cookingInstructions.map((instruction, index) => (
          <li key={index}>{instruction}</li>
        ))}
      </ul>
      <p>Nutritional Information: {plan.nutritionalInformation}</p>
      <p>Dietary Preferences: {plan.dietaryPreferences}</p>
      <img src={plan.imageUrl} alt={plan.name} style={{ maxWidth: '300px' }} />
    </div>
  );
};

export default MealPlanView;
