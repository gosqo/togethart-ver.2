let isContentLoadedHandled = false;

document.addEventListener("DOMContentLoaded", async function () {
  
  if (isContentLoadedHandled) {
    return;
  }

  isContentLoadedHandled = true;

  const token = sessionStorage.getItem("jwtToken")?.replace("Bearer ", "");
  const tableBody = document.getElementById("subscriptionTableBody");

  if (!token) {
    console.log("토큰이 없습니다.");
    return;
  }

  const base64Payload = token.split(".")[1];
  const base64 = base64Payload.replace(/-/g, "+").replace(/_/g, "/");
  const decodedJWT = JSON.parse(
    decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    )
  );

  const memberId = decodedJWT.memberId;
 
  
  // memberId를 사용하여 동적 URL 생성
  const subsInfoUrl = `/sub/member/subs-info?memberId=${memberId}`;

  try {
    const response = await fetch(subsInfoUrl);

    if (response.status === 200) {
      const data = await response.json();
      

      for (const item of data) {
        if (item.memberUsername && item.startDate && item.expireDate) {
          
          const row = document.createElement("tr");
          const usernameCell = document.createElement("th");
          const startDateCell = document.createElement("td");
          const endDateCell = document.createElement("td");
          const extendCell = document.createElement("td");
          const cancelCell = document.createElement("td");

          usernameCell.textContent = item.memberUsername;
          startDateCell.textContent = item.startDate.replace("T", " ");
          endDateCell.textContent = item.expireDate.replace("T", " ");
          

          // 구독 만료 여부 확인을 위한 요청
          const isExpiredResponse = await fetch(
            `/sub/member/${memberId}/subs-info/${item.memberId}/IsSubscriptionExpired`
          );
          
          
          if (isExpiredResponse.status === 200) {
            const { isSubscriptionExpired } = await isExpiredResponse.json();
            if (isSubscriptionExpired) {
              const expiredBtn = document.createElement("button");
              expiredBtn.textContent = "구독 만료 !";

              expiredBtn.addEventListener("click", async function () {
                const isresub = "true";
                sessionStorage.setItem("isresub", isresub);
                sessionStorage.setItem("memberId", memberId);
                const url = `/resub?target=${item.memberId}`;
                window.location.href = url;

              });

              extendCell.appendChild(expiredBtn);
            } else {
             
              const extendBtn = document.createElement("button");
              extendBtn.textContent = "구독 연장";
              extendBtn.addEventListener("click", async function () {
                const isresub = "false";
                sessionStorage.setItem("isresub", isresub);
                sessionStorage.setItem("memberId", memberId);
                const url = `/payment?target=${item.memberId}`;
                
                window.location.href = url;

                
              });

               extendCell.appendChild(extendBtn);
            }
          }

          // 구독 취소 버튼
          const cancelBtn = document.createElement("button");
          cancelBtn.textContent = "구독 취소";

          cancelBtn.addEventListener("click", async () => {
            const confirmation = confirm("정말로 구독을 취소하시겠습니까?");

            if (confirmation) {
              try {
                const response = await fetch("/sub/deletesub", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    subscribeFrom: memberId,
                    subscribeTo: item.memberId,
                  }),
                });

                if (response.status === 200) {
                  alert("구독이 취소되었습니다.");
                  location.reload();
                } else {
                  alert("구독을 취소하지 않으셨습니다 !.");
                }
              } catch (error) {
                console.error("오류 발생: " + error.message);
              }
            }
          });

          cancelCell.appendChild(cancelBtn);

          row.appendChild(usernameCell);
          row.appendChild(startDateCell);
          row.appendChild(endDateCell);
          row.appendChild(extendCell);
          row.appendChild(cancelCell);

          // bongbong
          usernameCell.style.color = 'darkgrey';
          startDateCell.style.color = 'darkgrey';
          endDateCell.style.color = 'darkgrey';
          extendCell.style.color = 'darkgrey';
          cancelCell.style.color = 'darkgrey';
          // bongbong

          tableBody.appendChild(row);
        }
      }
    } else {
      console.error("요청 실패: " + response.status);
    }
  } catch (error) {
    console.error("오류 발생: " + error.message);
  }

  
});
