package dev.paf.FitFusion.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dev.paf.FitFusion.model.User;
import dev.paf.FitFusion.repository.UserRepo;



@Service
public class UserService {
    @Autowired
    private UserRepo UserDetailsRepo;

    // public List<User> getAllUserDetails(String id) {
    //     return UserDetailsRepo.findById(id);
    // }

    public User getUserDetailsById(String id) {
        return UserDetailsRepo.findById(id).orElse(null);
    }

    public User createUserAccount( User createAccount) {
        return UserDetailsRepo.save(createAccount);
    }



    public User updateUserDetails(String id, User userDetails) {
        userDetails.setId(id);
        return UserDetailsRepo.save(userDetails);
    }
    

    public void deleteUserDetails(String id) {
        UserDetailsRepo.deleteById(id);
    }

    
}
