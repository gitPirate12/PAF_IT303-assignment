package dev.paf.FitFusion.service;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dev.paf.FitFusion.model.PostComment;
import dev.paf.FitFusion.repository.PostCommentRepository;

import java.util.List;
import java.util.Optional;

@Service
public class PostCommentService {

    @Autowired
    private PostCommentRepository postCommentRepository;

    public PostComment createComment(String postId, String userId, String text) {
        PostComment comment = new PostComment(postId, userId, text);
        return postCommentRepository.insert(comment);
    }

    public Optional<PostComment> getSingleComment(String id) {
        ObjectId objectId = new ObjectId(id);
        return postCommentRepository.findById(objectId.toHexString());
    }

    public List<PostComment> getAllComments() {
        return postCommentRepository.findAll();
    }

    public PostComment updateComment(String id, String text) {
        ObjectId objectId = new ObjectId(id);
        Optional<PostComment> optionalComment = postCommentRepository.findById(objectId.toHexString());
        if (optionalComment.isPresent()) {
            PostComment comment = optionalComment.get();
            comment.setText(text);
            return postCommentRepository.save(comment);
        } else {
            // Handle if comment not found
            return null;
        }
    }

    public void deleteAllComments() {
        postCommentRepository.deleteAll();
    }

    public void deleteComment(String id) {
        ObjectId objectId = new ObjectId(id);
        postCommentRepository.deleteById(objectId.toHexString());
    }

    public List<PostComment> getCommentsByPostId(String postId) {
        return postCommentRepository.findByPostId(postId);
    }
    
    
}
