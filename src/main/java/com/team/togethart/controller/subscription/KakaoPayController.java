package com.team.togethart.controller.subscription;



import com.team.togethart.dto.kakaoPay.KakaoApproveResponse;
import com.team.togethart.dto.kakaoPay.KakaoCancelResponse;
import com.team.togethart.dto.kakaoPay.KakaoPayRequest;
import com.team.togethart.service.KakaoPayService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequiredArgsConstructor
@RequestMapping("/payment")
public class KakaoPayController {
    private final KakaoPayService kakaoPayService;


    @PostMapping("/ready")
    public ResponseEntity readyToKakaoPay(@RequestParam String memberId, @RequestParam String itemName, @RequestParam int totalAmount ) {
        KakaoPayRequest kakaoPayRequest = new KakaoPayRequest();
        kakaoPayRequest.setItemName(itemName);
        kakaoPayRequest.setMemberId(memberId);
        kakaoPayRequest.setTotalAmount(totalAmount);




        return ResponseEntity.ok(kakaoPayService.kakaoPayReady());
    }

    @GetMapping("/success")
    public ResponseEntity afterPayRequest(@RequestParam("pg_token") String pgToken) {

        KakaoApproveResponse kakaoApprove = kakaoPayService.ApproveResponse(pgToken);

        return ResponseEntity.ok(kakaoPayService.ApproveResponse(pgToken));
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

