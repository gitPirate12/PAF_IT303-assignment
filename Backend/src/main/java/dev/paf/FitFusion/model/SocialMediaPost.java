package dev.paf.FitFusion.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Document(collection = "socialMediaPosts")
public class SocialMediaPost {

    @Id
    private String id; // Change the type of id to String

    private String postDescription;
    private List<byte[]> postImages;
    private List<byte[]> postVideos;
    private int likeCount; // Represents the total count of likes for this post

    public SocialMediaPost(String postDescription, List<byte[]> postImages, List<byte[]> postVideos,
                           int likeCount) {
        this.postDescription = postDescription;
        this.postImages = postImages;
        this.postVideos = postVideos;
        this.likeCount = likeCount;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPostDescription() {
        return postDescription;
    }

    public void setPostDescription(String postDescription) {
        this.postDescription = postDescription;
    }

    public List<byte[]> getPostImages() {
        return postImages;
    }

    public void setPostImages(List<byte[]> postImages) {
        this.postImages = postImages;
    }

    public List<byte[]> getPostVideos() {
        return postVideos;
    }

    public void setPostVideos(List<byte[]> postVideos) {
        this.postVideos = postVideos;
    }

    public int getLikeCount() {
        return likeCount;
    }

    public void setLikeCount(int likeCount) {
        this.likeCount = likeCount;
    }
}
