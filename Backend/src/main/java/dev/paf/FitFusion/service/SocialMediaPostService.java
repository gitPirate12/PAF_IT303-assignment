package dev.paf.FitFusion.service;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import dev.paf.FitFusion.model.PostComment;
import dev.paf.FitFusion.model.SocialMediaPost;
import dev.paf.FitFusion.repository.SocialMediaPostRepository;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class SocialMediaPostService {

    @Autowired
    private SocialMediaPostRepository socialMediaPostRepository;

    @Autowired
    private PostCommentService postCommentService;

    public List<SocialMediaPost> allPosts() {
        return socialMediaPostRepository.findAll();
    }

    public Optional<SocialMediaPost> getSinglePost(ObjectId id) {
        return socialMediaPostRepository.findById(id);
    }

    public SocialMediaPost createPost(String postDescription, List<MultipartFile> postImages,
                                      List<MultipartFile> postVideos, List<String> commentIds,
                                      List<String> likes) {
        SocialMediaPost post = new SocialMediaPost();
        post.setPostDescription(postDescription);

        // Convert MultipartFiles to byte arrays if necessary
        List<byte[]> imageBytes = new ArrayList<>();
        for (MultipartFile image : postImages) {
            try {
                imageBytes.add(image.getBytes());
            } catch (IOException e) {
                // Handle exception
                System.err.println("Error reading image file: " + e.getMessage());
                // You can throw a custom exception or log the error as needed
            }
        }
        post.setPostImages(imageBytes);

        List<byte[]> videoBytes = new ArrayList<>();
        for (MultipartFile video : postVideos) {
            try {
                videoBytes.add(video.getBytes());
            } catch (IOException e) {
                // Handle exception
                System.err.println("Error reading video file: " + e.getMessage());
                // You can throw a custom exception or log the error as needed
            }
        }
        post.setPostVideos(videoBytes);

        // Retrieve comments based on their IDs
        List<PostComment> comments = new ArrayList<>();
        for (String commentId : commentIds) {
            ObjectId objectId = new ObjectId(commentId);
            Optional<PostComment> comment = postCommentService.getSingleComment(objectId);
            comment.ifPresent(comments::add);
        }

        post.setComments(comments);
        post.setLikes(likes);
        return socialMediaPostRepository.insert(post);
    }

    public SocialMediaPost updatePost(ObjectId id, String postDescription, List<byte[]> postImages,
                                      List<byte[]> postVideos, List<String> commentIds,
                                      List<String> likes) {
        Optional<SocialMediaPost> optionalPost = socialMediaPostRepository.findById(id);
        if (optionalPost.isPresent()) {
            SocialMediaPost post = optionalPost.get();
            post.setPostDescription(postDescription);

            // Convert MultipartFiles to byte arrays if necessary
            if (postImages != null && !postImages.isEmpty()) {
                post.setPostImages(postImages);
            }

            if (postVideos != null && !postVideos.isEmpty()) {
                post.setPostVideos(postVideos);
            }

            // Retrieve comments based on their IDs
            List<PostComment> comments = new ArrayList<>();
            for (String commentId : commentIds) {
                ObjectId objectId = new ObjectId(commentId);
                Optional<PostComment> comment = postCommentService.getSingleComment(objectId);
                comment.ifPresent(comments::add);
            }

            post.setComments(comments);
            post.setLikes(likes);
            return socialMediaPostRepository.save(post);
        } else {
            // Handle if post not found
            return null;
        }
    }


    public void deleteAllPosts() {
        socialMediaPostRepository.deleteAll();
    }

    public void deletePost(ObjectId id) {
        socialMediaPostRepository.deleteById(id);
    }
}
