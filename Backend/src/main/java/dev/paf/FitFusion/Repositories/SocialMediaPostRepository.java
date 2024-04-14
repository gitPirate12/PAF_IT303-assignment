package dev.paf.FitFusion.Repositories;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import dev.paf.FitFusion.Models.SocialMediaPost;

@Repository
public interface SocialMediaPostRepository extends MongoRepository<SocialMediaPost, ObjectId>{

}
