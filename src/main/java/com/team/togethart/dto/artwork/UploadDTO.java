package com.team.togethart.dto.artwork;

import lombok.Data;
import org.springframework.stereotype.Component;

@Data
@Component
public class UploadDTO {

    private Long artworkId;
    private String pathname;
    private String filename;
    private String originalFilename;
    private int size;
    private String contentType;
    private String resourcePathname;

}






