package com.team.togethart.dto.artwork;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Data
@Component
@AllArgsConstructor
@NoArgsConstructor
public class ArtworkDeleteRequest {

    Long artworkId;
}
