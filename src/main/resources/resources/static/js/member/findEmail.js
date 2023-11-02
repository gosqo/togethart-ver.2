// 1. 닉네임 입력창 정보 가져오기
let memberUsername = document.querySelector('#memberUsername'); 
// 2. 확인할 정보가져오기
let memberUsername2 = document.querySelector('#memberUsername2');
// 2. 성공
let UsernameMesasage = document.querySelector('.Username-s'); 
//3. 실패
let UsernameMesasage2 = document.querySelector('Username-f'); 

function isMatch (password1, password2) {
  return password1 === password2;
}



memberUsername2.onkeyup = function () {

  // console.log(elInputPasswordRetype.value);
  if (memberUsername2.value.length !== 0) {
    if(isMatch(memberUsername.value, memberUsername2.value) === false) {

      UsernameMesasage.classList.add('hide');
      UsernameMesasage2.classList.remove('hide'); 
    }
    else {
      UsernameMesasage.classList.remove('hide');
      UsernameMesasage2.classList.add('hide'); // 실패 메시지가 보여야 함
    }
  }
  else {
    UsernameMesasage.classList.add('hide');
    UsernameMesasage2.classList.add('hide'); // 실패 메시지가 가려져야 함
  }
};


//------------------------------------alert 창 ------------------------------------------//
function findeEmailcheck() {
  if(!memberUsername.value){
      alert('닉네임을 입력 해 주세요.');
      memberUsername.focus();
       return;
      }
   }

const form = document.querySelector('#form');
form.addEventListener('submit', handleFormSubmit);


async function handleFormSubmit(event) {

  event.preventDefault();

  const form = event.currentTarget;
  const url = '/login/findEmail';

  try {

    const formData = new FormData(form);
    const responseData = await postFormDataAsJson({ url, formData });

  } catch (error) {
    console.error(error);
  }
}

async function postFormDataAsJson({ url, formData }) {

  const plainFormData = Object.fromEntries(formData.entries());

  const formDataJsonString = JSON.stringify(plainFormData);        //html / form 데이터 불러오는거
  // console.log(formDataJsonString + ' postFormDataAsJson() formDataJsonString');

  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: formDataJsonString,
  };

  fetch(url, fetchOptions)  
  
  
    .then((response) =>
      response.json()
    )

 //받아온값을 문자열온거를 json형태 바꿔주겠다
 
    .then((response) => {

        console.log(response);

      if (response != false) {

        alert('현재 사용자 Email 은 ' + response + '입니다.')

        window.location.replace('/');

      } else {

        alert('요청하신 정보와 일치하는 유저네임이 존재하지 않습니다. 유저네임을 확인 해주세요.');

        window.location.reload();
      }
  })

}
