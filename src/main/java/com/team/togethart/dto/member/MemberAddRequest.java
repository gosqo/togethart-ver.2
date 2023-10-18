package com.team.togethart.dto.member;

import lombok.*;
import org.springframework.stereotype.Component;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import java.util.Date;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Component
@Entity
@Builder

public class MemberAddRequest {
    @Id
    private  int  memberId;

    @NotBlank(message = "이메일은 필수 입력값입니다.")
    @Pattern(regexp = "^[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*\\.[a-zA-Z]{2,3}",
            message = "올바르지 않은 이메일 형식입니다.")
    private  String memberEmail;
    @NotBlank(message = "비밀번호는 필수 입력값입니다.")
    @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$",
            message = "비밀번호 영문자+숫자+특수조합(8~25자리 입력).")
    private  String memberPwd;

    @NotBlank(message = "닉네임은 필수 입력값입니다.")
    @Pattern(regexp = "^[a-zA-Z0-9가-힣]{1,12}$",
            message = "닉네임은 1~12자의 영문 한글 대소문자와 숫자로만 입력.")

    private  String memberUsername;
    private  String memberRegiType;
    private String memberRegiDate;
    private  int memberAuth;

    private String povider;
    private String providerId;
    private Date memberBirth;

}
