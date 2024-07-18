package com.team.togethart.dto.artwork;

import lombok.Data;
import org.springframework.stereotype.Component;

@Data
@Component
public class ArtworkUpdateRequest {

    private Long artworkId;
    private String artworkTitle;
    private String artworkDescription;

}
