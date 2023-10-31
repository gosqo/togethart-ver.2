package com.team.togethart.controller.member;


import com.team.togethart.config.jwt.JwtProperties;
import com.team.togethart.config.jwt.JwtUtils;
import com.team.togethart.dto.member.MemberAddRequest;
import com.team.togethart.dto.member.OAuthToken;
import com.team.togethart.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api")
public class KakaoController {
        @Autowired
        private JwtUtils jwtUtils;
        @Autowired
        private MemberService memberService;

        // 프론트에서 인가코드 받아오는 url
        @GetMapping("/oauth/token")

        public ResponseEntity<?> getLogin(@RequestParam("code") String code) {

            // 넘어온 인가 코드를 통해 access_token 발급
            
            OAuthToken oauthToken = memberService.getAccessToken(code);

            //memberService.findProfile(oauthToken);
            System.out.println(oauthToken);

            String jwtToken = memberService.SaveUserAndGetToken(oauthToken.getAccess_token());
              HttpHeaders headers = new HttpHeaders();
                   headers.add(JwtProperties.HEADER_STRING, JwtProperties.TOKEN_PREFIX + jwtToken);

            return ResponseEntity.ok().headers(headers).body(jwtToken);
        }
    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(HttpServletRequest request) {

        MemberAddRequest member = memberService.getUser(request);

        System.out.println(member);

        return ResponseEntity.ok().body(member);
    }

}


