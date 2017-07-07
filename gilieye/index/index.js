$(function(){
	$('.top').load('../header/header.html',function(){
		//登录注册弹窗
// 	    header();
 	    
 	    //轮播图自动轮播
		$('.carousel').carousel({
		 interval: 2000
		})
	})
})