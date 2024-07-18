console.log(artworkId + ' is an artwork id.');

// 작품 상세 페이지 내, 작품 수정 버튼 관련
const modifyArtworkButton = document.querySelector('#modify-artwork-button');

if (sessionStorage.jwtToken && userId === uploader) {

  modifyArtworkButton.addEventListener('click', () => {
    window.location = `/artwork/${artworkId}/modify`;
  });

} else {
  modifyArtworkButton.style.display = 'none';
} // 작품 수정 버튼 관련 끝. --------
