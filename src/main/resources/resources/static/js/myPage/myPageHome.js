const token = sessionStorage.jwtToken;

// 조회 중인 마이 페이지의 memberId;

// var targetMemberId = document.querySelector('#member-id').value;


window.addEventListener('load', () => {
  getMemberInfo();
  getMemberArtworks();
  getMemberLikes();
})

function getMemberInfo() {

  const memberBirth = document.querySelector('#member-birth');
  const memberRegiDate = document.querySelector('#member-regi-date');
  const memberIntro = document.querySelector('#member-intro');

  // console.log(targetMemberId);

  const url = `/api/member/${targetMemberId}/memberInfo`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      memberRegiDate.innerHTML = new Date(data.memberRegiDate).toLocaleDateString();

      
      if (data.memberBirth) {
        let date = new Date(data.memberBirth);
        console.log(date);
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const formattedDate = `${month}/${day}`;
        memberBirth.innerHTML = formattedDate;
      }
      if (data.memberIntro) {
        console.log('isisisisi')
        memberIntro.innerHTML = data.memberIntro;
      }
    });

}

// function getMemberArtworks() {

//   const url = `/api/member/${targetMemberId}/artworksHome`
//   fetch(url)
//     .then(response => response.json())
//     .then(data => {
//       console.log(data);
//       artworksList(data);

//     })
//     .catch(e => console.error(e));

// }

function getMemberArtworks() {

  const url = `/api/member/${targetMemberId}/artworksHome`
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

function getMemberLikes() {

  const url = `/api/member/${targetMemberId}/likesHome`
  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.length > 0) {
        console.log(data);
        likesList(data);
      } else {
        const noLikes = document.createElement('p');
        document.querySelector('#likes-container').appendChild(noLikes);
        noLikes.innerHTML = '좋아요한 작품이 없습니다.';
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

    wrapper.className = 'my-page-artworks-item';
    anchor.href = `/artwork/${artworkId}`;
    piece.src = resourcePathname;
    piece.className = 'my-page-artworks-img'

    container.appendChild(anchor);
    anchor.appendChild(wrapper);
    wrapper.appendChild(piece);

  }

}

function likesList(data) {

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

    const container = document.querySelector('#likes-container');
    const anchor = document.createElement('a');
    const wrapper = document.createElement('div');
    const piece = document.createElement('img');

    wrapper.className = 'my-page-artworks-item';
    anchor.href = `/artwork/${artworkId}`;
    piece.src = resourcePathname;
    piece.className = 'my-page-artworks-img'

    container.appendChild(anchor);
    anchor.appendChild(wrapper);
    wrapper.appendChild(piece);

  }

}


document.querySelector('#recent-artworks').href = `/member/${targetMemberId}/artworksWhole`;
document.querySelector('#liked-artworks').href = `/member/${targetMemberId}/likesWhole`;
