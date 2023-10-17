package com.team.togethart.service;

import com.team.togethart.dto.artwork.UploadDTO;
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
}
