$(function() {

  // 获取地址栏的id
  var str = location.search;
  str = str.slice(1)
  var code = str.split('=')
  code = code[1];
  //进入页面 发送请求
    var params = {
      'type':code,
  } 
  $.ajax({
      type: 'post',
      url: prexurl+'/iot/getEquipmentInfo',
      dataType: 'json',
      contentType: "application/json;charset=UTF-8",
      data:JSON.stringify(params),
      success: function(info) {
          console.log(info);  
          var htmlStr = template('detailAccount',info);
          $('.details').html(htmlStr);    
          // 判断数组长度为0，显示暂无数据;         
          if(info.equipmentInfo.length == 0 ) {
            var Div = document.createElement('div')
            $('.details').append(Div)
            Div.className='created';
            $('.created').html('暂无数据');
          };
          // 点击页面跳转
          // 点击获取到每条数据的data-id
          $('.details_info').on('click', function() {
            var name = $(this).attr('data-name');
            var id = $(this).attr('data-id');
            console.log(name);
            console.log(id);
            
            // 页面跳转
            location.href = "../html/deviceDetails.html?key="+name+"&id="+id+"";
          });
      }
  
    });
  
   
    

  });
  