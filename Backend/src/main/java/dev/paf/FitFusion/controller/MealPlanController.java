package dev.paf.FitFusion.controller;

import dev.paf.FitFusion.model.MealPlan;
import dev.paf.FitFusion.service.MealPlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("api/mealplans")
public class MealPlanController {

    @Autowired
    private MealPlanService mealPlanService;

    @GetMapping
    public List<MealPlan> getAllMealPlans() {
        return mealPlanService.getAllMealPlans();
    }

    @GetMapping("/{id}")
    public ResponseEntity<MealPlan> getMealPlanById(@PathVariable String id) {
        MealPlan mealPlan = mealPlanService.getMealPlanById(id);
        if (mealPlan != null) {
            return new ResponseEntity<>(mealPlan, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<?> createMealPlan(@RequestParam("name") String name,
                                            @RequestParam("description") String description,
                                            @RequestParam("recipes") List<String> recipes,
                                            @RequestParam("ingredients") List<String> ingredients,
                                            @RequestParam("cookingInstructions") List<String> cookingInstructions,
                                            @RequestParam("nutritionalInformation") String nutritionalInformation,
                                            @RequestParam("dietaryPreferences") String dietaryPreferences,
                                            @RequestParam("file") MultipartFile file) {
        try {
            byte[] imageData = file.getBytes();
            MealPlan mealPlan = new MealPlan();
            mealPlan.setImage(imageData); // Set the image data directly
            mealPlan.setName(name);
            mealPlan.setDescription(description);
            mealPlan.setRecipes(recipes);
            mealPlan.setIngredients(ingredients);
            mealPlan.setCookingInstructions(cookingInstructions);
            mealPlan.setNutritionalInformation(nutritionalInformation);
            mealPlan.setDietaryPreferences(dietaryPreferences);
            MealPlan createdMealPlan = mealPlanService.createMealPlan(mealPlan);
            return new ResponseEntity<>(createdMealPlan, HttpStatus.CREATED);
        } catch (IOException e) {
            return new ResponseEntity<>("Failed to create meal plan: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateMealPlan(@PathVariable String id,
                                            @RequestParam(value = "name", required = false) String name,
                                            @RequestParam(value = "description", required = false) String description,
                                            @RequestParam(value = "recipes", required = false) List<String> recipes,
                                            @RequestParam(value = "ingredients", required = false) List<String> ingredients,
                                            @RequestParam(value = "cookingInstructions", required = false) List<String> cookingInstructions,
                                            @RequestParam(value = "nutritionalInformation", required = false) String nutritionalInformation,
                                            @RequestParam(value = "dietaryPreferences", required = false) String dietaryPreferences,
                                            @RequestParam(value = "file", required = false) MultipartFile file) {
        try {
            MealPlan existingMealPlan = mealPlanService.getMealPlanById(id);
            if (existingMealPlan == null) {
                return new ResponseEntity<>("Meal plan not found", HttpStatus.NOT_FOUND);
            }

            // Check if any field is being updated
            boolean isUpdated = false;
            if (file != null && !file.isEmpty()) {
                byte[] imageData = file.getBytes();
                existingMealPlan.setImage(imageData); // Set the image data
                isUpdated = true;
            }
            if (name != null) {
                existingMealPlan.setName(name);
                isUpdated = true;
            }
            if (description != null) {
                existingMealPlan.setDescription(description);
                isUpdated = true;
            }
            if (recipes != null) {
                existingMealPlan.setRecipes(recipes);
                isUpdated = true;
            }
            if (ingredients != null) {
                existingMealPlan.setIngredients(ingredients);
                isUpdated = true;
            }
            if (cookingInstructions != null) {
                existingMealPlan.setCookingInstructions(cookingInstructions);
                isUpdated = true;
            }
            if (nutritionalInformation != null) {
                existingMealPlan.setNutritionalInformation(nutritionalInformation);
                isUpdated = true;
            }
            if (dietaryPreferences != null) {
                existingMealPlan.setDietaryPreferences(dietaryPreferences);
                isUpdated = true;
            }

            if (isUpdated) {
                MealPlan updatedMealPlan = mealPlanService.updateMealPlan(id, existingMealPlan); // Pass both ID and updated meal plan
                return new ResponseEntity<>(updatedMealPlan, HttpStatus.OK);
            } else {
                return new ResponseEntity<>("No fields provided for update", HttpStatus.BAD_REQUEST);
            }
        } catch (IOException e) {
            return new ResponseEntity<>("Failed to update meal plan: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMealPlan(@PathVariable String id) {
        try {
            mealPlanService.deleteMealPlan(id);
            return new ResponseEntity<>("Meal plan deleted successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to delete meal plan: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
