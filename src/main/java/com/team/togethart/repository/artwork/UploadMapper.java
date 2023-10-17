package com.team.togethart.repository.artwork;

import com.team.togethart.dto.artwork.UploadDTO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UploadMapper {

    void upload(UploadDTO uploadDTO);

    Long selectArtworkId();

}
