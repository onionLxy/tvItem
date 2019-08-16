$(function() {
    //发送请求
    var params = {
        'userId':1,
    }
    $.ajax({
        type: 'post',
        url: prexurl+'/iot/getBankList',
        dataType: 'json',
        contentType: "application/json;charset=UTF-8",
        data:JSON.stringify(params),
        success: function(info) {
            console.log(info);
            var htmlStr = template('bankCardNum',info);
            $('.bankCard').html(htmlStr); 

             
            //调用 将银行卡中间位转化为*号
            var cardNumber_str = $('.num_hide')
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
                            
            
        }
      });

})