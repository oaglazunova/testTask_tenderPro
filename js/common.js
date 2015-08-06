/**
 * Frontend common JS styles
 *
 * Project: Tender.pro
 * File: common.js
 *
 * @author Igor <igor@altsolution.net>
 * @package js
 * note: new-only-block
 */

function fixPNG(element)
{
	if (/MSIE (5\.5|6).+Win/.test(navigator.userAgent))
	{
		var src;
		
		if ((element.tagName=='IMG') || (element.tagName=='INPUT'))
		{
			if (/\.png$/.test(element.src))
			{
				src = element.src;
				element.src = "/images/blank.gif";
			}
		}
		else
		{
			src = element.currentStyle.backgroundImage.match(/url\("(.+\.png)"\)/i)
			if (src)
			{
				src = src[1];
				element.runtimeStyle.backgroundImage="none";
			}
		}
		
		if (src) element.runtimeStyle.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + src + "',sizingMethod='scale')";
	}
}

function example(elem, text) {
	document.formName.elements[elem].value = text;
}

function print_ssl () {
	aa = location.host;
	
	if (location.protocol == 'https:')
		document.write('<!--noindex--><a rel="nofollow" href="http://' + aa + '/login-no-ssl.shtml" title="без SSL">без <strong>SSL</strong></a><!--/noindex-->');
	else
		document.write('<!--noindex--><a rel="nofollow" href="https://' + aa + '/" title="с SSL">с <strong>SSL</strong></a><!--/noindex-->');
}

function protected_send_form() {
	hideSelect();
	window.onunload = hide_progress;

	var el = document.getElementById('Progress');
	el.style.display = 'block';
	for ( var idx=0; idx < document.forms.length; idx++ ) {
		var r = document.forms[idx].send_form;
		if (r) {
			document.forms[idx].send_form.disabled=true;
		}
	}
}

function hideSelect() {
	bIsIe = (navigator.userAgent.indexOf('MSIE') > 0 ? true : false);
	if (bIsIe) {
		for ( var idx=0; idx < document.forms.length; idx++ ) {
			for (i=0; i < document.forms[idx].elements.length; i++) {
				if (document.forms[idx].elements[i].type == 'select-one') {
					document.forms[idx].elements[i].style.visibility = 'hidden';
				}
			}
		}
	}
}

function hide_progress() {
	if (document.getElementById('Progress'))
		document.getElementById('Progress').style.display = 'none';
}

function resetinputs(pointer) {
        if (pointer) {
            pointer.reset();
        }
        return false;
}

function start() {
	var HP = document.getElementById("HomePage");
	if (navigator.appName == "Microsoft Internet Explorer") {
		var HP = document.getElementById("HomePage");
		HP.style.behavior = 'url(#default#homepage)';
		HP.setHomePage('http://Tender.Pro/');
	} else {
		window.location.href = HP.href; 
	}
}

function help(i) {
	if (i) {
		window.open("/wk/index.php?oldid="+i);	
	}
	else {
		window.open("/wk/");	
	}
}

function themsable() {
	if ( (document.getElementById('txtFilter').value == '') || (document.getElementById('txtFilter').value == ' ') ) {
		alert('Укажите тему обсуждения');
		return false;	
	}
}

function setCookie(name, value, options)
{
	options = options || {};
	if (value === null) {
		value = '';
		options.expires = -1;
	}
	var expires = '';
	if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
		var date;
		if (typeof options.expires == 'number') {
			date = new Date();
			date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
		} else {
			date = options.expires;
		}
		expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
	}

	// CAUTION: Needed to parenthesize options.path and options.domain
	// in the following expressions, otherwise they evaluate to undefined
	// in the packed version for some reason...
	var path = options.path ? '; path=' + (options.path) : '';
	var domain = options.domain ? '; domain=' + (options.domain) : '';
	var secure = options.secure ? '; secure' : '';
	document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
}

function getCookie (name)
{
	var cookieValue = null;
	if (document.cookie && document.cookie != '') {
		var cookies = document.cookie.split(';');
		for (var i = 0; i < cookies.length; i++) {
			var cookie = trim(cookies[i]);
			// Does this cookie string begin with the name we want?
			if (cookie.substring(0, name.length + 1) == (name + '=')) {
				cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
				break;
			}
		}
	}
	return cookieValue;
}

function trim ( text )
{
	return (text || "").replace( /^\s+|\s+$/g, "" );
}

