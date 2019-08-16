$(function() {
    var token;
    var equipmentId;
    // 获取地址栏参数
    var str = location.search;
    console.log(str);
    id = str.slice(4);
    console.log(id);
 
    //发送请求
    var params = {
        'walletId':"1",
        'equipId':id
    }
    
    $.ajax({
        type: 'post',
        url: prexurl+'/iot/getBankList',
        dataType: 'json',
        contentType: "application/json;charset=UTF-8",
        data:JSON.stringify(params),
        success: function(info) {
            console.log(info);
            var htmlStr = template('bankCard_limit',info);
            $('.limit').html(htmlStr); 
            token = info.tokens[0].token;
            equipmentId = info.tokens[0].equipmentId
            //调用 将银行卡中间位转化为*号    
            var cardNumber_str = $('.limit .limit_number')
            $('.limit_number').each(function(i,element) {
                cardNumber = cardNumber_str.html()
           })
            

            var cardNumber_str = $('.limit .limit_number')             
            cardNumber = cardNumber_str.html()
            console.log(cardNumber);
            
            FormatCardNumber(cardNumber)
            function FormatCardNumber (a) {
                if (cardNumber && cardNumber.length > 8) {
                     return `${cardNumber.substring(0, 4)} ${"*".repeat(cardNumber.length - 8).replace(/(.{4})/g, `$1 `)}${cardNumber.length % 4 ? " " : ""}${cardNumber.slice(-4)}`;
                    }
                    return cardNumber;
                }
                cardNumber_str.html(FormatCardNumber(cardNumber));
                
                // 修改限额的参数
                var  dayLimitAmt= $('.singleDay');  
                var  singleLimitAmt= $('.single'); 
                                  
                //点击修改按钮  发送请求   页面跳转
            
                $(".mui-btn-danger").click(function(){
                    //获取input内容
                    var res = dayLimitAmt.val();
                    var ras = singleLimitAmt.val()
                    console.log(res);
                    console.log(ras);
                    if(res ==''& ras == ''){
                        return
                    };
                //发送请求
                var params = {
                    'equipId':equipmentId,
                    'token':token,
                    //单日
                    'dayLimit':res,
                    //单笔
                    'singleQuota':ras
                    
                }
                $.ajax({
                    type: 'post',
                    url: prexurl+'/iot/updateLimit',
                    dataType: 'json',
                    contentType: "application/json;charset=UTF-8",
                    data:JSON.stringify(params),
                    success: function(info) {
                        console.log(info);
                            location.href='../html/modificationLimitSuccessful.html'
                            $(".singleDay").val("");
                            $(".single").val("");
                            
                        }
                        
                    })
                                
            });
            // 点击返回按钮，返回上一页；
            $('.mui-btn.back ').on('click',function() {
                location.href='../html/bankCardManagement.html';
            }) 
        }
    });
                    
      

})