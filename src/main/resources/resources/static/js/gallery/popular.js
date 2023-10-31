window.addEventListener('load', () => {
  getPopularGallery();

})

function list(data) {

  for (i = 0; i < data.length; i++) {

    const artworkId = data[i].artworkId;
    const resourcePathname = data[i].resourcePathname;

    const container = document.querySelector('#gallery-container');
    const anchor = document.createElement('a');
    const wrapper = document.createElement('div');
    const piece = document.createElement('img');

    wrapper.className = 'gallery-item';
    anchor.href = '/artwork/' + artworkId;
    piece.src = resourcePathname;

    container.appendChild(anchor);
    anchor.appendChild(wrapper);
    wrapper.appendChild(piece);

  }

}

// 토큰 여부에 따라서 함수 사용 구분
function getPopularGallery() {
  const url = '/main/popular'
  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      list(data);

    })
    .catch(e => console.error(e));
}