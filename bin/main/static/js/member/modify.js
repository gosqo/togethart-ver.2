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
      if(response.status ==200) {

        alert('수정완료');
        window.location.replace("/");
      } else {

        alert('수정실패');
      }
      
      })

      .catch(e => console.error(e));

};



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