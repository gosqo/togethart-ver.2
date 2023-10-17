

// 1. 이메일 입력창 정보 가져오기
let elInputEmail = document.querySelector('#memberEmail'); // input#username
// 2. 메시지 정보 가져오기 (이메일은 필수 입력 입니다.)
let LoginEmailMesasage = document.querySelector('.Login-email'); // div.strongPassword-message.hide


// 1. 비밀번호 입력창 정보 가져오기
let elInputPassword = document.querySelector('#memberPwd'); // input#password
//2. 메세지 정보 가져오기
let PasswordMesasage = document.querySelector('.Login-password'); // div.mismatch-message.hide


elInputEmail.onkeyup = function () {

if(elInputEmail.value.length !== 0){

  LoginEmailMesasage.classList.remove('hide');

}

}

elInputPassword.onkeyup = function () {

  if(elInputEmail.value.length !== 0){
  
    PasswordMesasage.classList.remove('hide');
  
  }
  
  }

//------------------------------------alert 창 ------------------------------------------//
function loginChk() {
  if(!elInputEmail.value){
      alert('이메일을 입력해주세요.');
      elInputEmail.focus();
       return;
      }


   if(!elInputPassword.value){
      alert('비밀번호를 입력해주세요.');
      elInputPassword.focus();
      return;
     }

   }


const form = document.querySelector('#form');
form.addEventListener('submit', handleFormSubmit);

async function handleFormSubmit(event) {

  event.preventDefault();

  const form = event.currentTarget;
  const url = '/login';

  try {

    const formData = new FormData(form);
    const responseData = await postFormDataAsJson({ url, formData });

  } catch (error) {
    console.error(error);
  }
}

async function postFormDataAsJson({ url, formData }) {
  const plainFormData = Object.fromEntries(formData.entries());
  const formDataJsonString = JSON.stringify(plainFormData);
  // console.log(formDataJsonString + ' postFormDataAsJson() formDataJsonString');

  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      
    },
    body: formDataJsonString,
  };

  // fetch 했을때, 백엔드 api 에서 응담상태에 따라 바디에 담는 타입이 Map, String 으로 각각 다른 경우의 처리 방법 필요.


  fetch(url, fetchOptions)
    .then((response) =>
      response.json()
      
    )
    .then((response) => {
      console.log(response.status);
      if (response.jwtToken) {
        sessionStorage.setItem('jwtToken', response.jwtToken);
        console.log(sessionStorage);
        alert('로그인 성공, 메인 페이지로 향합니다.');
        window.location.replace('/');
      } else {
        alert('요청하신 정보와 일치하는 계정이 존재하지 않습니다. Email 혹은 Password 를 확인 해주세요.');
        window.location.reload();
        
      }  
  })
    
  fetch(url, fetchOptions)
  .then((response) => {
    response.json()
    if(response.status === 401){
      alert('이메일 또는 비밀번호를 잘못 입력했습니다 입력하신 내용을 다시 확인 해주세요.')
    }
})

fetch(url, fetchOptions)
.then((response) => {
  response.json()
  if(response.status === 500){
    alert('이메일 또는 비밀번호를 잘못 입력했습니다 입력하신 내용을 다시 확인 해주세요.')
  }
})





}

  // fetch(url, fetchOptions)
  //   .then((response) => {
  //     response.json()
  //   })
  //   .then((response) => {
  //     console.log(response.jwtToken);
  //   })



  // alert('요청하신 정보와 일치하는 계정이 존재하지 않습니다. Email 혹은 Password 를 확인 해주세요.');
  // window.location.reload();

  // .catch(error => alert(error))
