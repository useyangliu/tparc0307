$(document).ready(function() {
	var clickFlg = true;

	var oAllHeight = $(window).height();
	$(".content").height(oAllHeight + "px");
	$("#menu").height(oAllHeight + "px");
	$(".content .main").height(oAllHeight - $(".toolbar").height() + "px");

	$("table tr").each(function() {
		$(this).find("td").last().css("border-right", "none")
		$(this).find("th").last().css("border-right", "none")
	});

	/*退出*/
	$("#exit").click(function() {
		$("#exit-tc").fadeIn();
		$("#exit-tc .exit-cont").stop(true, true).animate({
			top: "50%"
		});
		$("#exit-tc .yes").click(function() {
			$("#exit-tc").fadeOut();
			$("#exit-tc .exit-cont").stop(true, true).animate({
				top: "-100%"
			});

		});
		$("#exit-tc .no").click(function() {
			$("#exit-tc").fadeOut();
			$("#exit-tc .exit-cont").stop(true, true).animate({
				top: "-100%"
			});

		})
	});

	/*下拉选择框*/
	$(".select_box").click(function(event) {
		if(clickFlg) {
			event.stopPropagation();
			/*$(this).find(".option").toggle()*/
			$(".option").slideUp(300);
			if($(this).find(".option").is(":hidden")) {
				$(this).find(".option").slideDown(300);
				$(this).find(".selet_open").addClass("cur");
			} else {
				$(".option").slideUp(300);
				$(".selet_open").removeClass("cur");
			}
			clickFlg = false;
		} else {
			clickFlg = true;
			var eo = $(event.target);
			if($(".select_box").is(":visible") && eo.attr("class") != "option" && !eo.parent(".option").length) {
				$('.option').slideUp(300);
				$(".selet_open").removeClass("cur");
			}
		}

	});
	$(document).click(function(event) {
		clickFlg = true;
		var eo = $(event.target);
		if($(".select_box").is(":visible") && eo.attr("class") != "option" && !eo.parent(".option").length) {
			$('.option').slideUp(300);
			$(".selet_open").removeClass("cur");
		}
	});
	/*赋值给文本框*/
	$(".option a").click(function(event) {
		clickFlg = true;
		event.stopPropagation();
		var value = $(this).text();
		var oClass = $(this).attr("class");
		$(this).parent().siblings(".select_txt").val(value);
		$(this).parent().siblings(".select_txt").html(value);
		$(this).siblings(".select_value").val(value);
		if(oClass){
			$(this).siblings(".select_value").val(oClass);
		}
		$(this).parent().slideUp(300);
		$(".selet_open").removeClass("cur");
	});

});

$(".retract").click(function() {
	if($(this).hasClass("cur")) {
		$("#menu").removeClass("cur");
		$(".content").removeClass("cur");
		$(".content-bg").fadeOut(300);
		$(this).removeClass("cur");
	} else {
		$("#menu").addClass("cur");
		$(".content").addClass("cur");
		$(".content-bg").fadeIn(300);
		$(this).addClass("cur");
	}

});