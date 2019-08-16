$(function() {
  // 获取地址栏的设备名称key；
  var str = location.search;
  str = decodeURI(str);
  console.log(str);
  var str = str.slice(1)
  console.log(str);
  str = str.split('&');
  console.log(str);
   // 获取设备名称字段
  var code = str[0]
  console.log(code);
  var key = code.split('=');
  console.log(key);
  key = key[1];
  console.log(key);
  // 获取id
  var id = str[1];
  id=id.split('=');
  id = id[1];
  console.log(id);
  
  // 添加到页面
  $('.details .tv_name').html(key)
  
  // 点击跳转 账单管理 页面
  $(".mangement_bill").on("click", function() {
    location.href = "../html/billList.html?id="+id+"";
  });
  //点击跳转 银行卡管理 页面
  $(".mangement_card").on("click", function() {
    location.href = "../html/bankCard.html?id="+id+"";
  });


   // 点击弹出模态框
    $('.mangement_info').on('click',function() {
      var container = document.getElementById('div-container');
      container.style.display="block";
  })

     /*取消事件*/
   $('#cancleBtn').on('click',function() {
       var container = document.getElementById('div-container');
       container.style.display="none";
   })    

    /*确认事件，因为现在没有确认事件，就将弹出框隐藏*/
    $('#confrim').on('click',function() {
        // 点击发送请求
        var params = {
            'equipId':equipmentId,
            'token':token,
        }
        // $.ajax({
        //     type: 'post',
        //     // url: prexurl+'/iot/updateTokenStatus',
        //     dataType: 'json',
        //     contentType: "application/json;charset=UTF-8",
        //     data:JSON.stringify(params),
        //     success: function(info) {
        //         location.href='../html/deleteSuccessful.html'       
        //     }
                
        //  })
    })

});
