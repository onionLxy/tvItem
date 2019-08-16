$(function() {
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
            var htmlStr = template('cardLimit', info);
            $('.art').html( htmlStr );


            //调用 将银行卡中间位转化为*号
            var cardNumber_str = $('.art').find('span').eq(1)
             console.log(cardNumber_str);
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

                // // 返回按钮
                // $('.back').on('click',function(){
                //     location.href('../html/deviceManagement.html.html')
                // })
         }

       
      });



})