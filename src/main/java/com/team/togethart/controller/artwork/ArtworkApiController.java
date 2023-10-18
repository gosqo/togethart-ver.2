package com.team.togethart.controller.artwork;

import com.team.togethart.dto.artwork.ArtworkDeleteRequest;
import com.team.togethart.service.ArtworkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
public class ArtworkApiController {

    @Autowired
    private ArtworkService artworkService;

    @GetMapping("api/artwork/{artworkId}")
    public ResponseEntity<Object> artworkDetail(
            @PathVariable("artworkId") Long artworkId) {


        return ResponseEntity.status(200).body(artworkService.findArtwork(artworkId));
    }

    @PostMapping("/deleteArtwork")
    public ResponseEntity<Map<String, String>> artworkDel(@RequestBody ArtworkDeleteRequest artworkDeleteRequest){

        Map<String, String> response = new HashMap<>();
        try {
            artworkService.deleteUploadfile(artworkDeleteRequest);
            artworkService.deleteComment(artworkDeleteRequest);
            artworkService.deleteLikes(artworkDeleteRequest);
            artworkService.deleteArtwork(artworkDeleteRequest);
            response.put("message", "파일이 삭제됐습니다.");
        } catch (Exception e) {

            response.put("message", "작품 삭제 중 오류가 발생했습니다.");
        }

        return ResponseEntity.ok(response);

    }





}
