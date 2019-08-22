$(function() {
  // 获取地址栏的id
  var str = location.search;
  console.log(str);
  str = str.slice(4);
  console.log(str);

  //进入页面 发送请求
  var params = {
    equipId: str
  };
  $.ajax({
    type: "post",
    url: prexurl + "/iot/getEquipmentBill",
    dataType: "json",
    contentType: "application/json;charset=UTF-8",
    data: JSON.stringify(params),
    success: function(info) {
      console.log(info);
      // 判断数组长度为0，显示暂无数据
      if (info.orders[0].order.length == 0) {
        var Div = document.createElement("div");
        $(".bankCard").append(Div);
        Div.className = "created";
        $(".created").html("暂无数据");
      }

      var htmlStr = template("billList", info);
      $(".bankCard").html(htmlStr);

      // 点击页面跳转
      // 点击获取到每条数据的data-order
      $(".bill_list").on("click", function() {
        var order = $(this).attr("data-order");
        var card = $(this).attr("data-card");
        var merchant = $(this).attr("data-merchant");
        console.log(order);
        // 页面跳转
        location.href =
          "../html/billDetails.html?order=" +
          order +
          "&" +
          card +
          "&" +
          merchant +
          "";
      });
    }
  });
});
