
window.addEventListener('load', () => {
  getMemberUsername();
    const popupLayer = document.querySelector('.popup_layer');
    const popupDimmed = document.querySelector('.popup_dimmed');

    popupLayer.style.display = 'none';
    popupDimmed.style.display = 'none';
})

function getMemberUsername() {

  const memberUsername = document.querySelector('#member-username');
  const memberImage = document.querySelector('#member-image');

  // 조회 중인 마이 페이지의 memberId;
  const targetMemberId = document.querySelector('#member-id').value;

  const url = `/api/member/${targetMemberId}/memberInfo`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      memberUsername.innerHTML = data.memberUsername;
      if (data.memberImage) {
        memberImage.src = data.memberImage;
      }
    });

}

const targetMemberId = document.querySelector('#member-id').value;

const memberUsernameAnchor = document.querySelector('#member-username-anchor');
memberUsernameAnchor.href = `/member/${targetMemberId}`;

// 전유영 수정
if (targetMemberId) {
  // 나를 팔로우 한 사람들의 수 가져오기
  fetch("/follow/followToCount/" + targetMemberId)
    .then((response) => response.json())
    .then((count) => {
      const countFollowTo = document.getElementById("count-follow-to");
        countFollowTo.innerHTML = `<a href="javascript:void(0);" style="text-decoration: none; color: inherit;">팔로워 : ${count}</a>`;
        countFollowTo.style.cursor = "pointer";
        countFollowTo.onclick = async function () {
            // 나를 팔로우 한 사람들 리스트
            try {

                const response = await fetch("/follow/followto/" + targetMemberId);
                const usernames = await response.json();
                const popupContent = usernames.map((username) => `<p>${username}</p>`).join('');

                const popupLayer = document.querySelector('.popup_layer');
                const popupDimmed = document.querySelector('.popup_dimmed');
                const textArea = document.querySelector('.text_area');

                textArea.innerHTML = popupContent;
                popupLayer.style.display = 'block';
                popupDimmed.style.display = 'block';
            } catch (error) {
                console.error("오류 발생:", error);
            }

        };
    })
    .catch((error) => {
      console.error("오류 발생:", error);
    }
    );



    // 내가 팔로우 한 사람들의 수 가져오기
  fetch("/follow/followFromCount/" + targetMemberId)
    .then((response) => response.json())
    .then((count) => {
        const countFollowFrom = document.getElementById("count-follow-from");
        countFollowFrom.innerHTML = `<a href="javascript:void(0);" style="text-decoration: none; color: inherit;">팔로우 : ${count}</a>`;
        countFollowFrom.style.cursor = "pointer";
        countFollowFrom.onclick = async function () {
            // 내가 팔로우 한 사람들 리스트
            try {
               
                const response = await fetch("/follow/followfrom/" + targetMemberId);
                const username = await response.json();

                const popupContent = username.map((username) => `<p>${username}</p>`).join('');


                const popupLayer = document.querySelector('.popup_layer');
                const popupDimmed = document.querySelector('.popup_dimmed');
                const textArea = document.querySelector('.text_area');

                textArea.innerHTML = popupContent;
                popupLayer.style.display = 'block';
                popupDimmed.style.display = 'block';
            } catch (error) {
                console.error("오류 발생:", error);
            }

        };

    })
    .catch((error) => {
      console.error("오류 발생:", error);
    });
}

    function closePopup(){
        const popupLayer = document.querySelector('.popup_layer');
        const popupDimmed = document.querySelector('.popup_dimmed');
        popupLayer.style.display = 'none';
        popupDimmed.style.display = 'none';

    }

// 전유영 수정 끝

if (sessionStorage.jwtToken) {

  // jwtToken 디코드
  const token = sessionStorage.getItem('jwtToken')?.replace('Bearer ', '');
  // console.log(token);
  const base64Payload = token.split('.')[1];
  const base64 = base64Payload.replace(/-/g, '+').replace(/_/g, '/');
  const decodedJWT = JSON.parse(
    decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    )
  );

  var userId = parseInt(decodedJWT.memberId);

  if (targetMemberId == userId) {
    document.querySelector('#follow-button').style.display = 'none';

  }
} else {
  
  document.querySelector('#follow-button').style.display = 'none';

}

// 팔로워 수, 팔로잉 수 기능 삽입 영역
