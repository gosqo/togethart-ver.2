document.addEventListener("DOMContentLoaded", async function () {
    



      const memberId = sessionStorage.getItem("memberId");
      const urlParams = new URLSearchParams(window.location.search);
      const target = urlParams.get("target");      
      var month;
     

      notMyself(memberId, target);
       async function notMyself(memberId, target){
              if(memberId == target){
            window.location.replace('/');
            alert("잘못된 접근입니다");
          }         
      };

      async function getMemberAuthStatus(target) {
        try {
          const response = await fetch("/sub/AuthStatus/" + target);
          if (response.status === 200) {
            const memberAuth = await response.json();
            return memberAuth;
          } else {
            console.error("멤버 인증 상태 가져오기 실패: " + response.status);            
          }
        } catch (error) {
          console.error("오류 발생:", error);          
        }
      };

      const memberAuth = await getMemberAuthStatus(target);
      
      if(memberAuth == 1 ){
      const oneMonthButton = document.getElementById("btn-1-month");
      const threeMonthButton = document.getElementById("btn-3-months");
      const sixMonthButton = document.getElementById("btn-6-months");
      const twelveMonthButton = document.getElementById("btn-12-months");
      

      oneMonthButton.addEventListener("click", async function () {
        const confirmation = confirm("결제 하시겠습니까?");
      
        if (confirmation) {
          
          const itemName = "1개월 구독권"; 
          const match = itemName.match(/\d+/); 

        if (match) {
           month = parseInt(match[0]); 
          }
         
          const totalAmount = 9900; 
      
          try {
            const response = await fetch("/payment/ready", {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
              },
              body: `memberId=${memberId}&itemName=${itemName}&totalAmount=${totalAmount}`, 
            });
      
            if (response.status === 200) {
              sessionStorage.setItem("target", target);
              sessionStorage.setItem("month", month);
              const responseData = await response.json();

              
              const paymentUrl = responseData.next_redirect_pc_url
              const popupWindow = window.open(paymentUrl, '_blank', 'width=800, height=600');
              
              
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

      threeMonthButton.addEventListener("click", async function () {
        const confirmation = confirm("결제 하시겠습니까?");
      
        if (confirmation) {
          
          const itemName = "3개월 구독권"; 
          const match = itemName.match(/\d+/); 

          if (match) {
             month = parseInt(match[0]); 
            }
          const totalAmount = 28000; 
      
          try {
            const response = await fetch("/payment/ready", {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
              },
              body: `memberId=${memberId}&itemName=${itemName}&totalAmount=${totalAmount}`, 
            });
      
            if (response.status === 200) {
              sessionStorage.setItem("target", target);
              sessionStorage.setItem("month", month);
              const responseData = await response.json();
  
              
              const paymentUrl = responseData.next_redirect_pc_url
              const popupWindow = window.open(paymentUrl, '_blank', 'width=800, height=600');
              
              
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

      sixMonthButton.addEventListener("click", async function () {
        const confirmation = confirm("결제 하시겠습니까?");
      
        if (confirmation) {
          
          const itemName = "6개월 구독권"; 
          const match = itemName.match(/\d+/); 

          if (match) {
             month = parseInt(match[0]); 
            }
          const totalAmount = 55000; 
      
          try {
            const response = await fetch("/payment/ready", {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
              },
              body: `memberId=${memberId}&itemName=${itemName}&totalAmount=${totalAmount}`, 
            });
      
            if (response.status === 200) {
              sessionStorage.setItem("target", target);
              sessionStorage.setItem("month", month);
              const responseData = await response.json();
  
              
              const paymentUrl = responseData.next_redirect_pc_url
              const popupWindow = window.open(paymentUrl, '_blank', 'width=800, height=600');
              
              
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


      twelveMonthButton.addEventListener("click", async function () {
        const confirmation = confirm("결제 하시겠습니까?");
      
        if (confirmation) {
          
          const itemName = "12개월 구독권"; 
          const match = itemName.match(/\d+/); 

          if (match) {
             month = parseInt(match[0]); 
            }
          const totalAmount = 100000; 
      
          try {
            const response = await fetch("/payment/ready", {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
              },
              body: `memberId=${memberId}&itemName=${itemName}&totalAmount=${totalAmount}`, 
            });
      
            if (response.status === 200) {
              sessionStorage.setItem("target", target);
              sessionStorage.setItem("month", month);
              const responseData = await response.json();
  
              
              const paymentUrl = responseData.next_redirect_pc_url
              const popupWindow = window.open(paymentUrl, '_blank', 'width=800, height=600');
              
              
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
  

    } else {
      alert("잘못된 접근입니다.");
      window.location.replace('/');
    }
      
      
  
  
    }
  );
  