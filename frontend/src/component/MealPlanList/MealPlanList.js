import React from 'react';
import MealPlanView from '../MealPlanView/MealPlanView';

const MealPlanList = ({ mealPlans }) => {
  return (
    <div>
      <h2>Meal Plans</h2>
      {mealPlans.map((plan) => (
        <MealPlanView key={plan.id} plan={plan} />
      ))}
    </div>
  );
};

export default MealPlanList;