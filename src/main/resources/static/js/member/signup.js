var xhr = new XMLHttpRequest();
function checkEmail(){
  let data=document.getElementById('memberUsername');
  xhr.open('POST','http://localhost:8080/check/memberUsername',true);
  xhr.setRequestHeader("Content-Type",'application/x-www-form-urlencoded');
  xhr.send("memberUsername="+data.value);
  xhr.onload=function(){
    if(xhr.status==200){

      let color,message;

      console.log(xhr.response);
      if(xhr.response=='true'){
        color = '#34fc0d';
        message = '사용 가능 한 이메일 입니다.';
      }else {
        color = 'yellow';
        message = '이미 사용중인 이메일 입니다.';

      }
      data.style.backgroundColor = color;
      return;
    }
    alert('에러발생');
  }
}

var xhr = new XMLHttpRequest();
function checkusername(){
  let data=document.getElementById('memberEmail');
  xhr.open('POST','http://localhost:8080/check/memberEmail',true);
  xhr.setRequestHeader("Content-Type",'application/x-www-form-urlencoded');
  xhr.send("memberEmail="+data.value);
  xhr.onload=function(){
    if(xhr.status==200){

      let color,message;

      console.log(xhr.response);
      if(xhr.response=='true'){
        color = '#34fc0d';
        message = '사용 가능한 닉네임';
      }else {
        color = 'yellow';
        message = '이미 사용중인 닉네임';

      }
      data.style.backgroundColor = color;
      return;
    }
    alert('에러발생');
  }
}

// 1. 비밀번호 입력창 정보 가져오기
let elInputPassword = document.querySelector('#memberPwd'); // input#password
// 2. 비밀번호 확인 입력창 정보 가져오기
let elInputPasswordRetype = document.querySelector('#memberPwd2'); // input#password-retype
// 3. 실패 메시지 정보 가져오기 (비밀번호 불일치)
let elMismatchMessage = document.querySelector('.mismatch-message'); // div.mismatch-message.hide
// 4. 실패 메시지 정보 가져오기 (8글자 이상, 영문, 숫자, 특수문자 미사용)
let elStrongPasswordMessage = document.querySelector('.strongPassword-message'); // div.strongPassword-message.hide

// 5. 성공 메시지 정보 가져오기
let elSuccessPwdMessage = document.querySelector('.success-pwdmessage'); // div.success-message.hide
let elSuccessPwd2Message = document.querySelector('.success-pwd2message'); // div.success-message.hide


// 1. 닉네임 입력창 정보 가져오기
let elInputUsername = document.querySelector('#memberUsername'); // input#username
// 2. 실패 메시지 정보 가져오기 (글자수 제한 4~12글자 + 영어 숫자 한글만 가능)
let elFailureMessage = document.querySelector('.failure-message'); // div.failure-message.hide
// 3. 성공 메시지 정보
let elSuccessMessage = document.querySelector('.success-message'); // div.success-message.hide
// 4. 성공 메시지 정보2
let elSuccessMessage2 = document.querySelector('.success-message2'); // div.success-message.hide


// 1. 이메일 입력창 정보 가져오기
let elInputEmail = document.querySelector('#memberEmail'); // input#username
// 2. 실패 메시지 정보 가져오기 (이메일 형식이 안맞음)
let elEmailfailMesasage = document.querySelector('.fail-emailmessage'); // div.strongPassword-message.hide
// 3. 성공 메시지 정보 
let elEmailSuccessMessage = document.querySelector('.Emailsuccess-message'); // div.success-message.hide
// 4. 성공 메시지 정보2
let elEmailSuccessMessage2 = document.querySelector('.Emailsuccess-message2'); // div.success-message.hide


//-----------------유효성 검사 정규식 -----------------------------------------//

function idLength(value) {
  return value.length >= 4 && value.length <= 12
}
function usernamecheck(str) {
  return /^[a-zA-Z0-9가-힣]{4,12}$/.test(str);
}

function emailcheck2(str) {
  return /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/.test(str);
}


function strongPassword (str) {
  return /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/.test(str);
}

function isMatch (password1, password2) {
  return password1 === password2;
}

//------------------- 닉네임 글자 ------------------------------------//

