package dev.paf.FitFusion.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "MealPlan")
public class MealPlan {

    @Id
    private String id;


    private String name;
    private String description;
    private List<String> recipes;
    private List<String> ingredients;
    private List<String> cookingInstructions;
    private String nutritionalInformation;
    private String dietaryPreferences;
    private String imageUrl; 
    





    
}
