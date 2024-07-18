const artworkId = document.querySelector('#artwork-id').value;

if (sessionStorage.jwtToken) {

  const goBack = document.querySelector('#go-back');
  goBack.addEventListener('click', () => {
    history.back();
  });

  const form = document.querySelector('#modify-artwork-form');
  const cancelModifyArtworkButton = document.querySelector('#cancel-modify-artwork-button')

  cancelModifyArtworkButton.addEventListener('click', () => {
    const confirmation = confirm(
      '작품 수정을 취소할 경우, 변경 내용을 저장하지 않습니다.\n작품 수정을 취소하시겠습니까?'
    );
    if (confirmation) {
      alert('작품 수정을 취소합니다. 이전 페이지로 안내합니다.')
      history.back();
    }
  });

  form.addEventListener('submit', handleModifyArtwork)

  function handleModifyArtwork(event) {
    event.preventDefault();

    const form = event.currentTarget;
    console.log(form + ' is event.currentTarget.');
    const formData = new FormData(form);
    modifyArtwork(formData);

  }

  function modifyArtwork(formData) {

    const url = `/artwork/${artworkId}`

    const plainFormData = Object.fromEntries(formData.entries());
    const artworkTitle = plainFormData.artworkTitle;
    const artworkDescription = plainFormData.artworkDescription;

    const customBody = {
      "artworkId": artworkId,
      "artworkTitle": artworkTitle,
      "artworkDescription": artworkDescription
    }

    const fetchOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(customBody)
    };

    if (artworkTitle !== '') {
      fetch(url, fetchOptions)
        .then(response => {
          if (response.status === 200) {
            alert('수정 내용을 반영했습니다.')
            window.location = `/artwork/${artworkId}`;
          } else {
            alert('수정에 실패했습니다.')
          }
        })
        .catch(e => console.error(e));
    } else {
      alert('작품 제목은 필수 입력 사항입니다.');
    }
  }

} else {
  alert('잘못된 접근입니다. 이전 페이지로 안내합니다.');
  history.back();
}
