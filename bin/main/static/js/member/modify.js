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



// //파일업로드 팝업창
// function openNidPopup() {
//   var _width = '800';
//   var _height = '400';
//   var _left = Math.ceil(( window.screen.width - _width )/2);
//   var _top = Math.ceil(( window.screen.height - _height )/2);

//   // 팝업창 생성
//   const popup = window.open('', '파일업로드', 'width='+ _width +', height='+ _height +', left=' + _left + ', top='+ _top );

//   const html = `
//   <html lang="en">
// <head>
//   <title>파일업로드</title>
// </head>
// <body>
// <div style="display:flex; justify-content:center; align-items:center; flex-direction:column;">
//   <h2>프로필 이미지 변경</h2>
//   <div class="form-group">
//       <label for="email" class="form-label mt-4" enctype="multipart/form-data">이미지</label>
//     <input type="file" id="memberImage2" name="memberImage2" accept='image/*'/>
//     <img id="previewImg" width="150" alt="이미지 영역"/>
//   <br>
//   <button class="btn btn-success" id="submit-btn" style="width:100%; margin-top:28px;" background-color: #294ba1; color: white; border: none; border-radius: 5px;">변경</button>
// </div>
// <script>

// const fileInput = document.getElementById("memberImage2");

// const handleFiles = (e) => {
//   const selectedFile = [...fileInput.files];
//   const fileReader = new FileReader();

//   fileReader.readAsDataURL(selectedFile[0]);

//   fileReader.onload = function () {
//     document.getElementById("previewImg").src = fileReader.result;
//   };
// };

// fileInput.addEventListener("change", handleFiles);

// document.getElementById("submit-btn").addEventListener("click", function() {

  



// window.close();
// });
// </script>
// </body>
// </html>
// `;

//   popup.document.write(html);
//   // 팝업창 스타일 지정
//   popup.document.body.style.backgroundColor = '#f5f5f5'; // 배경색 지정
// }
//      31~89 팝업메소드

const fileInput = document.getElementById("memberImage");

const handleFiles = (e) => {
  const selectedFile = [...fileInput.files];
  const fileReader = new FileReader();

  fileReader.readAsDataURL(selectedFile[0]);

  fileReader.onload = function () {
    document.getElementById("previewImg").src = fileReader.result;
  };
};

fileInput.addEventListener("change", handleFiles);



const jwtToken = sessionStorage.getItem("jwtToken");

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
var Username = decodedJWT.Username;

document.querySelector("#memberEmail").value = memberEmail
document.querySelector("#Username").value = Username

document.querySelector("#previewImg")

// function handleFormSubmit() {
  
//   var formData = new FormData();
//   var fileInput = document.querySelector("#memberImage");
//   var file = fileInput.files[0];
//   formData.append('memberImage', file);
//   var data = {
//       memberId: memberId,
//       memberPwd: $("input[name='memberEmail']").val(),
//       Username: $("input[name='Username']").val()
//   };

//   formData.append('memberUpdateRequest', new Blob([JSON.stringify(data)], { type: 'application/json' }));
//   console.log(formData);
//   $.ajax({
//       type: 'POST',
//       url: '/profile/modify',
//       data: formData,
//       processData: false,
//       contentType: false,
//       success: function() {
//           alert('회원정보가 수정되었습니다.');
//           location.reload();
//       },
//       error: function(jqXHR, textStatus, errorThrown) {
//           console.log(textStatus + ': ' + errorThrown);
//       }
//   });
// }



async function handleFormSubmit(event) {

  event.preventDefault();
  console.log(event);

  const form = event.currentTarget;
  const url = `/uploadFile2`;


  try {
      const formData = new FormData(form);
      const ResponseData = await postFormDataAsJson({ url, formData });
      // const fileResponse = await postFile({ fileUrl, formData });
  } catch (error) {
      console.error(error);
  }

}

