$(function() {
    $('.creditCard').on('click',function() {
         $(this).prop('checked', true);
         $('.savingCard').prop('checked', false)
         $(".number").after("<div class='kinds backCard'><span>CVN2</span><input type='text' name='subNo' value='' placeholder='卡背面后三位' /></div>");
         $(".username").before("<div class='kinds term'><span>有效期</span><input type='text' name='expired' value='' placeholder='MM/YY输入MMYY' /></div>");
    })
    $('.savingCard').on('click',function() {
        $(".backCard").hide();
        $(".term").hide();
        $('.creditCard').prop('checked', false);
    })
    
})


    
    
    function submitCard(){
    	
    	 var d = {};
    	    var t = $('#addCard').serializeArray();
    	    $.each(t, function() {
    	      d[this.name] = this.value;
    	    });
    	    alert(JSON.stringify(d))
    	
    	$.ajax({
    		type: 'post',
    	    url: prexurl+'/iot/getSDK',
    	    dataType: 'json',
    	    contentType: "application/json;charset=UTF-8",
    	    data:JSON.stringify(d),
    	    success: function(info) {
    	    	
    	    	window.location.href=prexurl+'/iot/confirm';
    	    	
    	    	
    	    }
    	
    	});
    	
    	
    }