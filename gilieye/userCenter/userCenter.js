$(function(){
	$('.userCenter_top').load('../header/header.html',()=>{
		let  _cookie=Cookie.readCookie().split(";");
		var token_10,token_5,token;
		
		for(var i=0;i<_cookie.length;i++){
			console.log(1)
			if(_cookie[i].substring(0,5)=='token'){
				token=_cookie[i].split('=')[1];
			}
		}
//		if(token!=undefined){
//			$('.login_register').html('hahhah')
//		}
		var userCenter_title_i=0;
		$('.userCenter_title_wrap div').on('click', function() {
				 userCenter_title_i=$(this).index()
				$('.userCenter_title_wrap div').map((i) => {
					$('.userCenter_title_wrap div').eq(i).removeClass('userCenter_color');
				})
				$(this).addClass('userCenter_color')
				$('.userCenter_bottom_line').css({
					'left': $(this).index() * 88  + 'px'
				})
				$('.userCenter_title_content div').map((i) => {
					$('.userCenter_title_content div').eq(i).removeClass('userCenter_dis');
				})
				$('.userCenter_title_content div').eq($(this).index()).addClass('userCenter_dis')
		})
		
		$('.userCenter_title_wrap div').hover(function(){
			$(this).addClass('userCenter_color')
		},function(){
			if(userCenter_title_i!=$(this).index()){
				$(this).removeClass('userCenter_color')
			}
			
		})

		$('.header_login').on('click',function(){
			
		})


	})
})
