$(()=>{
//	标题切换
	$('.setting_title div').on('click',function(){
		
		$('.setting_title div').map((i)=>{
			$('.setting_title div').eq(i).removeClass('font_color');
		})
		$(this).addClass('font_color')
		$('.setting_line').css({
			'left':($(this).index()-1)*112+159+'px'
		})
		$('.setting_content div').map((i)=>{
			$('.setting_content_con ').eq(i).removeClass('setting_dis');
		})
		$('.setting_content_con').eq($(this).index()-1).addClass('setting_dis')	
	})
	
	$('.datepicker').on('focus',function(){
		console.log(1)
	})
	
	$('.datepicker').on('focus',function(){
//	    		alert(1)
	console.log(1)
	})
    $(".datepicker").datepicker({
        language: "zh-CN",
        autoclose: true,//选中之后自动隐藏日期选择框
        clearBtn: true,//清除按钮
        todayBtn: true,//今日按钮
        format: "yyyy-mm-dd"//日期格式，详见 http://bootstrap-datepicker.readthedocs.org/en/release/options.html#format
    });
	  
	
})