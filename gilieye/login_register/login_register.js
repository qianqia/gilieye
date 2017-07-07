//http://api.dev.gilieye.com/接口


$(function(){
//	登陆注册切换
	$('.lR_title').on('click',function(){
		$('.lR_title').map((i)=>{
			$('.lR_title').eq(i).removeClass('color');
		})
		$(this).addClass('color')
		$('.bottom_line').css({
			'left':$(this).index()*180+170+'px'
		})
		$('.login_content_box').map((i)=>{
			$('.login_content_box').eq(i).removeClass('dis');
		})
		$('.login_content_box').eq(1-$(this).index()).addClass('dis')	
	})
//注册	
//	1.获取注册验证码
var codeId,tel,imgCode,pwd,telCode;
var i=0
function getCode(arr){
	let codeUrl='http://api.dev.gilieye.com/captcha';
	$.ajax({
		type:"get",
		url:codeUrl,
		async:true,
		success:function(code){
			let data=code.data;
			var codeImg,tel;
			codeId=data.id
			let codeImgurl=data.url
			arr[0].src='http://api.dev.gilieye.com'+codeImgurl;
		},
		error:function(){
			console.log('获取数据失败')
		}
	});
	
}
	getCode($('.register_imgCode img'));
	
//  2.点击验证码重新获取

	$('.register_imgCode img').on('click',function(){
				getCode($('.register_imgCode img'))
	})
//获取手机短信验证码
		var flag=true;
		$(".register_number").on('blur',function(){
			var reg=/^1[34578]\d{9}$/g;
			if(reg.test($(".register_number").val())){
				 tel=$(".register_number").val()
				console.log('输入手机号格式正确')
			}else{
				console.log('手机号不正确')
			}
		})
		
		$('.fillIn_imgCode').on('keyup',function(){
			 imgCode=$('.fillIn_imgCode').val();
		})
		
		if(flag){
			$('.get_code').on('click',function(){
				console.log(codeId,imgCode,tel)
				$.ajax({
					type:"post",
					url:"http://api.dev.gilieye.com/sms/send",
					data:{captchaId:codeId,captchaWord:imgCode,phone:tel},
					async:true,
					success:function(data){
						console.log(data)
						console.log(data.message,flag,data.code)
						
						if(data.message=='成功'){
							var i=59
							var time=setInterval(function(){
								i--
								if(i==0){
									i=59;
									clearInterval(time)
									$('.get_code').html('获取验证码')
									$('.get_code').css('font-size','18px')
									flag=true;
									console.log(flag)
								}else{
									$('.get_code').css('font-size','14px')
									$('.get_code').html(i+'s后可获取')
									flag=false;
									console.log(flag)
								}
								
							},1000)
						}
						
					},
					error:function(){
						console.log('获取手机验证码失败')
					}
				});
			})
		}

//注册成功后，跳到设置昵称	
	$('.register_next').on('click',function(){
		pwd=$('.register_pwd input').val();
		telCode=$('.fillIn_code').val()
		var pwd_length=$('.register_pwd input').val().length;
		var checked=$('.register_protocols input')[0].checked
		
		console.log(checked)
		if(!checked){
			$('.register_tips').animate({
				zIndex:1,
				opacity:'1'
			},1000)
			setTimeout(function(){
				$('.register_tips').animate({
					opacity:'0',
					zIndex:-1
				},500)
			},3000)
		}
		if(pwd_length>5&&pwd_length<21&&checked&&(tel!='')&&(telCode!='')&&(imgCode!="")){
			$.ajax({
				type:"post",
				url:"http://api.dev.gilieye.com/signup",
				data:{phone:tel,password:pwd,code:telCode},
				async:true,
				success:function(data){
					if(data.code==0){
						console.log('注册成功哦')
						let reset_username='<div class="reset_new_username">设置昵称</div>'+
							'<div class="reset_username">'+
							'<div class="fl">昵称</div>'+
							'<input type="text"  class="fl" placeholder="为自己设置一下昵称吧 ╮(╯▽╰)╭"/>'+
							'<div class="fr"></div></div>'+
							'<div class="username_tip"></div>'+
							'<div class="username_gilieye">开启gili爱之旅</div>'
							$('.login_register').css('width','500px')
							$('.login_register').html(reset_username)
					}else{
						console.log(data.code,data.mess)
						$('.register_number').val('')
						$('.fillIn_imgCode').val('')
						$('.fillIn_code').val('')
						$('.register_pwd input').val('')
					}
					
					
				},
				error:function(){
					console.log('注册失败')
				}
				
			});
		}
	})
//登陆
//$('.phone_number input').on('focus',function(){
////	alert(1)
//	$('.phone_number').css({
//		"outline":"#00FF00"
//	})
//})
$('.login').on('click',function(){
	
	let phone=$('.phone_number input').val() ;
	let pwd=$('.pwd input').val() 
	let tendays=$('.free_login input')[0].checked-0;
	if(tendays==1){
		data={phone:phone,password:pwd,code:tendays}
	}else if(tendays==0){
		data={phone:phone,password:pwd}
	}
	
	
	if(phone!=''&&pwd!=''){
		$.ajax({
			type:"post",
			url:"http://api.dev.gilieye.com/login",
			async:true,
			data:data,
			success:function(data){
				console.log(data)
				if(data.code==0){
					console.log(data.data.exp)
					if(tendays==1){
						Cookie.setCookie('token',data.data.token,"/",new Date(new Date().getTime()+10*24*3600*1000));
						Cookie.setCookie('userId',data.data.user,"/",new Date(new Date().getTime()+10*24*3600*1000));
					}else{
						sessionStorage.setItem("sortToken",data.data.token);
						sessionStorage.setItem("sortUserId",data.data.user.id);
					}
//					获取十几天免登陆cookie
//					let  _cookie=Cookie.readCookie();
//					console.log(_cookie)
				}
			},
			error:function(){
				console.log(登陆请求失败)
			}
		});
	}
})




//点击忘记密码,跳转到忘记密码页面
	$('#forget_pwd').on('click',function(){
		var forget_phone,forget_imgCode;
		let mark=true;
		let forget_pwd="<div class='find_pwd'>找回密码</div>"+
						"<div class='forget_phone'>"+
						"<div class='fl forget_com'>手机号码</div>"+
						"<div class='fl '>"+
						"<span>+86</span>"+
						"<input type='text'  placeholder='输入十一位大陆手机号'/></div></div>"+
						'<div class="forget_imgCode">'+
						'<div class="fl forget_com">验证码</div>'+
						'<input type="text" class="fl forget_fillIn_imgcode" placeholder="输入验证码" />'+
						'<img src="" alt="图形验证码"/></div>'+
						"<div class='forget_checkout'>"+
						"<div class='fl forget_com'>短信验证</div>"+
						"<input type='text' class='fl forget_fillIn_code' placeholder='输入验证码' />"+
						"<div class='fl forget_get_code'>获取验证码</div></div>"+
						"<div class='forget_next'>下一步</div>"
		$('.login_register').html(forget_pwd)
		getCode($('.forget_imgCode img'));
		$('.forget_imgCode img').on('click',function(){
			getCode($('.forget_imgCode img'))
		})
		$(".forget_phone input").on('blur',function(){
			
//			var reg=/^1[34578]\d{9}$/g;
//			if(reg.test($(".register_number").val())){
//				 tel=$(".register_number").val()
//				console.log('输入手机号格式正确')
//			}else{
//				console.log('手机号不正确')
//			}
			forget_phone=$(".forget_phone input").val()
			console.log(forget_phone)
		})
		
		$('.forget_imgCode input').on('blur',function(){
			 forget_imgCode=$('.forget_imgCode input').val();
			 console.log(forget_imgCode)
		})
		if(mark){
//			alert(1)
			$('.forget_get_code').on('click',function(){
				console.log(codeId,forget_imgCode,forget_phone)
				$.ajax({
					type:"post",
					url:"http://api.dev.gilieye.com/sms/send",
					data:{captchaId:codeId,captchaWord:forget_imgCode,phone:forget_phone},
					async:true,
					success:function(data){
						console.log(data)
						console.log(data.message,flag,data.code)
						
						if(data.message=='成功'){
							var i=59
							var time=setInterval(function(){
								i--
								if(i==0){
									i=59;
									clearInterval(time)
									$('.forget_get_code').html('获取验证码')
									$('.forget_get_code').css('font-size','18px')
									mark=true;
									console.log(flag)
								}else{
									$('.forget_get_code').css('font-size','14px')
									$('.forget_get_code').html(i+'s后可获取')
									mark=false;
									console.log(flag)
								}
								
							},1000)
						}
						
					},
					error:function(){
						console.log('获取手机验证码失败')
					}
				});
			})
		}
		
//重置密码
		if(forget_phone!=''&&forget_imgCode!='&&($(".forget_fillIn_code").val()!=""'){
			$('.forget_next').on('click',()=>{
		   		let reset_pwd='<div class="reset_new_pwd">设置新密码</div>'+
							  '<div class="reset_pwd">'+
					          '<div class="fl">密码</div>'+
					          '<input type="text" placeholder="设置6-16位的密码"  class="fr"/></div>'+
				              '<div class="begin_gilieye">开始Gili爱之旅</div>'
				$('.login_register').css('width','500px')
				$('.login_register').html(reset_pwd)
		   })
		}
	  

})

//点击去登陆,跳到登陆页面
	 $('#go_login').on('click',function(){
	 	$('.lR_title').map((i)=>{
			$('.lR_title').eq(i).removeClass('color');
		})
		$('.lR_title').eq(0).addClass('color')
		$('.bottom_line').css({
			'left':'170px'
		})
		$('.login_content_box').map((i)=>{
			$('.login_content_box').eq(i).removeClass('dis');
		})
		$('.login_content_box').eq(1).addClass('dis')	
	 })

	
})