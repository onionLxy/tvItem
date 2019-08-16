$(function() {
    $('.btn').on('click',function() {
        // input框内容
        var res = $('input').val()
        // 发送请求
        var params = {
            'walletId':res,
        }
        +
        
        $.ajax({
            type: 'post',
            url: prexurl+'/iot/getBankList',
            dataType: 'json',
            contentType: "application/json;charset=UTF-8",
            data:JSON.stringify(params),
            success: function(info) {

                location.href='../html/onlinePay.html'
            }
        })

    })
})