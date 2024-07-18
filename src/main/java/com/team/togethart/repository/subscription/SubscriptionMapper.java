package com.team.togethart.repository.subscription;


import com.team.togethart.dto.subscription.*;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface SubscriptionMapper {

    void insertSubscription(SubscriptionDTO subscriptionDTO);

    // 구독 연장 1 3 6 12
    void oneMonthExtendSub(SubscriptionDTO subscriptionDTO);
    void threeMonthExtendSub(SubscriptionDTO subscriptionDTO);
    void sixMonthExtendSub(SubscriptionDTO subscriptionDTO);
    void twelveMonthExtendSub(SubscriptionDTO subscriptionDTO);
    
    // 구독 연장 끝


    // 구독 재시작 1 3 6 12
    void reSubOneMonth(SubscriptionDTO subscriptionDTO);

    void reSubThreeMonth(SubscriptionDTO subscriptionDTO);

    void reSubSixMonth(SubscriptionDTO subscriptionDTO);

    void reSubTwelveMonth(SubscriptionDTO subscriptionDTO);

    // 구독 재시작 끝

    long getSubscription(SubscriptionDTO subscriptionDTO);


    // 구독 권한 얻었는지 확인


    boolean isMemberAuthExists(AuthRequest authRequest);
    // 구독 권한 업데이트

    boolean isCertified(AuthRequest authRequest);

    boolean isCertified2(Long subscribeTo);

    void updateMemberAuth(AuthRequest authRequest);


    // 구독권한정보 넘겨주기
    int getAuthStatus(Long member_id);




    List<SubscriptionInfo> getsubscribeto(Long memberId);

    List<SubscriptionInfo> getsubscribefrom(Long memberId);

    void deletesub(SubscriptionDTO subscriptionDTO);

    // 구독전용작품 모아보기

    List<SubscriptionImage> getsubimage(Long memberId);

    // 구독이 만료됐는지 ?

    boolean isSubscriptionExpired(SubscriptionDTO subscriptionDTO);

    List<AuthorResponse> getauthor(Long memberId);
}
