$(function() {
    // 获取地址栏的id;
   var str = location.search;
   console.log(str);
   id = str.slice(4);
   console.log(id);
    //发送请求
    var params = {
        'equipId':id
    }
    
    $.ajax({
        type:'post',
        url: prexurl+'/iot/getBankList',
        dataType: 'json',
        contentType: "application/json;charset=UTF-8",
        data:JSON.stringify(params),
        success: function(info) {
            console.log(info);
            var htmlStr = template('bankCard',info);
            $('.bankCard').html(htmlStr); 
             
            //调用 将银行卡中间位转化为*号    
            var cardNumber_str = $('.bank .num_hide')
            $('.num_hide').each(function(i,element) {
                cardNumber = cardNumber_str.html()
                console.log(cardNumber);
           })
            

            var cardNumber_str = $('.bank .num_hide')             
            cardNumber = cardNumber_str.html()
            console.log(cardNumber);
            
            FormatCardNumber(cardNumber)
            function FormatCardNumber (a) {
                if (cardNumber && cardNumber.length > 8) {
                     return `${cardNumber.substring(0, 4)} ${"*".repeat(cardNumber.length - 8).replace(/(.{4})/g, `$1 `)}${cardNumber.length % 4 ? " " : ""}${cardNumber.slice(-4)}`;
                    }
                    return cardNumber;
                }
                cardNumber_str.html(FormatCardNumber(cardNumber))
                
                // 点击银行卡跳转到 银行卡管理
                $('.bankCard .content').on('click',function() {
                    location.href='../html/bankCardManagement.html?id='+id+''
                })
                    
        }

      });
     

})