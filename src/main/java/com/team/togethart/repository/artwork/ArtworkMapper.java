package com.team.togethart.repository.artwork;

import com.team.togethart.dto.artwork.ArtworkDeleteRequest;
import com.team.togethart.dto.artwork.ArtworkViewResponse;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ArtworkMapper {

    ArtworkViewResponse selectArtwork(Long artworkId);

    void updateViewCount(Long artworkId);

    void deleteUploadfile(ArtworkDeleteRequest artworkDeleteRequest);
    void deleteComment(ArtworkDeleteRequest artworkDeleteRequest);

    void deleteLikes(ArtworkDeleteRequest artworkDeleteRequest);
    void deleteArtwork(ArtworkDeleteRequest artworkDeleteRequest);

}
