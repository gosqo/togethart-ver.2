package com.team.togethart.repository.artwork;

import com.team.togethart.dto.artwork.ArtworkAddRequest;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface NewArtworkMapper {

    void newArtwork(ArtworkAddRequest artworkAddRequest);

}
