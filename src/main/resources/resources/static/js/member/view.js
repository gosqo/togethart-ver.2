
    function sendNumber(){
        $("#mail_number").css("display","block");
        $.ajax({
            url:"/mail",
            type:"post",
            dataType:"json",
            data:{"mail" : $("#mail").val()},
            success: function(data){
                alert("인증번호 발송");
                $("#Confirm").attr("value",data);
            }
        });
    }

    function confirmNumber(){
        var number1 = $("#number").val();
        var number2 = $("#Confirm").val();

        if(number1 == number2){
            alert("인증되었습니다.");
        }else{
            alert("번호가 다릅니다.");
        }
    }
