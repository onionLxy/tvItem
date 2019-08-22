var prexurl="http://212.64.88.43";
var cardType=new Map();
cardType.set("00","账户");
cardType.set("01","借记卡");
cardType.set("02","贷记卡");
cardType.set("03","准贷记卡");
cardType.set("04","借贷合一卡");
cardType.set("05","预付费卡");

function qrCoder(){
	
//  // 调用钱包的扫码功能接口
    upsdk.scanQRCode({
      scanType: ["qrCode", "barCode"],
      success: function(result) {
        if (result) {
          if (result.indexOf(prexurl) >= 0) {
            window.location.href = result;
          } else {
            alert("无效的二维码");
          }
        }
      }
    });
	
}