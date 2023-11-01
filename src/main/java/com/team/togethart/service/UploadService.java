package com.team.togethart.service;

import com.team.togethart.dto.artwork.UploadDTO;
import com.team.togethart.dto.member.MemberAddRequest;
import com.team.togethart.dto.member.MemberTest;
import com.team.togethart.dto.member.MemberUpdateRequest;
import com.team.togethart.repository.artwork.UploadMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@Service
public class UploadService {
    @Autowired
    private UploadMapper uploadRepository;
    @Autowired
    private UploadDTO uploadDTO;
    @Value("${file.upload.location}")
    private String pathname;
    @Autowired
    private MemberAddRequest memberAddRequest;

    @Autowired
    private MemberUpdateRequest memberUpdateRequest;


    public void upload(MultipartFile uploadFile) throws IOException {

        String originalFilename = uploadFile.getOriginalFilename();

        int size = (int)uploadFile.getSize();

        String contentType = originalFilename.substring(originalFilename.lastIndexOf("."));

        String filename = UUID.randomUUID().toString()+contentType;

        String dtoPathname = pathname + "/" + filename;

        String resourcePathname = "/imgs/" + filename;

        MultipartFile multipartFile = uploadFile;

        uploadDTO.setPathname(dtoPathname);

        uploadDTO.setOriginalFilename(originalFilename);

        uploadDTO.setSize(size);

        uploadDTO.setContentType(contentType);

        uploadDTO.setFilename(filename);

        uploadDTO.setResourcePathname(resourcePathname);

        uploadDTO.setArtworkId(uploadRepository.selectArtworkId());

        File saveFile = new File(pathname, filename);

        multipartFile.transferTo(saveFile);

        uploadRepository.upload(uploadDTO);
    }



    public void upload2(MemberTest memberTest) throws IOException {

        String originalFilename = memberTest.getMemberImage().getOriginalFilename();
        // 파일업로드하는 파일을 String 으로 반환

        String contentType = originalFilename.substring(originalFilename.lastIndexOf("."));
        // 확장자명 서브스트링

        String filename = UUID.randomUUID().toString()+contentType;
        // 랜덤으로생성해서 DB에 들어갈 파일이름

        String memberImage = "/imgs/" + filename;
        // DB에 memberImage 경로

        MultipartFile multipartFile = memberTest.getMemberImage();

        File saveFile = new File(pathname, filename);

        multipartFile.transferTo(saveFile);

        memberUpdateRequest.setMemberImage(memberImage);
        memberUpdateRequest.setMemberEmail(memberTest.getMemberEmail());

        uploadRepository.upload2(memberUpdateRequest);

    }
}
