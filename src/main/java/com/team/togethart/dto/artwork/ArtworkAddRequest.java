package com.team.togethart.dto.artwork;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Data
@Component
@AllArgsConstructor
@NoArgsConstructor
// 컨트롤러에 보낼 객체
public class ArtworkAddRequest {

    // 업로드 하는 회원
    private Long memberId;
    private String artworkTitle;
    private String artworkDescription;
    private Integer artworkScope;
    private String memberUsername;
    private List<Long> category;

}
