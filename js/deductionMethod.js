$(function() {

    $(".deduction").on("click", function () {
      console.log(111);
      
    // 弹出模态框
    var container = document.getElementById("div-container");
    container.style.display = "block";

      /*取消事件*/
      $('.div-child').on('click',function() {
        var container = document.getElementById('div-container');
          container.style.display = "none";
      })    
    // 银行卡管理页面
        $('.cardManagement').on('click', function () {
            location.href='../html/bankCardManagement.html'
        })
  });
});
