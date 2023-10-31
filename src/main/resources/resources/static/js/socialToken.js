// const kakaoButton = document.querySelector('#kakao-button');
// kakaoButton.addEventListener('click', setToken);

function setToken() {

  alert('where?')

  const select = document.querySelector('pre').textContent;
  const select1 = select.substring(13);
  const select2 = select1.slice(0, -1);

  console.log(select2);

  sessionStorage.setItem("jwtToken", select2);

  console.log(sessionStorage.jwtToken);

  window.location.replace('/');
}