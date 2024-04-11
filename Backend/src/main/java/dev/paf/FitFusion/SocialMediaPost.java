package dev.paf.FitFusion;

import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Document(collection = "socialMediaPosts")
public class SocialMediaPost {
    private String postDescription;
    private List<byte[]> postImages; 
    private List<byte[]> postVideos; 
    private List<PostComment> comments; 
    private List<String> likes;
}
