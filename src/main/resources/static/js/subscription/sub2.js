// 구독자 이미지 불러오기

document.addEventListener("DOMContentLoaded", async function () {
  const token = sessionStorage.getItem("jwtToken")?.replace("Bearer ", "");
  const galleryContainer = document.querySelector(".gallery-container");

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
  console.log(memberId);

  var uniqueImagePaths = new Set();

  const subscribesUrl = `/sub/member/subscribes?memberId=${memberId}`;

  try {
    const response = await fetch(subscribesUrl);

    if (response.status === 200) {
      const data = await response.json();

      galleryContainer.innerHTML = ""; // 기존의 내용을 비웁니다.

      data.forEach(function (item) {
        var resourcePathname = item.resourcePathname;

        // 이미지가 중복되지 않으면 이미지를 추가
        if (!uniqueImagePaths.has(resourcePathname)) {
          uniqueImagePaths.add(resourcePathname);

          var anchor = document.createElement("a");
          var wrapper = document.createElement("div");
          var piece = document.createElement("img");

          wrapper.className = "gallery-item";
          anchor.href = `/artwork/${item.artworkId}`;
          piece.src = resourcePathname;

          galleryContainer.appendChild(anchor);
          anchor.appendChild(wrapper);
          wrapper.appendChild(piece);
        }
      });
    } else {
      console.error("요청 실패: " + response.status);
    }
  } catch (error) {
    console.error("오류 발생: " + error.message);
  }
});
