// 1. 비밀번호 입력창 정보 가져오기
let elInputPassword = document.querySelector('#newPwd'); // input#password
// 2. 비밀번호 확인 입력창 정보 가져오기
let elInputPasswordRetype = document.querySelector('#newPwdCheck'); // input#password-retype
// 3. 실패 메시지 정보 가져오기 (비밀번호 불일치)
let elMismatchMessage = document.querySelector('.mismatch-message'); // div.mismatch-message.hide
// 4. 실패 메시지 정보 가져오기 (8글자 이상, 영문, 숫자, 특수문자 미사용)
let elStrongPasswordMessage = document.querySelector('.strongPassword-message'); // div.strongPassword-message.hide
// 5. 성공 메시지 정보 가져오기
let elSuccessPwdMessage = document.querySelector('.success-pwdmessage'); // div.success-message.hide
let elSuccessPwd2Message = document.querySelector('.success-pwd2message'); // div.success-message.hide

function isMatch (password1, password2) {
  return password1 === password2;
}

function strongPassword (str) {
  return /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/.test(str);
}

//------------------------- 비밀번호  -----------------------------------------//

elInputPassword.onkeyup = function () {

  // console.log(elInputPassword.value);
  // 값을 입력한 경우
  if (elInputPassword.value.length !== 0) {
    if(strongPassword(elInputPassword.value) === false) {
      elSuccessPwdMessage.classList.add('hide')
      elStrongPasswordMessage.classList.remove('hide'); 
    }
    else {
      elSuccessPwdMessage.classList.remove('hide')
      elStrongPasswordMessage.classList.add('hide'); 
    }
  }
  // 값을 입력하지 않은 경우 (지웠을 때)
  // 모든 메시지를 가린다.
  else {
    elStrongPasswordMessage.classList.add('hide');
    elSuccessPwdMessage.classList.add('hide')
  }
};

//----------------------------비밀번호 확인 ----------------------------------------//

elInputPasswordRetype.onkeyup = function () {

  if (elInputPasswordRetype.value.length !== 0) {
    if(isMatch(elInputPassword.value, elInputPasswordRetype.value) === false) {

      elSuccessPwd2Message.classList.add('hide');
      elMismatchMessage.classList.remove('hide'); 
    }
    else {
      elSuccessPwd2Message.classList.remove('hide');
      elMismatchMessage.classList.add('hide'); // 실패 메시지가 보여야 함
    }
  }
  else {
    elSuccessPwd2Message.classList.add('hide');
    elMismatchMessage.classList.add('hide'); // 실패 메시지가 가려져야 함
  }
};

//----------------------------------------------------------------------------------------//
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
        console.log(memberEmail)

document.querySelector("#memberEmail").value = memberEmail


async function handleFormSubmit(event) {
  
  event.preventDefault();
  const form = event.currentTarget;
  const url = '/profile/update';
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

      alert('정보가 변경되었습니다. 다시 로그인 해주세요.')
      
      window.location.replace('/login');
    }else{

      alert('비밀번호가 올바르지 않습니다. 다시 입력 해주세요')
      window.location.reload();

    }
  })  
}