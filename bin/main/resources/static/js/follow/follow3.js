document.addEventListener("DOMContentLoaded", function () {
  const token = sessionStorage.getItem("jwtToken")?.replace("Bearer ", "");
  // console.log(token);
  var followButton = document.getElementById("follow-button");
  if (!token) {
    followButton.style.display = "none";
    followButton.textContent = "";
    return;
  }

  // 토큰이 존재하면 해독하여 memberId를 추출
  if (token) {
    const base64Payload = token.split(".")[1];
    const base64 = base64Payload.replace(/-/g, "+").replace(/_/g, "/");
    const decodedJWT = JSON.parse(
      decodeURIComponent(
        window
          .atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      )
    );

    var isFollowing = false;
    var followFrom = decodedJWT.memberId; // 나
    var followTo = document.querySelector("#member-id").value; // 대상
    console.log(followFrom);
    console.log(followTo);

    updateFollowButton();

    followButton.addEventListener("click", function (event) {
      event.preventDefault();

      if (isFollowing) {
        // 현재 팔로우 중인 상태인 경우
        unfollowUser();
      } else {
        followUser();
      }
    });

    function updateFollowButton() {
      console.log(followFrom);
      // 1013 전유영
      if (followFrom == followTo) {
        followButton.style.display = "none";
        followButton.textContent = "";
        return;
      }

      // 1013 전유영
      fetch(
        `/follow/follow-check?followFrom=${followFrom}&followTo=${followTo}`
      )
        .then(function (response) {
          if (response.ok) {
            return response.json();
          } else {
            console.error("요청 실패");
          }
        })
        .then(function (data) {
          var isFollowExists = data.isFollowExists;

          // 팔로우 버튼 업데이트
          if (isFollowExists) {
            followButton.innerHTML = "언팔로우";
          } else {
            followButton.innerHTML = "팔로우";
          }

          isFollowing = isFollowExists;
        })
        .catch(function (error) {
          console.error("오류 발생:", error);
        });
    }

    // 팔로우
    function followUser() {
      var requestData = {
        followFrom: followFrom,
        followTo: followTo,
      };

      var confirmationFollow = window.confirm("팔로우 하시겠습니까?");
      if (confirmationFollow) {
        fetch("/follow/makefollow", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        })
          .then(function (response) {
            if (response.ok) {
              isFollowing = true;
              updateFollowButton();
              alert("팔로우를 시작합니다");
            } else {
              console.error("요청 실패");
            }
          })
          .catch(function (error) {
            console.error("오류 발생:", error);
          });
      }
    }

    // 언팔로우
    function unfollowUser() {
      var requestData = {
        followFrom: followFrom,
        followTo: followTo,
      };

      var confirmationUnFollow = window.confirm("언팔로우 하시겠습니까..?");
      if (confirmationUnFollow) {
        fetch("/follow/unfollow", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        })
          .then(function (response) {
            if (response.ok) {
              isFollowing = false;
              updateFollowButton();
              alert("팔로우가 취소됐습니다 ..");
            } else {
              console.error("요청 실패");
            }
          })
          .catch(function (error) {
            console.error("오류 발생:", error);
          });
      }
    }
  }
});
