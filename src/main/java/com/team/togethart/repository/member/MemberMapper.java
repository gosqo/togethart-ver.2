package com.team.togethart.repository.member;

import com.team.togethart.dto.member.MemberAddRequest;
import com.team.togethart.dto.member.MemberPwUpdateRequest;
import com.team.togethart.dto.member.MemberUpdateRequest;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface MemberMapper {

    static void deleteByUserId(String userEmail) {
    }
    // 로그인
    MemberAddRequest findById(String memberEmail);
    MemberAddRequest findById2(String memberEmail);
    MemberAddRequest findByName(@Param("memberUsername") String memberUsername);
    MemberAddRequest findByeRegiType(String memberRegiType);

    // 연동 확인
    List<MemberAddRequest> getUserList();

    // 회원 가입
    int insert(MemberAddRequest memberAddRequest);

    // 아이디 중복 확인
    MemberAddRequest useById(String memberemail);
    boolean isIdDuplicated(String memberemail);


    // 비밀번호 변경
    void updatePassword(@Param("memberEmail") String email, @Param("memberPwd") String password);

    //비밀번호 찾기
    List<String> findUserIdsByNameAndPwd(@Param("memberEmail") String username);

    //이메일찾기 찾기
    List<String> findUserIdsByNameAndEmail(@Param("memberUsername") String name);


    // 프로필 이미지 불러오기
    MemberUpdateRequest findImage(@Param("memberEmail")String memeberImage);
    
    
    //이메일로 정보 가져오기
    MemberAddRequest getCommonInfoById(String commonId);

    int deleteBooked(int sId, List<String> seatNumList); //추가

    //회원정보 수정
    void modifyCommonWithoutImage(MemberUpdateRequest memberUpdateRequest);
    void commonModify(MemberUpdateRequest memberUpdateRequest);


    MemberAddRequest findByEmail(@Param("memberEmail") String email , @Param("memberUsername") String username);


    //비밀번호 변경
    void modifyPwd(MemberPwUpdateRequest memberPwUpdateRequest);

    //-----------------------------------------------------------------------------------------------//
    
    // 비밀번호 찾아오기
    MemberAddRequest findByPwd (String memberPwd);

    //Email 찾아오기
    MemberAddRequest getMemberByEmail(String memberEmail);

    // 회원탈퇴
    void deleteMemberByEmail(String memberemail);

    // 임시비밀번호 업데이트
    void updateUserPassword(MemberAddRequest memberAddRequest);

}