function set_current_tab (cur_id)
{
	// текущие и таб который нужно подсветить
	var old = $('#search_menu a.active');
	var cur = $('#search_menu a#'+cur_id);
	
	// текущая и новая формы
	var old_form = $('form.'+old.attr('id'));
	var cur_form = $('form.'+cur.attr('id'));
	
	// форма которая отображается
	var form = cur.parents('form');
	var input = $('#form_filter');
	
	if ((cur.length > 0) && !cur.hasClass('active'))
	{
		var html = $('strong', old).html();
		if (html)
			old.html(html);
//		cur.html('<strong>'+cur.html()+'</strong>');
		cur.addClass ('active');
		if (old.length > 0)
			old.removeClass ('active');
		
		if (input.val()=='' || input.val() == old_form.attr('title')) input.attr('placeholder', cur_form.attr('title'));
		
		var href = cur.attr('href');
		href = href.replace (/\?(.)*/, '');
		form.attr('action', href);
		setCookie ('tab', cur_id, {path: '/'});
	}
	
}

function checkfield(){
		var flag = false;
		$('#SearchBlock form').each(function(){	
			if ($('#form_filter').val() == $(this).attr('title')) flag = true; 	
		});
		if (flag) {
			$('#SearchBlock a#form_clear').css('visibility','hidden'); 
		} else {
			$('#SearchBlock a#form_clear').css('visibility','visible');
		}	
}

function load_menu() {
	var tab = getCookie('tab');
	if (tab)
		set_current_tab (tab);
	
	$('#search_menu a').click(function(){
		
		if ( $('#form_filter').val() ) {
			// searching
			var filter = $('#form_filter').val();
			var cur = $('#search_menu a.active');
			var form = $('form.'+cur.attr('id'));		
      
			if (filter && (filter != form.attr('title'))) {
        if ( $(this).attr('id') == 'form_help' ) {
          window.open('http://www.tender.pro/wk/index.php/%D0%A1%D0%BB%D1%83%D0%B6%D0%B5%D0%B1%D0%BD%D0%B0%D1%8F:Search?search='+ $('#form_filter').val() ); 
        } else {
			set_current_tab ($(this).attr('id'));	
			checkfield();
			$('#form_search').submit();
        }   
			return false;
			} else {
       if ( $(this).attr('id') == 'form_help' ) {
          window.open('http://www.tender.pro/wk/index.php');
			return false;
			} else {
				set_current_tab ($(this).attr('id'));
				$('#form_filter').val('');
				var filter = $('#form_filter').val();
				setCookie ('value', filter, {path: '/'});
			} 		
      } 		      
		} else {
			// NOT searching
			$('#form_filter').val('');
			var filter = $('#form_filter').val();
			setCookie ('value', filter, {path: '/'});
			set_current_tab ($(this).attr('id'));		
		}
		
	});
	
	$('#form_search').submit(function(){
  
		var filter = $('#form_filter').val();
		var cur = $('#search_menu a.active');
		var form = $('form.'+cur.attr('id'));
		
		setCookie ('value', filter, {path: '/'});
		if (filter && (filter != form.attr('title')))
		{
			$('input.form_filter', form).val(filter);
			form.submit();
			return false;
		}
		
		var href = $('#search_menu a.active').attr('href');
		href = href.replace (/^(.)*?\?/, '');
		var parts = href.split('&');
		
		for (var i = 0; i < parts.length; i++)
		{
			var param = parts[i].split('=');
			var input = $('<input type="hidden" />').attr('name', param[0]);
			if (param.length > 1)
				input.val(param[1]);
			input.prependTo ($(this));
		}
		
		$('#form_filter').val('');
	});
	
  $('form.form_help').submit(function(){
    window.open('http://www.tender.pro/wk/index.php/%D0%A1%D0%BB%D1%83%D0%B6%D0%B5%D0%B1%D0%BD%D0%B0%D1%8F:Search?search='+ $('#form_filter').val() ); 
    return false;
  });
	
	$('#form_filter').focus(function(){
		var cur = $('#search_menu a.active');
		var form = $('form.'+cur.attr('id'));
		
		if ($(this).val() == form.attr('title'))
			$(this).val('');
	});
	
	var cur = $('#search_menu a.active');
	var form = $('form.'+cur.attr('id'));
	var input = $('#form_filter');
	if ( getCookie('value') && ((input.val() == '') || (input.val() == form.attr('title'))))
		input.val(getCookie('value'));
}

var timer = 0;

