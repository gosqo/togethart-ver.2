package com.team.togethart.repository.subscription;


import com.team.togethart.dto.subscription.*;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface SubscriptionMapper {

    void insertSubscription(SubscriptionDTO subscriptionDTO);

    void extendSubscription(SubscriptionDTO subscriptionDTO);

    void resubuser(SubscriptionDTO subscriptionDTO);

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
