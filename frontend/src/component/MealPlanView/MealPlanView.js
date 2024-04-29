import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MealPlanView = ({ mealPlanId }) => {
  const [mealPlan, setMealPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMealPlan = async () => {
      try {
        const res = await axios.get(`/api/mealplans/${mealPlanId}`);
        setMealPlan(res.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching meal plan:', error);
        setLoading(false);
      }
    };

    fetchMealPlan();
  }, [mealPlanId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!mealPlan) {
    return <div>Meal plan not found</div>;
  }

  return (
    <div>
      <h2>{mealPlan.name}</h2>
      <img src={mealPlan.imageUrl} alt={mealPlan.name} style={{ maxWidth: '100%' }} />
      <p>Description: {mealPlan.description}</p>
      {/* Display other meal plan details */}
    </div>
  );
};

export default MealPlanView;