elInputUsername.onkeyup = function () {

  // console.log(elInputPassword.value);
  // 값을 입력한 경우
  if (elInputUsername.value.length !== 0) {

    if(usernamecheck(elInputUsername.value)=== false) {
      elFailureMessage.classList.remove('hide'); 
    }
    else {
      elSuccessMessage.classList.remove('hide');
      elSuccessMessage2.classList.remove('hide');
      elFailureMessage.classList.add('hide'); 
    }
  }
  // 값을 입력하지 않은 경우 (지웠을 때)
  // 모든 메시지를 가린다.
  else {
    elFailureMessage.classList.add('hide');
  }
};
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


//------------------------ 이메일 -------------------------------------------------//
elInputEmail.onkeyup = function () {

  // console.log(elInputPassword.value);
  // 값을 입력한 경우
  if (elInputEmail.value.length !== 0) {
    // X 
    if(emailcheck2(elInputEmail.value)=== false) {
      elEmailfailMesasage.classList.remove('hide'); 
    }
    // O 
    else {
      elEmailSuccessMessage.classList.remove('hide');
      elEmailSuccessMessage2.classList.remove('hide');
      elEmailfailMesasage.classList.add('hide'); 
    }
  }
  // 값을 입력하지 않은 경우 (지웠을 때)
  // 모든 메시지를 가린다.
  else {
    elEmailfailMesasage.classList.add('hide');
  }
};
//----------------------------비밀번호 확인 ----------------------------------------//

elInputPasswordRetype.onkeyup = function () {

  // console.log(elInputPasswordRetype.value);
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


//------------------------------------------------alert창 ------------------------------------------------//
//joinform_check 함수로 유효성 검사
function joinform_check() {
  
  var memberEmail = document.getElementById("memberEmail");
  var memberPwd = document.getElementById("memberPwd");
  var memberPwd2 = document.getElementById("memberPwd2");
  var memberUsername = document.getElementById("memberUsername");


  var emailcheck = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

  var usernamechck = /^[a-zA-Z0-9]{4,12}$/;

  //비밀번호 영문자+숫자+특수조합(8~25자리 입력)
  var memberPwdcheck = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;


  if (memberEmail.value == "") { 
    alert("이메일을 입력하세요.");
    memberEmail.focus(); 
    return false; 
  };

  if (!emailcheck.test(memberEmail.value)) {
    alert("올바르지 않은 이메일 형식입니다.");
    memberPwd.focus();
    return false;
  }; 


  if (memberPwd.value == "") {
    alert("비밀번호를 입력하세요.");
    memberPwd.focus();
    return false;
  };

  if (!memberPwdcheck.test(memberPwd.value)) {
    alert("비밀번호는 영문자+숫자+특수문자 조합으로 8~25자리 사용해야 합니다.");
    memberPwd.focus();
    return false;
  }


  if (memberPwd2.value !== memberPwd.value) {
    alert("비밀번호가 일치하지 않습니다.");
    memberPwd.focus();
    return false;
  };

  if (memberUsername.value == "") {
    alert("유저네임을 입력하세요.");
    memberUsername.focus();
    return false;
  };

  if (!usernamechck.test(memberUsername.value)) {
    alert("닉네임은 4~12자의 영문 대소문자와 숫자로만 입력.");
    memberPwd.focus();
    return false;
  }; 

  //입력 값 전송

  document.join_form.submit(); //유효성 검사의 포인트   
}

//------------------------------------------------------------------------------------------------------------//

const form = document.querySelector('#form');
form.addEventListener('submit', handleFormSubmit);
async function handleFormSubmit(event) {

  event.preventDefault();
  

  const form = event.currentTarget;
  const url = '/signup';

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
      'Content-Type': 'application/json',
      Accept: 'application.json',
    },
    body: formDataJsonString,
  };

  fetch(url, fetchOptions)
  .then(response => {
    if (response.ok) {
      alert('가입을 축하드립니다. 로그인 페이지로 향합니다.');
      window.location.replace('/login');
      
    } else {
      alert('회원가입에 실패했습니다. 필수 항목을 기입해주시기 바랍니다.') ;
    }
  })
  .catch(error => console.log(error));
}
