package dev.paf.FitFusion.repository;
 
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
 
import dev.paf.FitFusion.model.PostComment;
 
@Repository
public interface PostCommentRepository  extends MongoRepository<PostComment, String>{
    List<PostComment> findByPostId(String postId);

}