async function postFormDataAsJson({ url, formData }) {
  // const plainFormData = Object.fromEntries(formData.entries());
  // const memberIntro = plainFormData.memberIntro;
  // const memberImage = plainFormData.memberimage;

  // const customBody = {

  //     "memberId": memberId,
  //     "Username": Username,
  //     "memberEmail" : memberEmail,
  //     "memberIntro" : `${memberIntro}`,
  //     "memberImage" : `${memberImage}`
  // };

  // console.log(customBody)

  const fetchOptions = {
      method: 'POST',
      headers: {
         // 'Content-Type': 'application/json',
         // 'Accept': 'application/json',
      },
      body: formData
  };

  console.log(fetchOptions);

  fetch(url, fetchOptions)
      .then(response => {
        console.log(response.status)
      if(response.status == 200) {

        alert('수정완료');
        window.location.replace("/");
      } else {

        alert('수정실패');
      }
      
      })

      .catch(e => console.error(e));

};

// 174~238 최신쓰는버전 


// async function handleFormSubmit(event) {

//   event.preventDefault();
//   console.log(event);

//   const form = event.currentTarget;
//   const url = `/profile/modify`;
//   const fileUrl = '/uploadFile2'

//   try {

//       const formData = new FormData(form);
//       const ResponseData = await postFormDataAsJson({ url, formData });
//       // const fileResponse = await postFile({ fileUrl, formData });
      

//   } catch (error) {
//       console.error(error);
//   }

// }

// async function postFormDataAsJson({ url, formData }) {
//   const plainFormData = Object.fromEntries(formData.entries());
//   const memberIntro = plainFormData.memberIntro;
//   const customBody = {
//       "memberEmail": memberEmail,
//       "memberUsername": Username,
//       "memberIntro" :`${memberIntro}`
//   };

//   console.log(customBody)


//   const fetchOptions = {
//       method: 'POST',
//       headers: {
//           'Content-Type': 'application/json',
//           'Accept': 'application/json',
//       },
//       body: JSON.stringify(customBody),
//   };

//   console.log(fetchOptions);


//   fetch(url, fetchOptions)
//       .then(response => console.log(response.status))
//       .then(() => postFile({ formData }))
//       .catch(e => console.error(e));

// }


//241~292 작업한내용


// async function postFile({ formData }) {

//   const fileUrl = '/uploadFile2';
//   const fetchOptions = {
//       method: 'POST',
//       headers: {
//           // 'Content-Type': 'multipart/form-data'
//       },
//       body: formData
//   };

//   fetch(fileUrl, fetchOptions)
//       .then(response => {
//           if (response.status === 200) {
//               alert('작품을 업로드 했습니다.')
//               window.location.replace("/");
//           } else {
//               alert('작품을 업로드하지 못했습니다. 다시 시도해 주세요.')
//           }
//       })
//       .catch(e => console.error(e));
// }






















// async function handleFormSubmit(event) {
  
//   event.preventDefault();
//   const form = event.currentTarget;
//   const url = '/profile/modify';
//   try {

//     const formData = new FormData(form);
//     const responseData = await postFormDataAsJson({url, formData});

//     console.log({responseData});
    
//   } catch(error) {

//     console.error(error);

//   }
// }

// async function postFormDataAsJson({url, formData}) {
//   const plainFormData = Object.fromEntries(formData.entries());
//   const memberImage = plainFormData.memberImage;

//   console.log(memberImage);
 
//   const fetchOptions = {
//     method: 'POST',
//     headers: {
//       Accept: "application/json",
//      'Content-Type': 'application/json'  
//      //'Content-type' : 'multipart/form-data'
//     },
//     body: formData

//   };

//   fetch(url, fetchOptions)
//   .then(response => {
//     if(response.ok){

//       alert('정보가 변경되었습니다.')
    
//       window.location.replace(`/member/${memberId}`);
//     }else{

//       alert('다시 입력 해주세요')
//       window.location.reload();

//     }
//   })


// }