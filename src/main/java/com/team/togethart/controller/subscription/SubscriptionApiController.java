package com.team.togethart.controller.subscription;

import com.team.togethart.dto.subscription.AuthRequest;
import com.team.togethart.dto.subscription.SubscriptionDTO;
import com.team.togethart.dto.subscription.SubscriptionImage;
import com.team.togethart.dto.subscription.SubscriptionInfo;
import com.team.togethart.service.SubscriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/sub")
public class SubscriptionApiController {
 /// 깃 커밋 테스트
    @Autowired
    private SubscriptionService subscriptionService;


    //구독 하기 // 작동
    @PostMapping("/makesub")
    public ResponseEntity<String> subscriptionUser(@RequestBody SubscriptionDTO subscriptionDTO) {

        if (subscriptionDTO.getSubscribeFrom().equals(subscriptionDTO.getSubscribeTo())) {
            return ResponseEntity.badRequest().body("자기 자신을 구독할 수 없습니다.");
        }
        Long subscribeTo = subscriptionDTO.getSubscribeTo();
        boolean isCertified2 = subscriptionService.isCertified2(subscribeTo);
        if(isCertified2){
            boolean isSubscriptions = subscriptionService.isSubscriptionExists(subscriptionDTO);

            if (isSubscriptions) {
                return ResponseEntity.badRequest().body("이미 구독 중입니다 !");
            } else {
                subscriptionService.subscriptionUser(subscriptionDTO);
                return ResponseEntity.ok("구독을 시작합니다");
            }
        } else {
            return ResponseEntity.badRequest().body("오 류 발 생");
        }





    }

    // 구독 연장
    @PostMapping("/extend")
    public ResponseEntity<String> extendSubscription(@RequestBody SubscriptionDTO subscriptionDTO) {
        if (subscriptionDTO.getSubscribeFrom().equals(subscriptionDTO.getSubscribeTo())) {
            return ResponseEntity.badRequest().body("자기 자신에게 구독 연장신청을 할 수 없습니다.");
        }
            subscriptionService.extendSubscription(subscriptionDTO);
            return ResponseEntity.ok("구독 기간을 연장했습니다.");

    }

    // 구독 재시작
    @PostMapping("/resub")
    public ResponseEntity<String> resubuser(@RequestBody SubscriptionDTO subscriptionDTO) {
        if (subscriptionDTO.getSubscribeFrom().equals(subscriptionDTO.getSubscribeTo())) {
            return ResponseEntity.badRequest().body("자기 자신을 재구독할 수 없습니다.");
        }

        boolean isSubscriptions = subscriptionService.isSubscriptionExists(subscriptionDTO);
        if (!isSubscriptions) {
            return ResponseEntity.badRequest().body("구독을 시작해주세요 !");
        }

        boolean isSubscriptionExpired = subscriptionService.isSubscriptionExpired(subscriptionDTO);
        if (isSubscriptionExpired) {
            subscriptionService.resubuser(subscriptionDTO);
            return ResponseEntity.ok("구독을 다시 시작할게요 !");
        } else {
            return ResponseEntity.ok("아직 만료되지 않았습니다 ?");
        }


    }

    
    // 구독 수동 취소 // 작동
    @PostMapping("/deletesub")
    public ResponseEntity<String> deletesub(@RequestBody SubscriptionDTO subscriptionDTO) {
        if (subscriptionDTO.getSubscribeFrom().equals(subscriptionDTO.getSubscribeTo())) {
            return ResponseEntity.badRequest().body("자기 자신을 구독 취소할 수 없습니다.");
        }

        boolean isSubscriptions = subscriptionService.isSubscriptionExists(subscriptionDTO);

        if(isSubscriptions){
            subscriptionService.deletesub(subscriptionDTO);
            return ResponseEntity.ok("구독이 취소됐습니다 ..");
        } else {
            return ResponseEntity.badRequest().body("구독 정보가 존재하지 않습니다 ?");
        }

    }

