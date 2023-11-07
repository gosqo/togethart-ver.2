package com.team.togethart.repository.artwork;

import com.team.togethart.dto.artwork.UploadDTO;
import com.team.togethart.dto.member.MemberUpdateRequest;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UploadMapper {

    void upload(UploadDTO uploadDTO);

    Long selectArtworkId();

    void upload2(MemberUpdateRequest memberUpdateRequest);

    void upload3(MemberUpdateRequest memberUpdateRequest);

}
