package com.team.togethart.dto.member;


import lombok.Data;

@Data
public class GMailDTO {
    private String receiver;
    private String title;
    private String content;
}