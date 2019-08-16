//$(function() {
//     //发送请求
//     var params = {
//        'taskId':'1',
//        'secret':{
//            'appId':'1',
//            'nonceStr':'1',
//            'signature':'1',
//            'timestamp':'1'
//        }
//    }+
//    $.ajax({
//        type: 'post',
//        url: prexurl+'/iot/unionpay/getTaskInfo',
//        dataType: 'json',
//        contentType: "application/json;charset=UTF-8",
//        data:JSON.stringify(params),
//        success: function(info) {
//            console.log(info);
//         
//        }
//      });
//
//
//    $('.confirm').on('click',function() {
//        location.href='../html/chooseBankCard.html'
//    })
//})