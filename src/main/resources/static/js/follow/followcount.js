document.addEventListener("DOMContentLoaded", function () {

  const currentURL = window.location.href;
  const urlParams = new URLSearchParams(currentURL);
  const memberId = urlParams.get("memberId");


  if (memberId) {
    // 나를 팔로우 한 사람들의 수 가져오기
    fetch("/follow/followToCount/" + memberId)
      .then((response) => response.json())
      .then((count) => {
        const countFollowTo = document.getElementById("count-follow-to");
        countFollowTo.textContent = count;
        console.log(count);
      })
      .catch((error) => {
        console.error("오류 발생:", error);
      });

    // 내가 팔로우 한 사람들의 수 가져오기
    fetch("/follow/followFromCount/" + memberId)
      .then((response) => response.json())
      .then((count) => {
        const countFollowFrom = document.getElementById("count-follow-from");
        countFollowFrom.textContent = count;
        console.log(count);
      })
      .catch((error) => {
        console.error("오류 발생:", error);
      });
  }
});
