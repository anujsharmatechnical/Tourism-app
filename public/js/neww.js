
$(document).ready(function(){
    $("#email1").change(function(){
        var a =$("#email1").val();
        $.ajax({
            url:'/email',
            type:'post',
            data:{r:a},
            success:function(result)
            {
                if(result==false){$("#warn").html("Email already exists");}
                else if(result==true){$("#warn").html("");}
            }
        });
    });

    $("#loginbtn").click(function(){
       var a = $("#email").val();
       var b = $("#pwd").val();
       
       $.ajax({
        url:'/loginvalid',
        type:'post',
        data:{email:a,pass:b},
        success:function(result)
        {
            if(result==false){
               alert("Invalid credentials.Please Enter Valid one.");
            }
            else{var c=$("#id").val();
                window.location.href="/bookingForm?id="+c;
            }
        }
    });
    });
    
});

 