$(function () {
    $('.microphone').on('touchstart', function () {
        $('.voice').html('录音中...');
        $('.fa-microphone').css('color', 'green');
        
        
    });
    $('.microphone').on('touchend', function () {
        $('.voice').html('按住说话');
        $('.fa-microphone').css('color','black')
    });
    
})