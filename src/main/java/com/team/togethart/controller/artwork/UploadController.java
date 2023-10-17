package com.team.togethart.controller.artwork;

import com.team.togethart.dto.artwork.ArtworkAddRequest;
import com.team.togethart.service.ArtworkService;
import com.team.togethart.service.NewArtworkService;
import com.team.togethart.service.UploadService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Controller
@Log4j2
public class UploadController {
    @Autowired
    private UploadService uploadService;
    @Autowired
    private ArtworkService artworkService;

    @Autowired
    private NewArtworkService newArtworkService;

    @Value("${file.upload.location}")
    private String pathname;
    @GetMapping("/uploadForm")
    public void uploadForm(){
        log.info("uploadform");
    }
    @PostMapping("/uploadFile")
    public ResponseEntity<?> uploadPost(
            @RequestPart(value = "file", required = true) MultipartFile uploadFile) throws IOException{

        uploadService.upload(uploadFile); // upload_file 테이블 인서트.

        return ResponseEntity.ok("ok");
    }

    @PostMapping("/newArtwork")
    public ResponseEntity<?> uploadFormData(
            @RequestBody ArtworkAddRequest artworkAddRequest) /*throws IOException*/{

        newArtworkService.newArtwork(artworkAddRequest);

        return ResponseEntity.ok("ok");
    }

}
