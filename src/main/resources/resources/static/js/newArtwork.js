document.addEventListener("DOMContentLoaded", function() {
    artworkScopeDisplay();
})


// // 파일 입력(input type="file) 요소와 미리보기 이미지 요소를 가져옵니다.
// const fileInput = document.getElementById('file-input');
// const imagePreview = document.getElementById('imagePreview');
// const previewImage = document.getElementById('preview');

// // 파일 선택 시 미리보기 함수를 설정합니다.
// fileInput.addEventListener('change', function () {
//     const file = fileInput.files[0];

//     if (file) {
//         const reader = new FileReader();

//         // 파일을 읽어와서 미리보기 이미지에 표시합니다.
//         reader.onload = function (e) {
//             previewImage.src = e.target.result;
//             imagePreview.style.display = 'block'; // 미리보기 영역을 표시합니다.
//         };

//         reader.readAsDataURL(file);
//     } else {
//         // 파일이 선택되지 않았을 때, 미리보기 이미지를 숨깁니다.
//         imagePreview.style.display = 'none';
//     }
// });

// 토큰에서 유저네임 추출
const token = sessionStorage.getItem('jwtToken')?.replace('Bearer ', '');
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

const memberId = decodedJWT.memberId;
const memberUsername = decodedJWT.Username;
console.log(token);
console.log(memberUsername);


const form = document.querySelector('#new-artwork-form');
form.addEventListener('submit', handleSubmit);

async function handleSubmit(event) {

    event.preventDefault();
    console.log(event);

    const form = event.currentTarget;
    const url = `/newArtwork`;
    const fileUrl = '/uploadFile'

    try {

        const formData = new FormData(form);
        const ResponseData = await postFormDataAsJson({ url, formData });
        // const fileResponse = await postFile({ fileUrl, formData });
        

    } catch (error) {
        console.error(error);
    }

}

async function postFormDataAsJson({ url, formData }) {
    const plainFormData = Object.fromEntries(formData.entries());
    const artworkTitle = plainFormData.artworkTitle;
    const artworkDescription = plainFormData.artworkDescription;
    const artworkScope = parseInt(plainFormData.artworkScope ? plainFormData.artworkScope : 0);
    console.log(artworkTitle);

    const customBody = {
        "memberId": memberId,
        "memberUsername": `${memberUsername}`,
        "artworkTitle": `${artworkTitle}`,
        "artworkDescription": `${artworkDescription}`,
        "artworkScope": artworkScope
    };

    console.log(customBody)


    const fetchOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(customBody),
    };

    console.log(fetchOptions);


    fetch(url, fetchOptions)
        .then(response => console.log(response.status))
        .then(() => postFile({ formData }))
        .catch(e => console.error(e));

}

// async function postFile({ fileUrl, formData }) {
//     formData.append('file', document.querySelector('#file-input').files[0])

//     const fetchOptions = {
//         method: 'POST',
//         headers: {
//             // 'Content-Type': 'multipart/form-data'
//         },
//         body: formData
//     };

//     fetch(fileUrl, fetchOptions)
//         .then(response => {
//             if (response.status === 200) {
//                 alert('작품을 업로드 했습니다.')
//                 window.location.replace("/");
//             } else {
//                 alert('작품을 업로드하지 못했습니다. 다시 시도해 주세요.')
//             }
//         })
//         .catch(e => console.error(e));
// }

async function postFile({ formData }) {
    formData.append('file', document.querySelector('#file-input').files[0])

    const fileUrl = '/uploadFile';
    const fetchOptions = {
        method: 'POST',
        headers: {
            // 'Content-Type': 'multipart/form-data'
        },
        body: formData
    };

    fetch(fileUrl, fetchOptions)
        .then(response => {
            if (response.status === 200) {
                alert('작품을 업로드 했습니다.')
                window.location.replace("/");
            } else {
                alert('작품을 업로드하지 못했습니다. 다시 시도해 주세요.')
            }
        })
        .catch(e => console.error(e));
}

const artworkScope = document.querySelector('#artwrok-scope');

function artworkScopeDisplay() {
    fetch("/sub/AuthStatus/" + memberId)
        .then((response) => response.json())
        .then((data) => {
            if (data === 0) {
                console.log(data + ' Auth')
                document.querySelector('#artwrok-scope').style.display = 'none';
            }
        })
}
