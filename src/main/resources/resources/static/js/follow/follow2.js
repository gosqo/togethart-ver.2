// 팔로우 한 사람 그림 불러오기

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

  const artworkUrl = `/follow/artwork/${memberId}`;

  try {
    const artworkResponse = await fetch(artworkUrl);
    if (artworkResponse.status === 200) {
      const artworkData = await artworkResponse.json();

      // galleryContainer.innerHTML = ''; // 기존의 내용을 비웁니다.

      // 이미지 목록을 표시하는 코드
      list(artworkData, galleryContainer);
    } else {
      console.error("이미지 가져오기 요청 실패: " + artworkResponse.status);
    }
  } catch (error) {
    console.error("오류 발생: " + error.message);
  }
});

// 이미지 목록을 표시하는 함수
function list(data, container) {
  // 기존 내용을 비우기 위해 container를 초기화
  container.innerHTML = "";

  for (let i = 0; i < data.length; i++) {
    const artworkId = data[i].artworkId;
    const resourcePathname = data[i].resourcePathname;

    const anchor = document.createElement("a");
    const wrapper = document.createElement("div");
    const piece = document.createElement("img");

    wrapper.className = "gallery-item";
    anchor.href = `/artwork/${artworkId}`;
    piece.src = resourcePathname;

    container.appendChild(anchor);
    anchor.appendChild(wrapper);
    wrapper.appendChild(piece);
  }
}