$(document).ready(function(){

	// date
	if ( $('.date-select').length ) {
		$('.date-select').datepicker({
		  showOn: 'button',
		  buttonImage: '/styles/as08/images/icons/calendar.gif',
		  buttonImageOnly: true,
		  separator: ' / '
		});
		$('.date-select').each(function(){
			$(this).focus(function(){
				$(this).datepicker('show');
			});	
		});		
	}
	
	// date n time
	if ( $('.date-time-select').length ) {
		$('.date-time-select').datetimepicker({
		  showOn: 'button',
		  buttonImage: '/styles/as08/images/icons/calendar.gif',
		  buttonImageOnly: true,
		  separator: ' / '
		});
		$('.date-time-select').each(function(){
			$(this).focus(function(){
				$(this).datepicker('show');
			});	
		});
	}

	calcboxheight();
	$(window).resize(function(){
		calcboxheight();
	});
	
	var cur = $('#search_menu a.active');
	var form = $('form.'+cur.attr('id'));
	var input = $('#form_filter');
	
	if (input.val() == '')
		input.val(form.attr('title'));	
		
	$("#form_search #form_filter").focus(function () {
		this.style.color = '#000000';	
    });
	
	$("#form_search #form_filter").blur(function () { 
		this.style.color = '#5E5E5E';
    });	
	
	$(".formHeader").click(function() {	
		if ($(this).next('.formHolder').is(":hidden")) { 
			$(this).next('.formHolder').fadeIn('slow');
			$(this).children('.text').removeClass('close');
			$(this).css('border-bottom-color','#fdd55c');
		} else {
			$(this).next('.formHolder').fadeOut('slow');
			$(this).children('.text').addClass('close');
			$(this).css('border-bottom-color','#e6e6e6');
		}	
	});	

	$('.formPopcomment .popupico').hover(	
	  function () {
		clearTimeout(timer);
		var obj = $(this);
		createnshow(obj);
	  },
	  function () { 
		timer = setTimeout( function (){
			hidebox();
		}, 500 );	
		if($.browser.msie && jQuery.browser.version.substr(0,1)=="6") $(this).parents('.formHolder').find('select').css('visibility','visible');	
	});
	
	$('.formPopcomment .textField, .formPopcomment .inputPopup').focus(function () {
		if ( $(this).parents('.formLine').find('.popupico').length ) {
			clearTimeout(timer);
			if($.browser.msie && jQuery.browser.version.substr(0,1)=="6") $(this).parents('.formHolder').find('select').css('visibility','visible');
			var obj = $(this);
			createnshow(obj);
		}		
    });	
	
	$('.formPopcomment .textField').blur(function () {
		timer = setTimeout( function (){
			hidebox();
		}, 500 );	
		if ( $(this).parents('.formLine').find('.popupico').length ) {
			if($.browser.msie && jQuery.browser.version.substr(0,1)=="6") $(this).parents('.formHolder').find('select').css('visibility','visible');
		}	
    });
	
	function hidebox(){
		$('#Popbox1').css('visibility','hidden');
		$('#Popbox2').css('visibility','hidden');
	}
	
	function createnshow(obj){
		if ( (obj.parents('.formLine').find('.popuptext').text()).replace(/\s/g,"") !='') {
		//создаем обертку держатель камента 1 и 2
		if (!$('#Popbox1').length) $('body').prepend('<div id="Popbox1" class="popupcoment"><div class="pccontent"><div class="gBox fixpng-dd"><div class="wrap1"><div class="wrap2 fixpng-dd"><div class="topHolder"><div class="tl fixpng-dd"></div><div class="bottomHolder"><div class="bottomBg fixpng-dd"><div class="gContent"></div><div class="bl fixpng-dd"></div></div></div><div class="tr fixpng-dd"></div></div></div></div></div></div></div>');
		if (!$('#Popbox2').length) $('body').prepend('<div id="Popbox2" class="popupcoment"><div class="pccontent"><div class="gBox fixpng-dd"><div class="wrap1"><div class="wrap2 fixpng-dd"><div class="topHolder"><div class="tl fixpng-dd"></div><div class="bottomHolder"><div class="bottomBg fixpng-dd"><div class="gContent"></div><div class="bl fixpng-dd"></div></div></div><div class="tr fixpng-dd"></div></div></div></div></div></div></div>');	
		// передаем значение камента из спрятаного блока в держатель 1 ( он дефолтный )
		$('#Popbox1 .gContent').html( obj.parents('.formLine').find('.popuptext').html() );	
		$('#Popbox2 .gContent').html( obj.parents('.formLine').find('.popuptext').html() );		
		//позицинируем обертку держатель относительно иконки		
		var ico = obj.parents('.formLine').find('.popupico');
		//вертикально
		$('#Popbox1').css('top',ico.offset().top+8);
		$('#Popbox2').css('top',ico.offset().top+8);
		// горизонтально в зависимоти от размера по ширине камента, выбераем обертку 1 или 2
		if ( ( $('#Content').width() + $('#Content').offset().left - (ico.offset().left+16) )  < $('#Popbox1').width() ) {
		// блок не помещаеться с права, мало места, показуем его слева от иконки		
			//показуем обертку держатель 2
			$('#Popbox2').css('visibility','visible');
			$('#Popbox1').css('visibility','hidden');
			$('#Popbox2').css('left', ( ico.offset().left - $('#Popbox2').width()) );
		} else { 
			//показуем обертку держатель 1
			$('#Popbox1').css('visibility','visible');
			$('#Popbox2').css('visibility','hidden');
			$('#Popbox1').css('left',ico.offset().left+16);
		}
		//скрываем селекты в ие6
		if($.browser.msie && jQuery.browser.version.substr(0,1)=="6") obj.parents('.formHolder').find('select').css('visibility','hidden');
	}
	}
	
	checkfield();
	
	$('#SearchBlock #form_filter').keyup(function(){  
		$('#SearchBlock #form_filter').val() != '' ? $('#SearchBlock a#form_clear').css('visibility','visible') : $('#SearchBlock a#form_clear').css('visibility','hidden');	
	});
	
	$('#SearchBlock a#form_clear').live('click', function() {
		$('#SearchBlock #form_filter').val('');	
		$('#SearchBlock a#form_clear').css('visibility','hidden');
		var filter = $('#form_filter').val(); 
		setCookie ('value', filter, {path: '/'});	
		return false;
	});
	
	// тянет серый бордер до самого низа
	function calcboxheight() {
		!($.browser.msie && jQuery.browser.version.substr(0,1)=="6") ? $('#Content > .thinBlock .rbCorner:first').css('min-height', getDocHeight() - ( $('#Content > .thinBlock:first').position.top + $('#footer').height() ) - 3 ) : "";	
	}
	
	/* langbox dropdown */
	$('#LangUp').hover(
	function(){
		$(this).parent().find('.langBox').fadeIn(300);
	},
	function(){});	
	
	$('.langBox').hover(
	function(){
		$(this).fadeIn(300);
	},
	function(){
		$(this).fadeOut(300);
	});	
	
	//Informers page tabs change handler
	$('#Tabs > li, #WidgetTabs > li').bind('click', function() {
		var tabs = '#' + $(this).parents('ul').attr('id');

		$(tabs + ' > li').removeClass('active');
		$(tabs + 'Content > li').removeClass('active');
		$(this).addClass('active');
		$(tabs+ 'Content > li:eq(' + $(this).index() + ')').addClass('active');
	});

});

