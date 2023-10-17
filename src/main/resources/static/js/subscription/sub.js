document.addEventListener("DOMContentLoaded", function () {
  const token = sessionStorage.getItem("jwtToken")?.replace("Bearer ", "");
  const galleryContainer = document.querySelector(".gallery-container2");
  const subscriptionButton = document.getElementById("subscription-button");
  if (!token) {
    subscriptionButton.style.display = "none";
    subscriptionButton.textContent = "";
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
  console.log(memberId);

  const subscribedLink = document.querySelector(
    `a.nav-link[href="/member/${memberId}/subscribes"]`
  );

  if (subscribedLink && memberId) {
    subscribedLink.href = `/member/${memberId}/subscribes`;
  }

  let isSubscribing = false;
  const subscribeTo = document.getElementById("uploader").value;

  function getMemberAuthStatus(subscribeTo) {
    return fetch("/sub/AuthStatus/" + subscribeTo)
      .then((response) => response.json())
      .then((memberAuth) => memberAuth);
  }

  getMemberAuthStatus(subscribeTo).then((memberAuth) => {
    if (memberId == subscribeTo || memberAuth == 0) {
      subscriptionButton.style.display = "none";
      subscriptionButton.textContent = "";
    } else {
      updateSubscriptionButton();
    }
  });

  subscriptionButton.addEventListener("click", function (event) {
    event.preventDefault();
    isSubscribing ? unsubscribeUser() : subscribeUser();
  });

  function updateSubscriptionButton() {
    if (memberId == subscribeTo) {
      subscriptionButton.style.display = "none";
      subscriptionButton.textContent = "";
      return;
    }

    fetch(`/sub/sub-check?subscribeFrom=${memberId}&subscribeTo=${subscribeTo}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("요청 실패");
        }
      })
      .then((data) => {
        const isSubscriptionExists = data.isSubscriptionExists;
        if (isSubscriptionExists) {
          subscriptionButton.innerHTML = "이미 구독중인 회원입니다.";
          subscriptionButton.disabled = true;
        } else {
          subscriptionButton.innerHTML = "구독 하기";
          subscriptionButton.disabled = false;
        }
        isSubscribing = isSubscriptionExists;
      })
      .catch((error) => {
        console.error("오류 발생:", error);
      });
  }

  function subscribeUser() {
    const requestData = {
      subscribeFrom: memberId,
      subscribeTo: subscribeTo,
    };

    if (memberId == subscribeTo) {
      alert("자기 자신을 구독할 수 없습니다.");
      return;
    }

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
          updateSubscriptionButton();
          alert("구독을 시작합니다.");
        } else {
          throw new Error("요청 실패");
        }
      })
      .catch((error) => {
        console.error("오류 발생:", error);
      });
  }

  function unsubscribeUser() {
    const requestData = {
      subscribeFrom: memberId,
      subscribeTo: subscribeTo,
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
          updateSubscriptionButton();
        } else {
          throw new Error("요청 실패");
        }
      })
      .catch((error) => {
        console.error("오류 발생:", error);
      });
  }
});
