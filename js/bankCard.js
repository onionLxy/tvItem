$(document).ready(function() {
  // 获取地址栏的id;
  var str = location.search;
  console.log(str);
  id = str.slice(4);
  console.log(id);
  //发送请求
  var params = {
    equipId: id
  };

  $.ajax({
    type: "post",
    url: prexurl + "/iot/getBankList",
    dataType: "json",
    contentType: "application/json;charset=UTF-8",
    data: JSON.stringify(params),
    success: function(info) {
      console.log(info);
      info.cardType = cardType;
      var htmlStr = template("bankCard", info);
      $(".bankCard").html(htmlStr);

      // 点击银行卡跳转到 银行卡管理
      $(".bankCard .content").on("click", function() {
        location.href = "../html/bankCardManagement.html?id=" + id + "";
      });
    }
  });
});
