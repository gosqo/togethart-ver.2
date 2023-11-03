package com.team.togethart.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.team.togethart.config.jwt.JwtUtils;
import com.team.togethart.dto.member.*;
import com.team.togethart.repository.member.MemberMapper;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.security.Key;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import static com.team.togethart.config.jwt.JwtUtils.ACCESS_TOKEN_VALIDATION_SECOND;

@Service

public class MemberService implements UserDetailsService {

    @Autowired
    private MemberMapper memberMapper;
    @Autowired
    private MemberAddRequest memberAddRequest;

    @Autowired
    private JwtUtils jwtUtils;
    private static final Key secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    // 회원가입 시 저장시간을 넣어줄 DateTime형
    SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:sss");
    Date time = new Date();
    String localTime = format.format(time);

    // 로그인
    public MemberAddRequest login(String email, String pwd) {

        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        MemberAddRequest GetInfo = memberMapper.findById(email);

        String 불러온정보 = pwd;
        String 가져왔음 = GetInfo.getMemberPwd();
        boolean passMatch = passwordEncoder.matches(pwd, GetInfo.getMemberPwd());
        System.out.println("가져왔음" + " " + 가져왔음);
        System.out.println("불러온정보" + " " + 불러온정보);
        System.out.println("결과값" + " " + passMatch);
        if (GetInfo != null
                && passMatch //가져온정보.getMemberPwd().equals(pwd)
        ) {
            return GetInfo;
        } else {
            return null;
        }
    }
    // 카카오서비스 -------------------------------------------------------------------------------------
    public OAuthToken getAccessToken(String code) {


        RestTemplate rt8 = new RestTemplate();


        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", "adbbf5ce440e188cfcb07e0628098935");
        params.add("redirect_uri", "http://localhost:8080/api/oauth/token");
        params.add("code", code);

        HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest =
                new HttpEntity<>(params, headers);

        ResponseEntity<String> accessTokenResponse = rt8.exchange(
                "https://kauth.kakao.com/oauth/token",
                HttpMethod.POST,
                kakaoTokenRequest,
                String.class
        );

        ObjectMapper objectMapper8 = new ObjectMapper();
        OAuthToken oauthToken = null;
        try {
            oauthToken = objectMapper8.readValue(accessTokenResponse.getBody(), OAuthToken.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return oauthToken;
    }

    public KakaoProfile2 findProfile(String token) {

        RestTemplate rt = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + token);
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");


        HttpEntity<MultiValueMap<String, String>> kakaoProfileRequest =
                new HttpEntity<>(headers);


        // Http 요청 (POST 방식) 후, response 변수에 응답을 받음
        ResponseEntity<String> kakaoProfileResponse = rt.exchange(
                "https://kapi.kakao.com/v2/user/me",
                HttpMethod.POST,
                kakaoProfileRequest,
                String.class
        );

        ObjectMapper objectMapper = new ObjectMapper();
        KakaoProfile2 kakaoProfile2 = null;
        try {
            kakaoProfile2 = objectMapper.readValue(kakaoProfileResponse.getBody(), KakaoProfile2.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        System.out.println("카카오 " + kakaoProfile2.getKakao_account().getEmail());


        return kakaoProfile2;


    }

    public String SaveUserAndGetToken(String token) {

        //(1)
        KakaoProfile2 profile = findProfile(token);

        //(2)
        MemberAddRequest member = memberMapper.findById(profile.getKakao_account().getEmail());
        String kakaopwd = "kakao";
        //(3)
        if (member == null) {
            member = MemberAddRequest.builder()
                    .memberUsername("[kakao]" + profile.getKakao_account().getEmail() + "_" + profile.getId())
                    .memberPwd(kakaopwd)
                    .memberRegiType("K")
                    .memberEmail(profile.getKakao_account().getEmail())
                    .build();

            kakaoregister(member);
        }
        return createToken(member);
    }

    public String createToken(MemberAddRequest member) {
        //토큰 만료 시간 설정(access token)
        Date now = new Date();
        Date expiration = new Date(now.getTime() + ACCESS_TOKEN_VALIDATION_SECOND);
        //accessToken 생성 - 나중에 바로 RETURN값에 넣어주기
        String jwtToken = Jwts.builder()
                .setSubject(member.getMemberUsername())
                .claim("memberId", member.getMemberId())
                .claim("memberEmail", member.getMemberEmail())
                .claim("Username", member.getMemberUsername())
                .setIssuedAt(now) //토큰발행일자
                .setExpiration(expiration)
                .signWith(secretKey)
                .compact();
        System.out.println("JwtUtils accessToken3 : " + jwtToken);
        return jwtToken;
    }

// 카카오서비스 -------------------------------------------------------------------------------------

    // 회원탈퇴 - 비밀번호체크
    public MemberAddRequest checkpwd(String pwd) {

        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

        MemberAddRequest GetInfo = memberMapper.findByPwd(pwd);

        String 불러온정보 = pwd;
        String 가져왔음 = GetInfo.getMemberPwd();

        boolean passMatch = passwordEncoder.matches(pwd, GetInfo.getMemberPwd());

        if (passMatch) {
            return GetInfo;
        } else {
            return null;
        }
    }
    // 회원탈퇴
    public void deleteMemberByEmail(String memberEmail) {
        memberMapper.deleteMemberByEmail(memberEmail);
    }

    //-----------------------------------------------------------------------------------------------//
    //회원정보 수정 <비밀번호 변경>
    public MemberAddRequest getMemberByEmail(String memberEmail) {
        return memberMapper.getMemberByEmail(memberEmail);
    }
    public void modifyPwd(MemberPwUpdateRequest memberPwUpdateRequest) {

        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

        memberPwUpdateRequest.setNewPwd(passwordEncoder.encode(memberPwUpdateRequest.getNewPwd()));

        memberMapper.modifyPwd(memberPwUpdateRequest);
    }

    //------------------------------------------------------------------------------------------//

    // 회원가입
    public boolean register(MemberAddRequest memberAddRequest) {
        // MemberAddRequest 객체 생성 및 정보 설정
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        memberAddRequest.setMemberPwd(passwordEncoder.encode(memberAddRequest.getMemberPwd()));
        memberAddRequest.setMemberRegiType("N"); // N 일반   S 소셜
        memberAddRequest.setMemberRegiDate(localTime);
        memberAddRequest.setMemberAuth(0); // 구독권한 기본값 0
        // MemberAddRequest
        int result = memberMapper.insert(memberAddRequest);
        return result == 1;
    }

    // kakao 회원가입

    public boolean kakaoregister(MemberAddRequest memberAddRequest) {
        // MemberAddRequest 객체 생성 및 정보 설정
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        memberAddRequest.setMemberPwd(passwordEncoder.encode(memberAddRequest.getMemberPwd()));
        memberAddRequest.setMemberRegiType("K"); // N 일반   K 카카오
        memberAddRequest.setMemberRegiDate(localTime);
        memberAddRequest.setMemberAuth(0); // 구독권한 기본값 0
        // MemberAddRequest
        int result = memberMapper.insert(memberAddRequest);
        return result == 1;
    }

    // 회원 찾기
    public MemberAddRequest findMember(String memberusername) {

        MemberAddRequest memberAddRequest = memberMapper.findByName(memberusername);

        if (memberAddRequest != null
        ) {
            return memberAddRequest;
        } else {
            return null;
        }
    }

    // 이메일 찾기
    public List<String> findUserIdsByNameAndEmail(String username) {
        List<String> userIds = new ArrayList<>();
        userIds.addAll(memberMapper.findUserIdsByNameAndEmail(username));
        return userIds;
    }

    // 이미지 찾기
    public MemberUpdateRequest findimage(String memberEmail) {

        memberMapper.findImage(memberEmail);

        return (MemberUpdateRequest) memberMapper.findImage(memberEmail);

    }


    // 비밀번호 찾기
    public List<String> findUserIdsByNameAndPwd(String pwd) {
        List<String> userPwds = new ArrayList<>();


        userPwds.addAll(memberMapper.findUserIdsByNameAndPwd(pwd));

        return userPwds;
    }

    //회원정보 수정
    public void modifyCommonWithoutImage(MemberUpdateRequest memberUpdateRequest) {

        memberMapper.modifyCommonWithoutImage(memberUpdateRequest);

    }

    public void modifyCommon(MemberUpdateRequest memberUpdateRequest, MultipartFile imgFile) throws IOException {
        String uuid = UUID.randomUUID().toString();
        String ext = imgFile.getContentType();
        memberMapper.commonModify(memberUpdateRequest);
    }


    //연동확인
    public List<MemberAddRequest> getUserList() {
        return memberMapper.getUserList();
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return null;
    }

    // 임시 비밀번호 파트 (메일과 유저네임 찾기)
    public boolean userEmailCheck(String memberEamil, String memberUsername) {

        MemberAddRequest memberAddRequest = memberMapper.getMemberByEmail(memberEamil);

        if (memberAddRequest != null && memberAddRequest.getMemberUsername().equals(memberUsername)) {

            return true;

        } else {

            return false;
        }
    }

    public MemberAddRequest getUser(HttpServletRequest request) {

        request.getAttribute("memberEmail");
        MemberAddRequest member = memberMapper.findById(memberAddRequest.getMemberEmail());
        return member;
    }

    public boolean confrimEmail(String memberemail) {

        if (findEmail(memberemail) == null) {
            return true;
        }
        return false;
    }

    private MemberAddRequest findEmail(String memberemail) {

        return memberMapper.findById(memberemail);
    }

    public boolean confrimUsername(String memberUsername) {

        MemberAddRequest memberAddRequest = new MemberAddRequest();

        if (findUsername(memberUsername) == null) {
            return true;
        }
        return false;
    }

    private MemberAddRequest findUsername(String memberUsername) {
        return memberMapper.findByName(memberUsername);
    }
}

