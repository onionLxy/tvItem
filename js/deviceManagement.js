$(function() {
  // // 云闪付权限验证配置
	$.ajax({
		type: 'post',
	    url: prexurl+'/iot/addCardConfirm',
	    dataType: 'json',
	    contentType: "application/json;charset=UTF-8",
	    data:JSON,
	    success: function(info) {
	    	   upsdk.config(info);
	    	   upsdk.ready(function(){
	    		   
	    		   upsdk.setNavigationBarTitle({
	    			    title: '设备管理'
	    			});
	    		   upsdk.setNavigationBarRightButton({
		    	         // title和image可任选其一, 同时有的话, title优先
//		    	         title: '标题栏文字',
		    	         image: prexurl+'/iot/images/icon/@2x/func_scan@2x.png',
		    	         handler: function(){
		    	  //         // 用户点击标题按钮以后回调函数
	
		    	  //         // 调用钱包的扫码功能接口
		    	             upsdk.scanQRCode({
		    	                 scanType: ["qrCode","barCode"],
		    	                 success: function(result){

		    	                	 if(result){
		    	                		 if(result.indexOf(prexurl)>=0){		    	                			 
		    	                			 window.location.href=result;
		    	                		 }else{
		    	                			 alert("无效的二维码")
		    	                		 }
		    	                		 
		    	                	 }
		    	                     
		    	                     
		    	                     
		    	                 }
		    	             });
		    	         }
		    	   });
	    	   });
	    	   upsdk.error(function(err){
	    		   alert(JSON.stringify(err));
	    	   })
 	    }
	});  

  //进入页面 发送请求
$.ajax({
    type: 'post',
    url: prexurl+'/iot/getEquipmentType',
    dataType: 'json',
    contentType: "application/json;charset=UTF-8",
    success: function(info) {
        console.log(info);  
        var htmlStr = template('kinds',info);
        $('.details').html(htmlStr); 
        
        // 最后一条数据无下边框    
         if(info.types.length == 0) {
          location.href='../html/loading.html';         
        } else {
          $('.details_info').eq(info.types.length-1).css('border-bottom','none')
        };
          // 点击获取到每条数据的data-id
          $('.details_info').on('click', function() {
            var id = $(this).attr('data-id');
            console.log(id);
            // 页面跳转
            location.href = "../html/managementDetails.html?id="+id+"";
          });
      
         
    }
  });
  

  $(".scanning").on("click", function() {
    //
    var ds = null;
    var scan = new QRScan("video");

    document.getElementById("open").onclick = function() {
      scan.openScan();
      ds = window.setInterval(function() {
        startScan();
      }, 1500);
    };
    

    var re_div = document.getElementById("result");
    function startScan() {
      scan.getImgDecode(function(data) {
        console.log(data);
        var p = document.createElement("p");
        if (data.success) {
          p.innerHTML = "RESULT: " + data.payload;
        } else {
          p.innerHTML = "ERROR: " + data.msg;
        }
        re_div.appendChild(p);
      });
    }
  });
});
