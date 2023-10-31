const urlParams = new URLSearchParams(window.location.search);
const keyword = urlParams.get("keyword");

fetch("/search/" + keyword)
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("검색 결과를 가져오는 중 오류가 발생했습니다.");
    }
  })
  .then((searchResults) => {
    if (searchResults.length === 0) {
      alert("검색된 게시물이 없습니다....");

      window.location.href = "/";
    } else {
      const galleryContainer = document.getElementById("gallery-container");

      searchResults.forEach((result) => {
        const galleryItem = document.createElement("div");
        galleryItem.className = "gallery-item";

        const link = document.createElement("a");
        link.href = `/artwork/${result.artworkId}`;
        link.target = "_self";

        const image = document.createElement("img");
        image.src = result.resourcePathName;
        image.alt = result.imageAlt;

        link.appendChild(image);
        galleryItem.appendChild(link);

        galleryContainer.appendChild(galleryItem);
      });
    }
  })
  .catch((error) => {
    console.error("검색 결과 가져오기 실패:", error);
  });