    // 구독 상태인 지 확인
    @GetMapping("/sub-check")
    public ResponseEntity<Map<String, Boolean>> subcheck(@RequestParam("subscribeFrom") Long subscribeFrom, @RequestParam("subscribeTo") Long subscribeTo) {


        SubscriptionDTO subscriptionDTO = new SubscriptionDTO();
        subscriptionDTO.setSubscribeFrom(subscribeFrom);
        subscriptionDTO.setSubscribeTo(subscribeTo);

        // followFrom과 followTo를 사용하여 팔로우 관계 확인
        boolean isSubscriptionExists = subscriptionService.isSubscriptionExists(subscriptionDTO);


        Map<String, Boolean> response = new HashMap<>();
        response.put("isSubscriptionExists", isSubscriptionExists);

        return ResponseEntity.ok(response);
    }


    //구독자 받을 수 있는 권한 얻기 // 작동
    @PostMapping("/getSubAuth")
    public ResponseEntity<String> updateMemberAuth(@RequestBody AuthRequest authRequest) {
        boolean isMemberAuthExists = subscriptionService.isMemberAuthExists(authRequest);
        boolean isCertified = subscriptionService.isCertified(authRequest);



        if(isMemberAuthExists){
            return ResponseEntity.badRequest().body("이미 구독 권한을 습득하셨습니다 !");
        }else if(isCertified){
            subscriptionService.updateMemberAuth(authRequest);
            return ResponseEntity.ok("회원 권한을 업데이트했습니다.");
        }else{
            return ResponseEntity.badRequest().body("자격이 부족합니다 ?");
        }

    }

    // 구독자 받기 ! 활성 조건
    @GetMapping("/isCertified/{memberId}")
    @ResponseBody
    public boolean isCertified(@PathVariable Long memberId) {
        AuthRequest authRequest = new AuthRequest();
        authRequest.setMemberId(memberId);

        return subscriptionService.isCertified(authRequest);
    }

    // 구독권한보내주기
    @GetMapping("/AuthStatus/{memberId}")
    public ResponseEntity<Integer> getAuthStatus(@PathVariable Long memberId) {
        int memberAuth = subscriptionService.getAuthStatus(memberId);
        return ResponseEntity.ok(memberAuth);
    }


    // 내가 구독하는 사람들 리스트 // 작동
    @GetMapping("/member/subs-info")
    public ResponseEntity<List<SubscriptionInfo>> getsubscribeto(@RequestParam Long memberId) {
        List<SubscriptionInfo> subscribeto = subscriptionService.getsubscribeto(memberId);
        return ResponseEntity.ok(subscribeto);
    }

    // 나를 구독하는 사람들 리스트 // 작동
    @GetMapping("/Isubbed/{member_id}")
    public ResponseEntity<List<SubscriptionInfo>> getsubscribefrom(@PathVariable Long memberId) {
        List<SubscriptionInfo> subscribefrom = subscriptionService.getsubscribefrom(memberId);
        return ResponseEntity.ok(subscribefrom);
    }

    // 구독자 전용 작품 모아보기

    @GetMapping("/member/subscribes")
    public ResponseEntity<List<SubscriptionImage>> getsubimage(@RequestParam Long memberId) {
        List<SubscriptionImage> subimage = subscriptionService.getsubimage(memberId);
        return ResponseEntity.ok(subimage);
    }

    // 구독이 만료됐는지
    @GetMapping("/member/{subscribeFrom}/subs-info/{subscribeTo}/IsSubscriptionExpired")
    public ResponseEntity<Map<String, Boolean>> isSubscriptionExpired(@PathVariable Long subscribeFrom, @PathVariable Long subscribeTo) {
        SubscriptionDTO subscriptionDTO = new SubscriptionDTO();
        subscriptionDTO.setSubscribeFrom(subscribeFrom);
        subscriptionDTO.setSubscribeTo(subscribeTo);

        boolean isSubscriptionExpired = subscriptionService.isSubscriptionExpired(subscriptionDTO);

        Map<String, Boolean> response = new HashMap<>();
        response.put("isSubscriptionExpired", isSubscriptionExpired);

        return ResponseEntity.ok(response);
    }

    // 구독한 작가 이름 , 프로필 사진 가져오기

//    @GetMapping("getauthor")
//    public ResponseEntity<List<AuthorResponse>> getauthor(@RequestParam Long memberId) {
//        List<AuthorResponse> author = subscriptionService.getauthor(memberId);
//        return ResponseEntity.ok(author);
//    }
}
