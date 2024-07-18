document.addEventListener("DOMContentLoaded", async function() {
  const target = sessionStorage.getItem("target");
  const month = sessionStorage.getItem("month");
  const memberId = sessionStorage.getItem("memberId");
  const redirectURL = `/member/${memberId}/subs-infoWhole`;
  const isresub = sessionStorage.getItem("isresub")

  confirmButton.addEventListener("click", function(){
    function closePopupAndRedirect() {
      
      closePopup();
      window.opener.location.href = redirectURL;
      window.close(); 
    }
  
    function closePopup() {
      const popup = document.getElementById('popup');
      if (popup) {
       popup.style.display = 'none';
      }
    }
    closePopupAndRedirect();

  });

 
    if(isresub == "true"){
      try {
        const response = await fetch(`/sub/resub/${month}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            subscribeFrom: memberId,
            subscribeTo: target,
          }),
        });
    
        if (response.status === 200) {
          // 꼭 뭘 채워넣어야 하나 ?
        } else {
          console.error("요청 실패: " + response.status);
        }
      } catch (error) {
        console.error("오류 발생: " + error.message);
      }

    } 
    
      if(isresub == "false") {
      try {
        const response = await fetch(`/sub/extend/${month}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            subscribeFrom: memberId,
            subscribeTo: target,
          }),
        });
    
        if (response.status === 200) {
          // 꼭 뭘 채워넣어야 하나 ?
        } else {
          console.error("요청 실패: " + response.status);
        }
      } catch (error) {
        console.error("오류 발생: " + error.message);
      }

    };
  
  
  
});

    
      
  
  
  
  
  
  
  


// // document.addEventListener("DOMContentLoaded", function () {
    
// //     const target = sessionStorage.getItem("target");
// //     console.log(target);
// //     const month = sessionStorage.getItem("month");

// //     const memberId = sessionStorage.getItem("memberId");
// //     const redirectURL = `/member/${memberId}/subs-infoWhole`;
// //     const confirmButton = document.getElementById("confirmButton");
// //     console.log(memberId);

// //     confirmButton.addEventListener("click", async function() {
// //         try {
// //                   const response = await fetch(`/sub/extend/${month}`, {
// //                     method: "POST",
// //                     headers: {
// //                       "Content-Type": "application/json",
// //                     },
// //                     body: JSON.stringify({
// //                       subscribeFrom: memberId,
// //                       subscribeTo: target,
// //                     }),
// //                   });

// //                   if (response.status === 200) {
// //                    // 꼭 뭘 채워넣어야 하나 ?
// //                   } else {
// //                     console.error("요청 실패: " + response.status);
// //                   }
// //                 } catch (error) {
// //                   console.error("오류 발생: " + error.message);
// //                 }
// //       closePopupAndRedirect();
// //     });
  
// //     function closePopupAndRedirect() {
      
// //       closePopup();
// //       window.opener.location.href = redirectURL;
// //       window.close(); 
// //     }
  
// //     function closePopup() {
// //       const popup = document.getElementById('popup');
// //       if (popup) {
// //        popup.style.display = 'none';
// //       }
// //     }
    






// //  }
// // );
