package com.team.togethart.dto.member;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class MemberTest {
    private MultipartFile memberImage;
    private String memberEmail;
    private String memberIntro;

}
