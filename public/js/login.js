
$(document).ready(function(){
    $("#adminlogin").click(function(){
      
        var a = $("#email1").val();
        var b = $("#pwd1").val();
        $.ajax({
        url:'/adminloginvalid',
        type:'post',
        data:{email1:a,pass1:b},
        success:function(result)
        {
            if(result==false){
                alert("invalid credentials.Please input Valid one.");
            }
            else{
                window.location.href="/user";
            }
        }
        });
    });
    $("#booknow").click(function(){
      
        var a = $("#email").val();
        var b = $("#datepicker").val();
        var c = $("#datepicker1").val();
        var d = $("#adults").val();
        var e= $("#children").val();
        var f = $("#contact").val();
        $.ajax({
        url:'/book1',
        type:'post',
        data:{email:a,datepicker:b,datepicker1:c,adults:d,children:e,contact:f},
        success:function(result)
        {
            if(result==false){
                alert("Something went wrong.");
            }
            else{
                alert("Room Booked Successfully.");
            }
        }
        });
    });
});