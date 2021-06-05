//Hotel1 Room fetching location based
$(document).ready(function()
{
    $("#btn1").click(function(){
        var a= $('#location').val();
        
        $.ajax({
            url:'/ajax',
            type:'post',
            data:{r:a},
            success:function(res){
                console.log(res);
                var output='<div class="row">';
               res.forEach(element => {
                   output+='<div class="col-md-2"></div><div class="col-md-10" style="padding:10px 5px"><div class="col-md-4"><img class="img-responsive" style="height:295px;width:500px;" src="images/'+element.img+'"/></div><div class="col-md-6"><p class="para" style="margin-top:30px;font-size:19px"><b style="font-size:25px;"> '
                  + element.name+
                  '</b>'+ '<br/>'+ element.address+'<br/> '+element.price+'<br>'+
                                              element.roomtype+'<br/><b><a href="/login?id='+element._id+'"><br/><br/><button class="btn btn-info">Book Now</button></a></b>'+
                                           '</div></div>';
                   
               }); 
               output+="</div>";
               console.log(output);
               $('#res').html(output);
            }
        })
    })
})