package dev.paf.FitFusion.controller;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import dev.paf.FitFusion.model.PostComment;
import dev.paf.FitFusion.service.PostCommentService;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/postComment")
public class PostCommentController {

    @Autowired
    private PostCommentService postCommentService;

    @GetMapping("/{postId}")
    public ResponseEntity<List<PostComment>> getCommentsByPostId(@PathVariable String postId) {
        try {
            List<PostComment> comments = postCommentService.getCommentsByPostId(postId);
            return ResponseEntity.ok(comments);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<PostComment>> getAllComments() {
        List<PostComment> comments = postCommentService.getAllComments();
        return ResponseEntity.ok().body(comments);
    }

    @PostMapping("/{postId}")
    public ResponseEntity<PostComment> createComment(@PathVariable String postId, @RequestBody Map<String, String> payload) {
        String userId = payload.get("userId");
        String text = payload.get("text");

        // Create the comment
        PostComment comment = postCommentService.createComment(postId, userId, text);
        return ResponseEntity.status(HttpStatus.CREATED).body(comment);
    }

    @PutMapping("/{commentId}")
    public ResponseEntity<PostComment> updateComment(@PathVariable String commentId, @RequestBody Map<String, String> payload) {
        String text = payload.get("text");
        PostComment updatedComment = postCommentService.updateComment(commentId, text);
        if (updatedComment != null) {
            return ResponseEntity.ok().body(updatedComment);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<Void> deleteComment(@PathVariable String commentId) {
        postCommentService.deleteComment(commentId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/all")
    public ResponseEntity<Void> deleteAllComments() {
        postCommentService.deleteAllComments();
        return ResponseEntity.noContent().build();
    }
}
