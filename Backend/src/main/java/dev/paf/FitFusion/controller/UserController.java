package dev.paf.FitFusion.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import dev.paf.FitFusion.model.User;
import dev.paf.FitFusion.service.UserService;

@RestController
@RequestMapping("api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserDetailsById(@PathVariable String id) {
        User user = userService.getUserDetailsById(id);
        return ResponseEntity.ok().body(user);
    }


    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok().body(users);
    }

    @PostMapping
    public ResponseEntity<User> createUser(@RequestParam("name") String name,
                                            @RequestParam("address") String address,
                                            @RequestParam("phone") List<String> phone,
                                            @RequestParam("password") String password,
                                            @RequestParam("email") String email,
                                            @RequestParam("age") String age,
                                            @RequestParam("file") MultipartFile file) {
        try {
            String imageUrl = saveImage(file.getBytes());
            User user = new User();
            user.setImageUrl(imageUrl);
            user.setName(name);
            user.setAddress(address);
            user.setPhone(phone);
            user.setPassword(password);
            user.setEmail(email);
            user.setAge(age);
            User createdUser = userService.createUserAccount(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    // save image method

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable String id,
                                            @RequestBody User userDetails) {
        User updatedUser = userService.updateUserDetails(id, userDetails);
        return ResponseEntity.ok().body(updatedUser);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable String id) {
        userService.deleteUserDetails(id);
        return ResponseEntity.ok().build();
    }

    private String saveImage(byte[] imageData) throws IOException {
        String directoryPath = "/path/to/save/images/";
        File directory = new File(directoryPath);
        if (!directory.exists()) {
            directory.mkdirs();
        }
        String fileName = UUID.randomUUID().toString() + ".jpg";
        String imagePath = directoryPath + fileName;
        try (FileOutputStream imageOutputStream = new FileOutputStream(imagePath)) {
            imageOutputStream.write(imageData);
        }
        return "/images/" + fileName;
    }
}
