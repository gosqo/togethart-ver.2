// 마이페이지 메뉴바의 구독하기 버튼 관련 기능 모음

document.addEventListener("DOMContentLoaded", function () {
  const token = sessionStorage.getItem("jwtToken")?.replace("Bearer ", "");

  if (!token) {
    console.log("토큰이 없습니다.");
    
    document.querySelector("#subscription-button").style.display = "none";
    document.querySelector("#menu-member-subscribes").style.display = "none";
    document.querySelector("#menu-member-subs-info").style.display = "none";
    document.querySelector('#menu-member-modify').style.display = 'none';
    document.querySelector(
      "#menu-member-home"
    ).href = `/member/${targetMemberId}`;
    document.querySelector(
      "#menu-member-artworks"
    ).href = `/member/${targetMemberId}/artworksWhole`;
    document.querySelector(
      "#menu-member-likes"
    ).href = `/member/${targetMemberId}/likesWhole`;
    document.querySelector(
      "#menu-member-subscribes"
    ).href = `/member/${targetMemberId}/subscribesWhole`;
    document.querySelector(
      "#menu-member-subs-info"
    ).href = `/member/${targetMemberId}/subs-infoWhole`;
    document.querySelector(
      "#menu-member-modify"
    ).href = `/profile/modify`;
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

  document.querySelector(
    "#menu-member-home"
  ).href = `/member/${targetMemberId}`;
  document.querySelector(
    "#menu-member-artworks"
  ).href = `/member/${targetMemberId}/artworksWhole`;
  document.querySelector(
    "#menu-member-likes"
  ).href = `/member/${targetMemberId}/likesWhole`;
  document.querySelector(
    "#menu-member-subscribes"
  ).href = `/member/${targetMemberId}/subscribesWhole`;
  document.querySelector(
    "#menu-member-subs-info"
  ).href = `/member/${targetMemberId}/subs-infoWhole`;
  // document.querySelector(
  //   "#menu-member-modify"
  // ).href = `/member/${targetMemberId}/modify`;
  document.querySelector(
    "#menu-member-modify"
  ).href = `/profile/modify`;

  if (sessionStorage.jwtToken) {
    // jwtToken 디코드
    const token = sessionStorage.getItem("jwtToken")?.replace("Bearer ", "");
    // console.log(token);
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

    var userId = parseInt(decodedJWT.memberId);

    if (targetMemberId == userId) {
      document.querySelector("#subscription-button").style.display = "none";
    }

    if (targetMemberId != userId) {
      document.querySelector("#menu-member-subscribes").style.display = "none";
      document.querySelector("#menu-member-subs-info").style.display = "none";
      document.querySelector("#menu-member-modify").style.display = "none";

      console.log(targetMemberId);

      fetch(`/sub/AuthStatus/${targetMemberId}`)
        .then((response) => response.json())
        .then((data) => {
          if (data === 1) {
            document.querySelector("#subscription-button").style.display =
              "block";
          } else {
            document.querySelector("#subscription-button").style.display =
              "none";
          }
        })
        .catch((error) => {
          console.error("요청 실패:", error);
        });
    }
  } else {
    document.querySelector("#subscription-button").style.display = "none";
    document.querySelector("#menu-member-subscribes").style.display = "none";
    document.querySelector("#menu-member-subs-info").style.display = "none";
    document.querySelector('#menu-member-modify').style.display = 'none';
  }

  const subscriptionButton = document.querySelector("#subscription-button");

  subscriptionButton.addEventListener("click", subscribeOrUnsubscribe);

  function subscribeOrUnsubscribe(event) {
    event.preventDefault();

    if (isSubscribing) {
      unsubscribeUser();
    } else {
      subscribeUser();
    }
  }

  function initSubscriptionButton() {
    fetchSubscriptionStatus();
  }

  function updateSubscriptionButton(isSubscriptionExists) {
    if (isSubscriptionExists) {
      subscriptionButton.innerHTML = "이미 구독 중 입니다.";
      subscriptionButton.disabled = true;
    } else {
      subscriptionButton.innerHTML = "구독하기";
      subscriptionButton.disabled = false;
    }
    isSubscribing = isSubscriptionExists;
  }

  // 구독 상태 가져오기
  function fetchSubscriptionStatus() {
    fetch(
      `/sub/sub-check?subscribeFrom=${memberId}&subscribeTo=${targetMemberId}`
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("요청 실패");
        }
      })
      .then((data) => {
        updateSubscriptionButton(data.isSubscriptionExists);
      })
      .catch((error) => {
        console.error("오류 발생:", error);
      });
  }

  function subscribeUser() {
    if (!isSubscribing) {
      // 이전에 구독되지 않은 경우에만 실행
      const requestData = {
        subscribeFrom: memberId,
        subscribeTo: targetMemberId,
      };

      fetch("/sub/makesub", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      })
        .then((response) => {
          if (response.ok) {
            isSubscribing = true;
            fetchSubscriptionStatus();

            alert("구독 시작");
          } else {
            throw new Error("요청 실패");
          }
        })
        .catch((error) => {
          console.error("오류 발생:", error);
        });
    }
  }

  function unsubscribeUser() {
    const requestData = {
      subscribeFrom: memberId,
      subscribeTo: targetMemberId,
    };

    fetch("/sub/deletesub", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (response.ok) {
          isSubscribing = false;
          fetchSubscriptionStatus();
        } else {
          throw new Error("요청 실패");
        }
      })
      .catch((error) => {
        console.error("오류 발생:", error);
      });
  }

  initSubscriptionButton();
});
