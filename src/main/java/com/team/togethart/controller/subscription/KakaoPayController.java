package com.team.togethart.controller.subscription;



import com.team.togethart.dto.kakaoPay.KakaoApproveResponse;
import com.team.togethart.dto.kakaoPay.KakaoCancelResponse;
import com.team.togethart.dto.kakaoPay.KakaoPayRequest;
import com.team.togethart.service.KakaoPayService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.UUID;


@RestController
@RequiredArgsConstructor
@RequestMapping("/payment")
public class KakaoPayController {
    private final KakaoPayService kakaoPayService;

    @PostMapping("/ready")
    public ResponseEntity readyToKakaoPay(@RequestParam String memberId, @RequestParam String itemName, @RequestParam int totalAmount, HttpSession httpSession) {
        KakaoPayRequest kakaoPayRequest = new KakaoPayRequest();
        kakaoPayRequest.setItemName(itemName);
        kakaoPayRequest.setMemberId(memberId);
        kakaoPayRequest.setTotalAmount(totalAmount);
        String partnerOrderId = UUID.randomUUID().toString();
        kakaoPayRequest.setPartnerOrderId(partnerOrderId);

        httpSession.setAttribute("partner_order_id", kakaoPayRequest.getPartnerOrderId());
        httpSession.setAttribute("partner_user_id", kakaoPayRequest.getMemberId());


        return ResponseEntity.ok(kakaoPayService.kakaoPayReady(kakaoPayRequest));
    }

    @PostMapping("/success")
    public ResponseEntity afterPayRequest(@RequestParam("pg_token") String pgToken, HttpSession httpSession) {
        String partnerOrderId = (String) httpSession.getAttribute("partner_order_id");
        String partnerUserId = (String) httpSession.getAttribute("partner_user_id");

        KakaoApproveResponse kakaoApprove = kakaoPayService.ApproveResponse(partnerOrderId, partnerUserId, pgToken);

        return ResponseEntity.ok(kakaoApprove);
    }

    @PostMapping("/refund")
    public ResponseEntity refund() {

        KakaoCancelResponse kakaoCancelResponse = kakaoPayService.kakaoCancel();

        return new ResponseEntity<>(kakaoCancelResponse, HttpStatus.OK);
    }
//
//    /**
//     * 결제 진행 중 취소
//     */
//    @GetMapping("/cancel")
//    public void cancel() {
//
//    }
//
//    /**
//     * 결제 실패
//     */
//    @GetMapping("/fail")
//    public void fail() {
//
//    }

}

