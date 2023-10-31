package com.team.togethart.config.jwt;

public interface JwtProperties {
    String SECRET = "{asdasasjkldhlasjdklajlsdkajlskdjaslkdjl121231}";
    int EXPIRATION_TIME =  864000000;
    String TOKEN_PREFIX = "Bearer ";
    String HEADER_STRING = "Authorization";
}