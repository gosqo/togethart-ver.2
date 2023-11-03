window.addEventListener('load', () => {
  getCommentList();
})

if (sessionStorage.jwtToken) {
  console.log('logged in');
  
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
  
  var commentUsername = decodedJWT.Username;
  console.log('reading...');
  console.log(commentUsername);
  
  
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
    console.log('postFormDataAsJson is called.');
    const plainFormData = Object.fromEntries(formData.entries());
    console.log(plainFormData + ' is an object named plainFormData.');
    // console.log(commentUsername + ' is a memberUsername from token.');
  
    const commentContent = plainFormData.commentContent;
    console.log(commentContent + ' is a commentContent.');
  
    const customBody = {
      "artworkId": `${artworkId}`,
      "memberId": `${userId}`,
      "memberUsername": `${commentUsername}`,
      "commentContent": `${commentContent}`
    };
  
  
    console.log(JSON.stringify(customBody) + ' is the customBody');
  
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
            alert('댓글 작성을 실패했습니다. 문제가 계속되면 관리자에게 알려주십시오.')
          }
          response.text();
          console.log(response);
          console.log(response.status);
        })
        .then(() => {
          // getCommentList();
          window.location.reload();
        });
    } else {
      alert('댓글 내용을 작성해주세요.')
    }
  } // 댓글 작성 끝

  
} else {

  console.log('not logged in');

  const submitButton = document.querySelector('#submit-button');
  submitButton.addEventListener('click', handleClick);

  function handleClick(event) {
    
    event.preventDefault();
    alert('로그인 후 사용해주세요.');

  }

}

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

    //    댓글 하나의 컨테이너: 플렉스
    const unit = document.createElement('div');
    //         프로필 사진 
    const memberImageWrapper = document.createElement('div');
    const memberImg = document.createElement('img');
    //         작성자, 업로드•수정일자, 컨텐츠 컨테이너 
    const rightSide = document.createElement('div');
    const writerAndDate = document.createElement('div');
    //             작성자 
    const writerSpan = document.createElement('span');
    const writerAnchor = document.createElement('a');
    //             업로드•수정일자 
    const writerDate = document.createElement('span');
    //         댓글 내용 
    const contentWrapper = document.createElement('div');
    const content = document.createElement('p');
    //         버튼
    const commentDeleteButton = document.createElement('button');

    const commentId = data[i].commentId;
    const memberUsername = data[i].memberUsername;
    const commentContent = data[i].commentContent;
    const memberImage = data[i].memberImage;
    const cUploadDate = data[i].cuploadDate;
    const commentMemberId = data[i].memberId;

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
    writerAnchor.href = `/member/${commentMemberId}`; // commentMemberId used.
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

    if (commentMemberId != userId) {
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
