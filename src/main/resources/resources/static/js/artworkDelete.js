document.addEventListener("DOMContentLoaded", function () {
  const token = sessionStorage.getItem("jwtToken")?.replace("Bearer ", "");

  const deleteArtworkButton = document.getElementById("delete-artwork-button");

  if (!token) {
    deleteArtworkButton.style.display = "none";
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
  // 변수 설정
  const currentMemberId = decodedJWT.memberId;
  console.log(currentMemberId);
  const artworkUploaderId = document.getElementById("uploader").value;
  console.log(artworkUploaderId);
  const currentURL = window.location.href;
  const artworkId = currentURL.split("/").pop();
  console.log(artworkId);
  // 변수 설정 끝

  if (currentMemberId == artworkUploaderId) {
    deleteArtworkButton.style.display = "block";
  } else {
    deleteArtworkButton.style.display = "none";
  }

  deleteArtworkButton.addEventListener("click", function () {
    const confirmation = confirm("정말로 작품을 삭제하시겠습니까?");

    if (confirmation) {
      if (currentMemberId == artworkUploaderId) {
        fetch("/deleteArtwork", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ artworkId: artworkId }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.message == "파일이 삭제됐습니다.") {
              alert("작품이 삭제되었습니다.");
              window.location.href = "/";
            } else {
              console.error("작품 삭제 실패.");
            }
          })
          .catch((error) => {
            console.error("오류 발생: " + error);
          });
      }
    }
  });
});
