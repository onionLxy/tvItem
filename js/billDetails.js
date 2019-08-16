$(function() {
  // 获取地址栏的参数
  var str = location.search;
  console.log(str);
  str = str.split('=')
  str = str[1]  ;
  console.log(str);
  var code = str.split('&');
  
    //进入页面 发送请求
    var params = {
      'orderNo':code[0],
      'cardNo':code[1],
      'merchantId':code[2],
  }
  
  
  $.ajax({
      type: 'post',
      url: prexurl+'/iot/getBillDetails',
      dataType: 'json',
      contentType: "application/json;charset=UTF-8",
      data:JSON.stringify(params),
      success: function(info) {
          console.log(info);  
          var htmlStr = template('billDetails',info);
          $('.details').html(htmlStr);   
          
          // 最后一条数据无下边框
        var $details = $('.details .details_info')    
         if($details.length == 0) {
          $('.main .details').css('border','none')
          $('.details_info').css('border-bottom','none');
        } else {
          $details.eq($details.length-1).css('border-bottom','none')
        };
      }
  
    });
  
  
   
  });
  