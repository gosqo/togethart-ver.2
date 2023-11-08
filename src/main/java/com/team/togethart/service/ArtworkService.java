package com.team.togethart.service;

import com.team.togethart.dto.artwork.ArtworkDeleteRequest;
import com.team.togethart.dto.artwork.ArtworkUpdateRequest;
import com.team.togethart.dto.artwork.ArtworkViewResponse;
import com.team.togethart.repository.artwork.ArtworkMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ArtworkService {

    @Autowired
    private ArtworkMapper artworkMapper;

    @Autowired
    private ArtworkViewResponse artworkViewResponse;

    public ArtworkViewResponse findArtwork(Long artworkId) {

        // 작품 반환 시 마다 조회수 1 증가.
        artworkMapper.updateViewCount(artworkId);

        return artworkMapper.selectArtwork(artworkId);


    }

    public void deleteUploadfile(ArtworkDeleteRequest artworkDeleteRequest){
        artworkMapper.deleteUploadfile(artworkDeleteRequest);
    }
    public void deleteComment(ArtworkDeleteRequest artworkDeleteRequest){
        artworkMapper.deleteComment(artworkDeleteRequest);
    }

    public void deleteLikes(ArtworkDeleteRequest artworkDeleteRequest){
        artworkMapper.deleteLikes(artworkDeleteRequest);
    }

    public  void deleteArtwork(ArtworkDeleteRequest artworkDeleteRequest){
        artworkMapper.deleteArtwork(artworkDeleteRequest);
    }


    public int modifyArtwork(ArtworkUpdateRequest artworkUpdateRequest) {

        int updateCount = artworkMapper.updateArtwork(artworkUpdateRequest);

        return updateCount == 1
                ? 1
                : 0;
    }
}
