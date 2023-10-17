package com.team.togethart.service;

import com.team.togethart.dto.artwork.ArtworkAddRequest;
import com.team.togethart.repository.artwork.NewArtworkMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NewArtworkService {
    @Autowired
    private NewArtworkMapper newArtworkMapper;
    @Autowired
    private ArtworkAddRequest artworkAddRequest;

    public void newArtwork(ArtworkAddRequest artworkAddRequest) /*throws IOException*/{

        newArtworkMapper.newArtwork(artworkAddRequest);

    }
}
