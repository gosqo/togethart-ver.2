document.addEventListener("DOMContentLoaded", async function () {
  const token = sessionStorage.getItem("jwtToken")?.replace("Bearer ", "");

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
  var memberId2 = document.querySelector("#member-id").value;

  const authRequest = { memberId: memberId };

  if (memberId == memberId2) {
    const subscribeButton = document.querySelector("#subscribe-button");

    subscribeButton.addEventListener("click", async function () {
      fetch("/sub/getSubAuth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(authRequest),
      }).then((response) => {
        if (response.ok) {
          alert("지금부터 구독자 모집을 시작합니다 !!!!");
          subscribeButton.textContent = "구독자 모집 중 !";
          subscribeButton.disabled = true; // 버튼 비활성화
        } else {
          throw new Error("요청 실패");
        }
      });
    });

    // 서버에서 isCertified 값 가져오기
    function getCertifiedStatus(memberId) {
      return fetch("/sub/isCertified/" + memberId)
        .then((response) => response.json())
        .then((isCertified) => isCertified);
    }

    // 서버에서 memberAuth 값 가져오기
    function getMemberAuthStatus(memberId) {
      return fetch("/sub/AuthStatus/" + memberId)
        .then((response) => response.json())
        .then((memberAuth) => memberAuth);
    }

    const isCertified = await getCertifiedStatus(memberId);
    const memberAuth = await getMemberAuthStatus(memberId);

    if (isCertified) {
      if (memberAuth === 1) {
        subscribeButton.textContent = "구독자 모집 중 !";
        subscribeButton.disabled = true; // 버튼 비활성화
      } else {
        // 버튼 표시
        subscribeButton.textContent = "구독 기능 활성화";
        subscribeButton.disabled = false; // 버튼 활성화
      }
    } else {
      subscribeButton.style.display = "none"; // 버튼 숨김
    }
  } else {
    var navbar = document.querySelector("#subbar");
    var table = document.querySelector(".table");

    if (navbar) {
      navbar.style.display = "none";
    }

    if (table) {
      table.style.display = "none";
    }
  }
});
