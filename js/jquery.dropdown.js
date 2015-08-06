/**
 * Frontend page JS styles
 *
 * Project: Tender.pro <br />
 * File: offer_demand.js
 * 
 * @author Igor <igor@altsolution.net>
 * @package js
 */
 
	$(document).ready(function(){  
		
		/*  !!! OLD DROP DOWN LEFTSIDE MENU */
		
		$("div.expand").click(function () { 
	  
			if ($(".sub:first").is(":hidden")) { 
				$(".sub").fadeIn("normal");
				$("div.expand").addClass ("expandopen");
				setCookie(".sub", "opened");
			}
			else {			 
				$(".sub").fadeOut("normal");
				$("div.expand").removeClass ("expandopen");
				setCookie(".sub", {path: '/'});
			}
		return false;	
		});
		
		$("div.expand2").click(function () { 
	  
			if ($(".sub2:first").is(":hidden")) { 
				$(".sub2").fadeIn("normal");
				$("div.expand2").addClass ("expandopen");
				setCookie(".sub2", "opened2");				
			}
			else {			 
				$(".sub2").fadeOut("normal");
				$("div.expand2").removeClass ("expandopen");
				setCookie(".sub2", {path: '/'});
			}
		return false;	
		});
		
		$("div.expand3").click(function () { 
	  
			if ($(".sub3:first").is(":hidden")) { 
				$(".sub3").fadeIn("normal");
				$("div.expand3").addClass ("expandopen");
				setCookie(".sub3", "opened3");				
			}
			else {			 
				$(".sub3").fadeOut("normal");
				$("div.expand3").removeClass ("expandopen");
				setCookie(".sub3", {path: '/'});
			}
		return false;	
		});
		
		if ( $('#navmenu').length == 0 ) {
			$('.mbutton').click(function(){
				if ($('.menuBlock').is(':hidden')) {
					$('.menuBlock').fadeIn(400);
					$('.tenderAboutHolder').removeClass('hidden');
					$('.contentHolderWithMenu').removeClass('hidden');
					setCookie('oldmenu', {path: '/'});	
					$('a.mbutton').attr({ title: "Свернуть"});			
				}
				else {
					$('.menuBlock').fadeOut(400);
					var t = setTimeout(function (){
						$('.tenderAboutHolder').addClass('hidden');
						$('.contentHolderWithMenu').addClass('hidden');
					}, 400);
					setCookie('oldmenu', 'closed');	
					$('a.mbutton').attr({ title: "Развернуть"});			
				}
			return false;
			});
		}
		
		var sub = getCookie(".sub");
		if (sub == "opened") {
			$(".sub").css({'display' : 'block'});
			$(".expand").addClass ("expandopen");
		};
		
		var sub2 = getCookie(".sub2");
		if (sub2 == "opened2") {
			$(".sub2").css({'display' : 'block'});			
			$(".expand2").addClass ("expandopen");
		};
		
		var sub3 = getCookie(".sub3");
		if (sub3 == "opened3") {
			$(".sub3").css({'display' : 'block'});			
			$(".expand3").addClass ("expandopen");
		};
		
		if ( $('#navmenu').length == 0 ) {
			$('a.mbutton').attr({ title: "Свернуть"});
		
			var mold = getCookie('oldmenu');
			if (mold == 'closed') {
				$('.menuBlock').css({'display' : 'none'});
				$('.tenderAboutHolder').addClass('hidden');
				$('.contentHolderWithMenu').addClass('hidden');
				$('a.mbutton').attr({ title: "Развернуть"});
			};	
		}		
		
		/*  NEW DROP DOWN LEFTSIDE MENU */
		
		if ( $('#navmenu').length ) {
			
			var menu = $('#navmenu').attr('class');	
			
			$('.mbutton').click(function(){
				if ($('.menuBlock').is(':hidden')) {
					$('.menuBlock').fadeIn(400);
					$('.tenderAboutHolder').removeClass('hidden');
					$('.contentHolderWithMenu').removeClass('hidden');
					setCookie(menu, {path: '/'});	
					$('a.mbutton').attr({ title: "Свернуть"});			
				}
				else {
					$('.menuBlock').fadeOut(400);
					var t = setTimeout(function (){
						$('.tenderAboutHolder').addClass('hidden');
						$('.contentHolderWithMenu').addClass('hidden');
					}, 400);
					setCookie(menu, 'closed');	
					$('a.mbutton').attr({ title: "Развернуть"});			
				}
			return false;
			});	
			
			var m = getCookie(menu);
			
			if (m == 'closed') {
				$('.menuBlock').css({'display' : 'none'});
				$('.tenderAboutHolder').addClass('hidden');
				$('.contentHolderWithMenu').addClass('hidden');
				$('a.mbutton').attr({ title: "Развернуть"});
			};	
			
			$('.menuBlock li ul').each(function(index) {	
			
				if ( $(this).is(':hidden') ) {
					$(this).parent().addClass('expand-off');
				} else {
					$(this).parent().addClass('expand-on')
				}			
				
				var podmenu = ( menu+(index + 1) );			
				var podmenuvalue = getCookie( podmenu );
				
				$(this).parent().addClass('complex');
				$(this).parent().attr('id',podmenu);
				
				if ( podmenuvalue == 'expand-on') {		
					$(this).parent().addClass('expand-on');	
					$(this).parent().removeClass('expand-off');
					setCookie(podmenu, 'expand-on');			
				} 
				
				if ( podmenuvalue == 'expand-off') {
					$(this).parent().addClass('expand-off');	
					$(this).parent().removeClass('expand-on');
					setCookie(podmenu, 'expand-off');	
				}
			});
			
			$('.menuBlock li.complex > span > a').live('click', function() {		
				if ($(this).parent().parent().children('ul').is(':hidden')) {	
					$(this).parent().parent('li.complex').children('ul').fadeIn(400);
					$(this).parent().parent('li').addClass('expand-on');	
					$(this).parent().parent('li').removeClass('expand-off');	
					var podmenu = menu+$('ul').index( $(this).parent().parent().children('ul'));
					setCookie(podmenu, 'expand-on');		
				}
				else {
					$(this).parent().parent('li.complex').children('ul').fadeOut(400);	
					$(this).parent().parent('li').addClass('expand-off');	
					$(this).parent().parent('li').removeClass('expand-on');
					var podmenu = menu+$('ul').index( $(this).parent().parent().children('ul'));
					setCookie(podmenu, 'expand-off');			
				}		
				
				if ( document.location.href == this.href || document.location.href == this.href+'#' || document.location.href+'#' ) {
					return false;
				} 	
				
			});	
			
			if ( $('#navmenu li ul .active').length ) {
				$('#navmenu li ul .active').each(function() {
					$('#navmenu li ul .active').parent('ul').parent('.complex').removeClass('expand-off');
					$('#navmenu li ul .active').parent('ul').parent('.complex').addClass('expand-on');					
				});
			}
			
		}	
	});