document.addEventListener("DOMContentLoaded", function () {
    
      
      const memberId = sessionStorage.getItem("memberId");
      console.log(memberId);
      const urlParams = new URLSearchParams(window.location.search);
      const target = urlParams.get("target");
      console.log(target);
      
      const oneMonthButton = document.getElementById("btn-1-month");

      oneMonthButton.addEventListener("click", async function () {
        const confirmation = confirm("결제 하시겠습니까?");
      
        if (confirmation) {
          
          const itemName = "1month"; 
          const totalAmount = 10500; 
      
          try {
            const response = await fetch("/payment/ready", {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
              },
              body: `memberId=${memberId}&itemName=${itemName}&totalAmount=${totalAmount}`, 
            });
      
            if (response.status === 200) {
              const responseData = await response.json();
              
              const paymentUrl = responseData.next_redirect_pc_url
              const popupWindow = window.open(paymentUrl, '_blank', 'width=800, height=600');
              popupWindow.onload = function () {
                // 팝업창이 로드되었을 때 실행
                if (kakaoApprove.aid && kakaoApprove.tid) {
                  // kakaoApprove.aid와 kakaoApprove.tid가 존재하면 처리
                  popupWindow.close(); // 팝업 창 닫기
                  window.location.href = 'http://localhost:8070/payment/success'; // 리다이렉트
                }
              };
              
            } else if (response.status === 400) {
            
        
             
            } else {
              console.error("결제를 실패했습니다.");
              
            }
          } catch (error) {
            console.error("오류 발생:", error);
           
          }
        } else {
          alert("결제를 취소하였습니다.");
        }
      });
  
      
  
  
    }
  );
  