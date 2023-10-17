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
  const url = '/remove';
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

      alert('정보가 삭제 되었습니다.')
      
      window.location.replace('/login');

    }else{

      alert('비밀번호가 올바르지 않습니다. 다시 입력 해주세요')

      window.location.reload();

    }
  })  
}