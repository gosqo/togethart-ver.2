window.addEventListener('load', () => {
  getMemberArtworks();
})

function getMemberArtworks() {

  const url = `/api/member/${targetMemberId}/artworksWhole`
  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.length > 0) {
        console.log(data);
        artworksList(data);
      } else {
        const noArtworks = document.createElement('p');
        document.querySelector('#artworks-container').appendChild(noArtworks);
        noArtworks.innerHTML = '업로드한 작품이 존재하지 않습니다.';
      }

    })
    .catch(e => console.error(e));

}

function artworksList(data) {

  // <div id="artworks-container" class="my-page-artworks-container">
  //   <a>
  //     <div class="my-page-artworks-item">
  //       <img class="my-page-artworks-img" src="/imgs/image3.png">
  //     </div>
  //   </a>
  // </div>

  for (i = 0; i < data.length; i++) {

    const artworkId = data[i].artworkId;
    const resourcePathname = data[i].resourcePathname;

    const container = document.querySelector('#artworks-container');
    const anchor = document.createElement('a');
    const wrapper = document.createElement('div');
    const piece = document.createElement('img');

    wrapper.className = 'gallery-item';
    anchor.href = `/artwork/${artworkId}`;
    piece.src = resourcePathname;
    // piece.className = 'my-page-artworks-img'

    container.appendChild(anchor);
    anchor.appendChild(wrapper);
    wrapper.appendChild(piece);

  }

}