function size_ok(sIdTextString, iStringLen) {
	if (document.getElementById(sIdTextString).value.length > iStringLen) {
		alert('Текст не может быть длинее '+iStringLen+' символов!');
		return false;
	}
	return true;
}

var $buoop = {
	vs:{i:7,f:0,o:0.0,s:0,n:0},  
	reminder: 336, 
	test: false,                    
	newwindow: true               
}
$buoop.ol = window.onload; 
window.onload=function(){

 // тригер наличия включенного джс
 document.body.id = 'js';
 // панель регистрации
 regpanel();
	
 if ($buoop.ol) $buoop.ol(); 
 var e = document.createElement("script"); 
 e.setAttribute("type", "text/javascript"); 
 e.setAttribute("src", "js/update.js"); 
 document.body.appendChild(e); 
} 

function regpanel(){
	
	if (window.location.pathname !== '' && window.location.pathname !== '/' && window.location.pathname !== '/registration'  && window.location.pathname !== '/index_ref.shtml' && window.location.pathname !== '/not_auth.shtml' && window.location.pathname !== '/cabinet/info') {
	
		function getUrlVars(){
			var vars = [], hash;
			var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
			for(var i = 0; i < hashes.length; i++)
					{
					hash = hashes[i].split('=');
					vars.push(hash[0]);
					vars[hash[0]] = hash[1];
					}
			return vars;
		 }

		var hash = getUrlVars();	
		
		if ( (!(hash['sid'])) && !(getCookie('regpanel')) ) {
		
			$('body').prepend('<div id="RegPan" style="display: none;"><div class="content"><p>Для полного доступа к системе <b>зарегистрируйтесь бесплатно</b>.</p><div class="cntrlbox"><a href="/promo.shtml">Презентация системы</a>&nbsp;&nbsp;&nbsp;<a class="rbtn" title="Зарегистрироваться" href="/registration"><span class="wrap">Зарегистрироваться</span></a>&nbsp;&nbsp;&nbsp;<a href="#" title="Закрыть" id="RegPanClose"></a></div></div></div>');
			
			$('#RegPan').slideDown('slow');
			
			$('#RegPanClose').live('click', function(){
				setCookie('regpanel', 'true', {path: '/', expires: 7});
				$('#RegPan').slideUp('slow');		
				return false;	
			});
		}	
	}	
	
}

function getDocHeight() {
	var D = document;
	return Math.max(
		Math.max(D.body.scrollHeight, D.documentElement.scrollHeight),
		Math.max(D.body.offsetHeight, D.documentElement.offsetHeight),
		Math.max(D.body.clientHeight, D.documentElement.clientHeight)
	);
};
