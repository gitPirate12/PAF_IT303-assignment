package dev.paf.FitFusion.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import dev.paf.FitFusion.model.User;
import dev.paf.FitFusion.service.UserService;

@RestController
@RequestMapping("api/user")
public class UserController {

    @Autowired
    private UserService userService;


    @GetMapping("/{id}")
    public User getMealPlanById(@PathVariable String id) {
        return userService.getUserDetailsById(id);
    }

    @PostMapping
    public ResponseEntity<?> createMealPlan(@RequestParam("name") String name,
                                            @RequestParam("address") String address,
                                            @RequestParam("phone") List<String> phone,
                                            @RequestParam("password") String password,
                                            @RequestParam("email") String email,
                                            @RequestParam("age") String age,
                                            @RequestParam("file") MultipartFile file) {
        try {
            byte[] imageData = file.getBytes();
            String imageUrl = saveImage(imageData); // Save image and get its URL
            User user = new User();
            user.setImageUrl(imageUrl);
            user.setName(name);
            user.setAddress(address);
            user.setPhone(phone);
            user.setPassword(password);
            user.setEmail(email);
            user.setAge(age);
            User createdAccount = userService.createUserAccount(user);
            return new ResponseEntity<>(createdAccount, HttpStatus.CREATED);
        } catch (IOException e) {
            return new ResponseEntity<>("Failed to create meal plan: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // save image
    private String saveImage(byte[] imageData) {
        try {
            String directoryPath = "/path/to/save/images/"; // Update the path as needed
    
            // Create the directory if it doesn't exist
            File directory = new File(directoryPath);
            if (!directory.exists()) {
                directory.mkdirs();
            }
    
            String fileName = UUID.randomUUID().toString() + ".jpg";// Generate a unique filename for the image

    
            // Define the file path
            String imagePath = directoryPath + fileName;
    
            FileOutputStream image_data_to_the_file = new FileOutputStream(imagePath);
            image_data_to_the_file.write(imageData);
            image_data_to_the_file.close();
    
            return "/images/" + fileName; // actual path
        } catch (IOException e) {
            e.printStackTrace(); 
            return "Error saving image. Please try again."; 
        }
    }


    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable String id,
                                            
                                            @RequestParam(value = "name", required = false) String name,
                                            @RequestParam(value = "address", required = false) String address,
                                            @RequestParam(value = "phone", required = false) List<String> phone,
                                            @RequestParam(value = "password", required = false )String password,
                                            @RequestParam(value = "email", required = false) String email,
                                            @RequestParam(value = "age", required = false) String age,
                                            @RequestParam(value = "file", required = false) MultipartFile file) {
        try {
            User existingUserDetails = userService.getUserDetailsById(id);
            if (existingUserDetails == null) {
                return new ResponseEntity<>("User not found!", HttpStatus.NOT_FOUND);
            }
    
            // Check if any field is being updated
            boolean isUpdated = false;
            if (file != null && !file.isEmpty()) {
                byte[] imageData = file.getBytes();
                String imageUrl = saveImage(imageData); // Save image and get its URL
                existingUserDetails.setImageUrl(imageUrl);
                isUpdated = true;
            }
            if (name != null) {
                existingUserDetails.setName(name);
                isUpdated = true;
            }
            if (address != null) {
                existingUserDetails.setAddress(address);
                isUpdated = true;
            }
            if (phone != null) {
                existingUserDetails.setPhone(phone);;
                isUpdated = true;
            }
            if (password != null) {
                existingUserDetails.setPassword(password);
                isUpdated = true;
            }
            if (email != null) {
                existingUserDetails.setEmail(email);
                isUpdated = true;
            }
            if (age != null) {
                existingUserDetails.setAge(age);
                isUpdated = true;
            }
    
            if (isUpdated) {
                User updateUserDetails = userService.updateUserDetails(id, existingUserDetails); // Pass both ID and updated meal plan
                return new ResponseEntity<>(updateUserDetails, HttpStatus.OK);
            } else {
                return new ResponseEntity<>("No fields provided for update", HttpStatus.BAD_REQUEST);
            }
        } catch (IOException e) {
            return new ResponseEntity<>("Failed to update meal plan: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    
    //Delete Meal PLan
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUserDetails(@PathVariable String id) {
        try {
            userService.deleteUserDetails(id);
            return new ResponseEntity<>("Meal plan deleted successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to delete meal plan: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    
}
