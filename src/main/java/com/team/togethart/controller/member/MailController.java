package com.team.togethart.controller.member;

import com.team.togethart.service.MailService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequiredArgsConstructor

public class MailController {
    private final MailService mailService;
    @GetMapping("/mail")
    public String MailPage(){
        return "member/signup";
    }
    @ResponseBody
    @PostMapping("/mail")
    public String MailSend(String mail){
        int number = mailService.sendMail(mail);
        String num = "" + number;
        return num;
    }
}
