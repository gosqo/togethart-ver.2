
window.addEventListener('load', () => {
  getMemberUsername();
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
      console.log(data);
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
      countFollowTo.textContent = `팔로워 : ${count}`;
      console.log(count);
    })
    .catch((error) => {
      console.error("오류 발생:", error);
    });

  // 내가 팔로우 한 사람들의 수 가져오기
  fetch("/follow/followFromCount/" + targetMemberId)
    .then((response) => response.json())
    .then((count) => {
      const countFollowFrom = document.getElementById("count-follow-from");
      countFollowFrom.textContent = `팔로우 : ${count}`;
      console.log(count);
    })
    .catch((error) => {
      console.error("오류 발생:", error);
    });
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
