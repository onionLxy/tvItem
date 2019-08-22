$(function() {
  // 验证码倒计时
  function timeCode() {
    var wait = 3;
    $(".division").text(wait + "s");
    timer = setInterval(function() {
      if (wait == 0) {
        $(".division").text("获取验证码");
        $(".division").css("color", "blue");
        clearInterval(timer);
      } else {
        wait--;
        $(".division").text(wait + "s");
      }
    }, 1000);
  }
  timeCode();
  $(".division").on("click", function() {
    timeCode();
  });

});
