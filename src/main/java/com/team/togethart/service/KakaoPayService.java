package com.team.togethart.service;

import com.team.togethart.dto.kakaoPay.KakaoApproveResponse;
import com.team.togethart.dto.kakaoPay.KakaoCancelResponse;
import com.team.togethart.dto.kakaoPay.KakaoPayRequest;
import com.team.togethart.dto.kakaoPay.KakaoReadyResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class KakaoPayService {

    @Value("${admin_Key}")
    private String adminKey;

    @Value("${cid}")
    private String cid;
    private KakaoReadyResponse kakaoReady;



    public KakaoReadyResponse kakaoPayReady(KakaoPayRequest kakaoPayRequest, HttpSession httpSession) {


        // 카카오페이 요청 양식
        MultiValueMap<String, String> parameters = new LinkedMultiValueMap<>();
        parameters.add("cid", cid);
        parameters.add("partner_order_id", String.valueOf(kakaoPayRequest.getPartnerOrderId()));
        parameters.add("partner_user_id", String.valueOf(kakaoPayRequest.getMemberId()));
        parameters.add("item_name", String.valueOf(kakaoPayRequest.getItemName()));
        parameters.add("quantity", "10000"); // 구독권이니까 그냥 설정해놔도 괜찮을듯 ? 
        parameters.add("total_amount", String.valueOf(kakaoPayRequest.getTotalAmount()));
        //parameters.add("vat_amount", "20");
        parameters.add("tax_free_amount", "0");
        parameters.add("approval_url", "http://localhost:8070/payment/success"); // 성공 시 redirect url
        parameters.add("cancel_url", "http://localhost:8070/payment/cancel"); // 취소 시 redirect url
        parameters.add("fail_url", "http://localhost:8070/payment/fail"); // 실패 시 redirect url

        httpSession.setAttribute("partnerOrderId", String.valueOf(kakaoPayRequest.getPartnerOrderId()));
        httpSession.setAttribute("partnerUserId", String.valueOf(kakaoPayRequest.getMemberId()));


        // 파라미터, 헤더
        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(parameters, this.getHeaders());

        // 외부에 보낼 url
        RestTemplate restTemplate = new RestTemplate();

        kakaoReady = restTemplate.postForObject(
                "https://kapi.kakao.com/v1/payment/ready",
                requestEntity,
                KakaoReadyResponse.class);



        return kakaoReady;
    }

   // 헤더
    private HttpHeaders getHeaders() {
        HttpHeaders httpHeaders = new HttpHeaders();

        String auth = "KakaoAK " + adminKey;

        httpHeaders.set("Authorization", auth);
        httpHeaders.set("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        return httpHeaders;
    }


    public KakaoApproveResponse ApproveResponse(String pgToken,HttpSession httpSession) {

        String partnerOrderId = (String) httpSession.getAttribute("partnerOrderId");
        String partnerUserId = (String) httpSession.getAttribute("partnerUserId");
        // 카카오 요청
        MultiValueMap<String, String> parameters = new LinkedMultiValueMap<>();
        parameters.add("cid", cid);
        parameters.add("tid", kakaoReady.getTid());
        parameters.add("partner_order_id", partnerOrderId);
        parameters.add("partner_user_id", partnerUserId);
        parameters.add("pg_token", pgToken);


        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(parameters, this.getHeaders());


        RestTemplate restTemplate = new RestTemplate();

        KakaoApproveResponse ApproveResponse = restTemplate.postForObject(
                "https://kapi.kakao.com/v1/payment/approve",
                requestEntity,
                KakaoApproveResponse.class);


        return ApproveResponse;
    }


    public KakaoCancelResponse kakaoCancel() {

        // 카카오페이 요청
        MultiValueMap<String, String> parameters = new LinkedMultiValueMap<>();
        parameters.add("cid", cid);
        parameters.add("tid", "환불할 결제 고유 번호");
        parameters.add("cancel_amount", "환불 금액");
        parameters.add("cancel_tax_free_amount", "환불 비과세 금액");
        parameters.add("cancel_vat_amount", "환불 부가세");

        // 파라미터, 헤더
        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(parameters, this.getHeaders());

        // 외부에 보낼 url
        RestTemplate restTemplate = new RestTemplate();

        KakaoCancelResponse cancelResponse = restTemplate.postForObject(
                "https://kapi.kakao.com/v1/payment/cancel",
                requestEntity,
                KakaoCancelResponse.class);

        return cancelResponse;
    }


}
