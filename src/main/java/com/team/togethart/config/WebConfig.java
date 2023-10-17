package com.team.togethart.config;

import com.team.togethart.config.jwt.JwtInterceptor;
import com.team.togethart.config.jwt.JwtUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    // 로컬 이미지 가져오기 위한 경로 지정 설정.
    private final String uploadImagesPath;

    // application.yml 에 등록한 파일 업로드 위치를 설정.
    public WebConfig(@Value("${file.upload.location}") String uploadImagesPath) {
        this.uploadImagesPath = uploadImagesPath;
    }
    // 여기까지 추가, 아래 addResourceHandlers 에도 추가 사항 존재.

    @Bean
    public JwtInterceptor jwtInterceptor() {
        JwtInterceptor jwtInterceptor = new JwtInterceptor(new JwtUtils());
        return jwtInterceptor;
    }
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(jwtInterceptor())
                .addPathPatterns("/**")

        ;
    }
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/static/**")
                .addResourceLocations("classpath:/static/");

        // 아래 부터 추가 사항.
        registry.addResourceHandler("/imgs/**")
                .addResourceLocations("file:///" + uploadImagesPath + "/")
                .setCachePeriod(3600)
                .resourceChain(true)
                .addResolver(new PathResourceResolver());

    }

}
