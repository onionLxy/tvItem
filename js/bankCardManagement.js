setTimeout(function(){
    $(function () {
        var token;
        var equipmentId;
        // 截取字符串
        var str = location.search;
        console.log(str);
        id = str.slice(4);
        console.log(id);
    
        //发送请求
        var params = {
            'walletId':"1",
            'token':6251640000021002
        }
        
        $.ajax({
            type: 'post',
            url: prexurl+'/iot/getBankList',
            dataType: 'json',
            contentType: "application/json;charset=UTF-8",
            data:JSON.stringify(params),
            success: function(info) {
                console.log(info);
                var htmlStr = template('bankCard_details',info);
                $('.bankCard').html(htmlStr); 
    
                    token = info.tokens[0].token
                    equipmentId = info.tokens[0].equipmentId
                    
    
    
                // 点击弹出模态框
                $('.right_arrow').on('click',function() {
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
                    $.ajax({
                        type: 'post',
                        url: prexurl+'/iot/updateTokenStatus',
                        dataType: 'json',
                        contentType: "application/json;charset=UTF-8",
                        data:JSON.stringify(params),
                        success: function(info) {
                            location.href='../html/deleteSuccessful.html'       
                        }
                            
                    })
                })
    
                // 查看限额
                $('.details_info').on('click',function() {
                location.href='../html/viewLimits.html?id='+id+''
                })
                // 修改限额
                $('.details_info_limit').on('click',function() {
                    location.href='../html/modificationLimit.html?id='+id+''
                })
    
            }
          });
        
        
        
    })
}, 1000); 
