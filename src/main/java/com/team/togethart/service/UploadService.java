package com.team.togethart.service;

import com.team.togethart.dto.artwork.UploadDTO;
import com.team.togethart.dto.member.MemberAddRequest;
import com.team.togethart.dto.member.MemberTest;
import com.team.togethart.dto.member.MemberUpdateRequest;
import com.team.togethart.repository.artwork.UploadMapper;
import com.team.togethart.repository.member.MemberMapper;
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
    @Autowired
    private MemberMapper memberMapper;

    @Autowired
    private MemberService memberService;


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

        System.out.println("Image파일 : " + memberTest.getMemberImage());
        System.out.println("test파일 : " + memberTest.getMemberImage().isEmpty());
        //isEmpty() 가 true일경우 이미지가 비어있음
        //isEmpty() 가 false일경우 이미지가 생김

        // 1. 이미지 자기소개 데이터 다 들어왔을 경우
        if (!memberTest.getMemberImage().isEmpty() &&!memberTest.getMemberIntro().equals("")) {

            String originalFilename = memberTest.getMemberImage().getOriginalFilename();
            // 파일업로드하는 파일을 String 으로 반환

            String contentType = originalFilename.substring(originalFilename.lastIndexOf("."));
            // 확장자명 서브스트링

            String filename = UUID.randomUUID().toString() + contentType;
            // 랜덤으로생성해서 DB에 들어갈 파일이름

            String memberImage = "/imgs/" + filename;
            // DB에 memberImage 경로

            MultipartFile multipartFile = memberTest.getMemberImage();

            File saveFile = new File(pathname, filename);

            multipartFile.transferTo(saveFile);

            memberUpdateRequest.setMemberImage(memberImage);
            memberUpdateRequest.setMemberIntro(memberTest.getMemberIntro());
            memberUpdateRequest.setMemberEmail(memberTest.getMemberEmail());

            uploadRepository.upload2(memberUpdateRequest);

            // 2. 이미지만 쓸 경우 자기소개 set X

        } else if (!memberTest.getMemberImage().isEmpty() && memberTest.getMemberIntro().equals("")) {

            String originalFilename = memberTest.getMemberImage().getOriginalFilename();
            // 파일업로드하는 파일을 String 으로 반환

            String contentType = originalFilename.substring(originalFilename.lastIndexOf("."));
            // 확장자명 서브스트링

            String filename = UUID.randomUUID().toString() + contentType;
            // 랜덤으로생성해서 DB에 들어갈 파일이름

            String memberImage = "/imgs/" + filename;
            // DB에 memberImage 경로

            MultipartFile multipartFile = memberTest.getMemberImage();

            File saveFile = new File(pathname, filename);

            multipartFile.transferTo(saveFile);

            memberUpdateRequest.setMemberImage(memberImage);




            memberUpdateRequest.setMemberEmail(memberTest.getMemberEmail());
            uploadRepository.upload3(memberUpdateRequest);

            // 자기소개만 쓸 경우 이미지 set X
        } else if(memberTest.getMemberImage().isEmpty() && !memberTest.getMemberIntro().equals("")) {

            // DB에 저장된 이미지를 가져와서 set 하면 끝

            memberUpdateRequest.setMemberIntro(memberTest.getMemberIntro());
         memberUpdateRequest.setMemberEmail(memberTest.getMemberEmail());
         memberMapper.modifyCommonWithoutImage(memberUpdateRequest);

        }


 /*       String originalFilename = memberTest.getMemberImage().getOriginalFilename();
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
        memberUpdateRequest.setMemberIntro(memberTest.getMemberIntro());
        memberUpdateRequest.setMemberEmail(memberTest.getMemberEmail());

        uploadRepository.upload2(memberUpdateRequest);*/

    }
}
