package com.team.togethart.dto.kakaoPay;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Component
public class KakaoPayRequest {
    String memberId;
    String itemName;
    int totalAmount;
}
