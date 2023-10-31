const form = document.querySelector('#form'); //
form.addEventListener('submit', handleFormSubmit);  //작동함수

//form 데이터 한세트 

async function handleFormSubmit(event) {

  event.preventDefault();

  const form = event.currentTarget;
  const url = '/check/findPw';

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

   
                   
    .then((result) => {  

      console.log(result);

      if (result.ok != true) {

        alert('요청하신 정보와 일치하는 유저네임과 이메일이 존재하지 않습니다. 유저네임과 이메일을 확인 해주세요.');
        window.location.reload();

      } else {
        alert('등록하신 이메일로 임시 비밀번호를 전송했습니다 이메일 확인 해주세요.')
        window.location.replace('/');

      }
  })


}
