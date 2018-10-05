$(document).ready(function() {
	$("#rightarea li").mouseover(function() {
		$(this).find("span").show();
	}).mouseout(function() {
		$(this).find("span").hide();
	});
	$(".wb").mouseover(function() {
		$(this).addClass("wb_on");
	}).mouseout(function() {
		$(this).removeClass("wb_on");
	});
	$(".qb").mouseover(function() {
		$(this).addClass("qb_on");
	}).mouseout(function() {
		$(this).removeClass("qb_on");
	});
	$(".pb").mouseover(function() {
		$(this).addClass("pb_on");
	}).mouseout(function() {
		$(this).removeClass("pb_on");
	});
	$(".eb").mouseover(function() {
		$(this).addClass("eb_on");
	}).mouseout(function() {
		$(this).removeClass("eb_on");
	});
	$(".tb").mouseover(function() {
		$(this).addClass("tb_on");
	}).mouseout(function() {
		$(this).removeClass("tb_on");
	});
	$(".datashow").mouseover(function() {
		$(this).addClass("ds_on");
	}).mouseout(function() {
		$(this).removeClass("ds_on");
	});
	$(".datashow").mouseover(function() {
		$(this).addClass("ds_on");
	}).mouseout(function() {
		$(this).removeClass("ds_on");
	});
	$(".inputText input").focus(function() {
		$(this).parent().addClass("ipt_on");
	}).blur(function() {
		$(this).parent().removeClass("ipt_on");
	});
	$(".checkMac").focus(function() {
		$(this).addClass("ipt_on");
	}).blur(function() {
		$(this).removeClass("ipt_on");
	});
	$("#regis").click(function() {
		$(".login_in").hide();
		$(".login_out").show();
	});
	$("#getpsword").click(function() {
		getCodeIMG2();
		$(".login_in").hide();
		$(".getPassowrd").show();
	});
	$("#userExitSpan .logined").click(function() {
		$('header .logined_indexlist').css('top', $(this).get(0).offsetTop + $(this).get(0).offsetHeight+10).slideToggle(600);
	});
	$('header .logined_indexlist').bind('mouseleave',function(){
		$(this).slideUp(500);
	});
	$('header .menu .slidernav').bind('mouseleave',function(){
		$(this).slideUp(500);
	})
	$('header .menu .slidernav').prev('a').bind('mouseover',function(){
		$('div.slidernav').hide();
		$(this).next('div.slidernav').animate({height: 'toggle'});
	});

})