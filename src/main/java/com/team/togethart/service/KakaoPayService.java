//package com.team.togethart.service;
//
//import com.team.togethart.dto.kakaoPay.KakaoApproveResponse;
//import com.team.togethart.dto.kakaoPay.KakaoCancelResponse;
//import com.team.togethart.dto.kakaoPay.KakaoReadyResponse;
//import lombok.RequiredArgsConstructor;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.http.HttpEntity;
//import org.springframework.http.HttpHeaders;
//import org.springframework.stereotype.Service;
//import org.springframework.util.LinkedMultiValueMap;
//import org.springframework.util.MultiValueMap;
//import org.springframework.web.client.RestTemplate;
//
//import javax.transaction.Transactional;
//import java.util.UUID;
//
//@Service
//@RequiredArgsConstructor
//@Transactional
//public class KakaoPayService {
//
//    @Value("${admin_Key}")
//    private String adminKey;
//
//    @Value("${cid}")
//    private String cid;
//    private KakaoReadyResponse kakaoReady;
//
//
//
//    public KakaoReadyResponse kakaoPayReady() {
//        String partnerOrderId = UUID.randomUUID().toString();
//
//        // 카카오페이 요청 양식
//        MultiValueMap<String, String> parameters = new LinkedMultiValueMap<>();
//        parameters.add("cid", cid);
//        parameters.add("partner_order_id", partnerOrderId);
//        parameters.add("partner_user_id", "가맹점 회원 ID"); // 동적으로 받아야함
//        parameters.add("item_name", "상품명"); // 동적으로 받아야함
//        parameters.add("quantity", "10000"); // 구독권이니까 그냥 설정해놔도 괜찮을듯 ? . 동적으로 받아야함
//        parameters.add("total_amount", "1000"); // 지금 상황에서는 그냥 제품 가격 . 동적으로 받아야함
//        //parameters.add("vat_amount", "20");
//        parameters.add("tax_free_amount", "0"); // 지금 상황에서는 고정값으로 처리하자
//        parameters.add("approval_url", "http://localhost:8080/payment/success"); // 성공 시 redirect url
//        parameters.add("cancel_url", "http://localhost:8080/payment/cancel"); // 취소 시 redirect url
//        parameters.add("fail_url", "http://localhost:8080/payment/fail"); // 실패 시 redirect url
//
//        // 파라미터, 헤더
//        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(parameters, this.getHeaders());
//
//        // 외부에 보낼 url
//        RestTemplate restTemplate = new RestTemplate();
//
//        kakaoReady = restTemplate.postForObject(
//                "https://kapi.kakao.com/v1/payment/ready",
//                requestEntity,
//                KakaoReadyResponse.class);
//
//        return kakaoReady;
//    }
//
//   // 헤더
//    private HttpHeaders getHeaders() {
//        HttpHeaders httpHeaders = new HttpHeaders();
//
//        String auth = "KakaoAK " + adminKey;
//
//        httpHeaders.set("Authorization", auth);
//        httpHeaders.set("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
//
//        return httpHeaders;
//    }
//
//
//    public KakaoApproveResponse ApproveResponse(String pgToken) {
//
//        // 카카오 요청
//        MultiValueMap<String, String> parameters = new LinkedMultiValueMap<>();
//        parameters.add("cid", cid);
//        parameters.add("tid", kakaoReady.getTid());
//        parameters.add("partner_order_id", "가맹점 주문 번호");
//        parameters.add("partner_user_id", "가맹점 회원 ID");
//        parameters.add("pg_token", pgToken);
//
//
//        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(parameters, this.getHeaders());
//
//
//        RestTemplate restTemplate = new RestTemplate();
//
//        KakaoApproveResponse approveResponse = restTemplate.postForObject(
//                "https://kapi.kakao.com/v1/payment/approve",
//                requestEntity,
//                KakaoApproveResponse.class);
//
//        return approveResponse;
//    }
//
//    public KakaoCancelResponse kakaoCancel() {
//
//        // 카카오페이 요청
//        MultiValueMap<String, String> parameters = new LinkedMultiValueMap<>();
//        parameters.add("cid", cid);
//        parameters.add("tid", "환불할 결제 고유 번호");
//        parameters.add("cancel_amount", "환불 금액");
//        parameters.add("cancel_tax_free_amount", "환불 비과세 금액");
//        parameters.add("cancel_vat_amount", "환불 부가세");
//
//        // 파라미터, 헤더
//        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(parameters, this.getHeaders());
//
//        // 외부에 보낼 url
//        RestTemplate restTemplate = new RestTemplate();
//
//        KakaoCancelResponse cancelResponse = restTemplate.postForObject(
//                "https://kapi.kakao.com/v1/payment/cancel",
//                requestEntity,
//                KakaoCancelResponse.class);
//
//        return cancelResponse;
//    }
//
//
//}
