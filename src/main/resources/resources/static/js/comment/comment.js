window.addEventListener('load', () => {
  getCommentList();
})

// 토큰에서 유저네임 추출
const token = sessionStorage.getItem('jwtToken')?.replace('Bearer ', '');
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

const commentUsername = decodedJWT.Username;


// 댓글 작성 formDatas
const form = document.querySelector('#comment-form');
form.addEventListener('submit', handleFormSubmit);

async function handleFormSubmit(event) {

  event.preventDefault();

  const form = event.currentTarget;
  const url = `/comment/new`;

  try {

    const formData = new FormData(form);
    const responseData = await postFormDataAsJson({ url, formData });

  } catch (error) {
    console.error(error);
  }
}

// 댓글 작성 POST
async function postFormDataAsJson({ url, formData }) {
  const plainFormData = Object.fromEntries(formData.entries());
  console.log(plainFormData);
  console.log(commentUsername);

  const commentContent = plainFormData.commentContent;
  console.log(commentContent);

  const customBody = {
    "artworkId": `${artworkId}`,
    "memberId": `${userId}`,
    "memberUsername": `${commentUsername}`,
    "commentContent": `${commentContent}`
  };


  console.log(JSON.stringify(customBody) + ' customBody');

  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',

    },
    body: JSON.stringify(customBody),
  };
  if (commentContent !== "") {
    fetch(url, fetchOptions)
      .then((response) => {
        if (response.status === 200) {
          alert('댓글을 작성했습니다.')
        } else {
          alert('댓글 작성을 실패했습니다. 로그인 후, 작성해주세요.')
        }
        response.text();
        console.log(response);
        console.log(response.status);
      })
      .then(() => {
        // getCommentList();
        window.location.reload();
      });
  }
} // 댓글 작성 끝

// 댓글 조회
function getCommentList() {

  fetch(`/comment/${artworkId}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      commentList(data);
    })


}

// 댓글 조회 반복문
function commentList(data) {

  const container = document.querySelector('#comment-list-container');

  for (i = 0; i < data.length; i++) {

    // < !--댓글 하나의 컨테이너: 플렉스-- >

    //       <div class="comment-unit">
    const unit = document.createElement('div');
    //         <!-- 프로필 사진 -->
    //         <div class="member-image-container">
    const memberImageWrapper = document.createElement('div');
    //           <img id="member-image" class="member-image" src="/imgs/image2.png" alt="member-profile-image">
    const memberImg = document.createElement('img');
    //         </div>
    //         <!-- 작성자, 업로드•수정일자, 컨텐츠 컨테이너 -->
    //         <div style="flex:1;">
    const rightSide = document.createElement('div');
    //           <div>
    const writerAndDate = document.createElement('div');
    //             <!-- 작성자 -->
    //             <span><a id="comment-username" href="" style="margin-bottom: .1rem;">회원 닉네임 (유저네임)</a></span>
    const writerSpan = document.createElement('span');
    const writerAnchor = document.createElement('a');
    //             <!-- 업로드•수정일자 -->
    //             <span id="comment-upload-date" style="margin-left:1.5rem;">2023.09.22</span>
    const writerDate = document.createElement('span');
    //           </div>
    //           <!-- 댓글 내용 -->
    //           <div>
    const contentWrapper = document.createElement('div');
    //             <p id="comment-content">Lorem ipsum dolor facilis veritatis aperiam unde saepe vitae debitis ratione itaque reiciendis ipsam
    //               id cumque pariatur non in nisi quibusdam consequuntur.</p>
    const content = document.createElement('p');
    //           </div>
    //  <button type="submit"></button>
    const commentDeleteButton = document.createElement('button');
    //         </div>
    //       </div>

    const commentId = data[i].commentId;
    const memberUsername = data[i].memberUsername;
    const commentContent = data[i].commentContent;
    const memberImage = data[i].memberImage;
    const cUploadDate = data[i].cuploadDate;
    const memberId = data[i].memberId;

    const uploadDate = new Date(cUploadDate);
    const year = uploadDate.getFullYear();
    const month = uploadDate.getMonth() + 1;
    const date = uploadDate.getDate();

    const commentUploadDate = `${year}-${month >= 10 ? month : '0' + month}-${date >= 10 ? date : '0' + date}`;

    unit.className = 'comment-unit';
    memberImageWrapper.className = 'member-image-container';
    memberImg.className = 'member-image';
    memberImg.src = memberImage; // memberImage used.
    rightSide.style.flex = '1';
    writerAnchor.innerHTML = `${memberUsername}`; // memberUsername used.
    writerAnchor.href = `/member/${memberId}`; // memberId used.
    writerAnchor.style.marginBottom = '0.1rem';
    writerDate.innerHTML = commentUploadDate; // cUploadDate used.
    writerDate.style.marginLeft = '1.5rem';
    content.innerHTML = `${commentContent}`; // commentContent used.

    commentDeleteButton.id = `commentDeleteButton${commentId}`;
    commentDeleteButton.type = 'submit';
    commentDeleteButton.innerHTML = '삭제';
    commentDeleteButton.value = commentId; // commentId used.

    container.appendChild(unit);
    unit.appendChild(memberImageWrapper);
    unit.appendChild(rightSide);
    memberImageWrapper.appendChild(memberImg);
    rightSide.appendChild(writerAndDate);
    rightSide.appendChild(contentWrapper);
    rightSide.appendChild(commentDeleteButton);
    writerAndDate.appendChild(writerSpan);
    writerAndDate.appendChild(writerDate);
    writerSpan.appendChild(writerAnchor);
    contentWrapper.appendChild(content);

    if (memberId != userId) {
      commentDeleteButton.style.display = 'none';
    }

    commentDeleteButton.addEventListener('click', handleRemoveComment);

  }

} // 댓글 조회 반복 메서드 종료

function handleRemoveComment(event) {
  const commentId = event.currentTarget.id.substring(19);
  console.log(event.currentTarget);
  console.log(event.currentTarget.id);

  console.log(commentId + 'substring');
  event.preventDefault();

  try {
    const result = removeComment(commentId);
  } catch (error) {
    console.error(error);
  }



}

function removeComment(commentId) {
  fetch(`/comment/${commentId}`, {
    method: 'DELETE'
  })
    .then(response => {
      console.log(response.status);
      if (response.status == 200) {
        alert('댓글이 삭제 됐습니다.')
      } else {
        alert('댓글 삭제 중 문제가 발생 했습니다. 다시 시도해주세요.')
      }
    })
    .then(() => window.location.reload())
    .catch(e => console.error(e));
}

function removeComment(commentId) {
  const confirmation = confirm('댓글을 삭제하시겠습니까? 삭제된 댓글은 되돌릴 수 없습니다.');
  if (confirmation) {
    fetch(`/comment/${commentId}`, {
      method: 'DELETE'
    })
      .then(response => {
        console.log(response.status);
        if (response.status == 200) {
          alert('댓글이 삭제 됐습니다.')
        } else {
          alert('댓글 삭제 중 문제가 발생 했습니다. 다시 시도해주세요.')
        }
      })
      .then(() => window.location.reload())
      .catch(e => console.error(e));
  }
}
