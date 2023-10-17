// // 이미지 입력 필드와 프로필 이미지 엘리먼트 가져오기
// const imageInput = document.getElementById('image-input');
// const profileImg = document.getElementById('profile-img');

// // 이미지 입력 필드에 변화가 생겼을 때 이벤트 처리하기
// imageInput.addEventListener('change', function(event) {
//     const file = event.target.files[0]; // 업로드된 파일 가져오기
//     const reader = new FileReader(); // 파일 리더 생성

//     // 파일 리더가 이미지를 읽으면 이벤트 처리하기
//     reader.addEventListener('load', function() {
//         profileImg.src = reader.result; // 프로필 이미지 엘리먼트에 이미지 소스 설정하기
//         localStorage.setItem('profileImage', reader.result); // 이미지 데이터를 Local Storage에 저장하기
//     });

//     // 파일 리더로 이미지 읽기
//     reader.readAsDataURL(file);
// });

// // 페이지 로드 시 Local Storage에서 프로필 이미지 가져오기
// window.addEventListener('load', function() {
//     const savedImage = localStorage.getItem('profileImage');

//     if (savedImage) {
//         profileImg.src = savedImage;
//     }
// });

const form = document.querySelector('#form');
form.addEventListener('submit', handleFormSubmit);

sessionStorage.jwtToken
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
  
var memberEmail = decodedJWT.memberEmail;
        console.log(memberEmail);
var memberId = decodedJWT.memberId;

document.querySelector("#memberEmail").value = memberEmail



async function handleFormSubmit(event) {
  
  event.preventDefault();
  const form = event.currentTarget;
  const url = '/profile/modify';
  try {

    const formData = new FormData(form);
    const responseData = await postFormDataAsJson({url, formData});

    console.log({responseData});
    
  } catch(error) {
    console.error(error);
  }
}
async function postFormDataAsJson({url, formData}) {
  const plainFormData = Object.fromEntries(formData.entries());
  const formDataJsonString = JSON.stringify(plainFormData);

  console.log(formDataJsonString);

  const fetchOptions = {
    method: 'POST',
    headers: {
        Accept: "application/json",
      'Content-Type': 'application/json' 
    },
    body: formDataJsonString,
  };

  fetch(url, fetchOptions)

  .then(response => {
    if(response.ok){

      alert('정보가 변경되었습니다.')
      
      window.location.replace(`/member/${memberId}`);
    }else{

      alert('다시 입력 해주세요')
      window.location.reload();

    }
  })  
}