package dev.paf.FitFusion.repository;


import org.springframework.data.mongodb.repository.MongoRepository;

import dev.paf.FitFusion.model.User;



public interface UserRepo extends MongoRepository<User,String> {


    
}
