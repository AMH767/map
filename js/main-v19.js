function addLink(){var selection=window.getSelection();pagelink="<br><br>Источник: https://productcenter.ru";copytext=selection+pagelink;if(selection.length<200)return;newdiv=document.createElement('div');newdiv.setAttribute("id","copydiv");newdiv.style.position='absolute';newdiv.style.left='-99999px';document.body.appendChild(newdiv);newdiv.innerHTML=selection;if($(newdiv).text().length<250)return;newdiv.innerHTML=copytext;selection.selectAllChildren(newdiv);window.setTimeout(function(){document.body.removeChild(newdiv)},100)}
document.addEventListener('copy',addLink);timer_semantic='';$(document).on('click','.autocomplete-suggestion a',function(){text=$(this).text();url=$(this).attr('href');id=$(this).data('id');$.post('/ajax/search_hit',{text:text,url:url,id:id})});window.overlay_lock=!1;function overlay_show(){$('#overlay').addClass('active').find('.uni_loader').addClass('active')}
function overlay_hide(){if(!window.overlay_lock)
overlay_hide_force();}
function overlay_hide_force(){$('#overlay').removeClass('active').find('.uni_loader').removeClass('active')}
function load_page(){page_loading=!0;window.page++;if(typeof window.paginator_version_2=='boolean'){$.get(window.location.href,{ajax:1,page:window.page},function(data){data=JSON.parse(data);if(data.items.length){$('.loader').before(data.items);$('.items .img_check, .map_card .img_check').each(function(){if($(this).find('i').length<2){$(this).find('i').css('position','static')}});window.page_loading=!1;$('#next_page').parent().show().css('visibility','visible')}else{window.smart_scroll==!1;if(window.see_also_trigger){see_also()}}
$('.pagination > .page_links').replaceWith(data.pagination)
$('.loader').hide();overlay_hide()}).fail(function(){window.page_loading=!1;$('.pagination').show();$('.loader').hide();$('#next_page').hide();overlay_hide()})}else{$.get(window.location.href,{ajax:1,page:window.page},function(data){if(data.length>20){$('.loader').before(data);$('.items .img_check, .map_card .img_check').each(function(){if($(this).find('i').length<2){$(this).find('i').css('position','static')}});window.page_loading=!1;$('#next_page').parent().show().css('visibility','visible')}else{window.smart_scroll==!1;if(window.see_also_trigger){see_also()}}
$('.loader').hide();overlay_hide()}).fail(function(){window.page_loading=!1;overlay_hide()})}}
function window_done(title,text,button_text){return window_custom('mw_uni_done',title,text,button_text)}
function window_fail(title,text,button_text){return window_custom('mw_uni_error',title,text,button_text)}
function window_custom(div_class,title,text,button_text){$('#ModWin_UniDone').attr('class','modwin').addClass(div_class).find('.title').text(title);$('#ModWin_UniDone').find('.text').html(text);$('#ModWin_UniDone').find('.btn').text(button_text);$.fancybox.open({src:'#ModWin_UniDone'})}
function set_main_img(obj,img){jQuery('#add_img img').removeClass('thumbnail-selected');obj.addClass('thumbnail-selected');jQuery('#main_photo').val(img)}
function remove_img(obj){if(obj.next().hasClass('thumbnail-selected')){jQuery('#main_photo').val('')}
id=obj.next().val();$.post('/ajax/remove_image',{id:id});obj.parent().remove();return!1}
jQuery.extend({handleError:function(s,xhr,status,e){if(s.error)
s.error(xhr,status,e);else if(xhr.responseText)
console.log(xhr.responseText);}});function ajaxNewsUpload(){overlay_show();jQuery.ajaxFileUpload({url:'/upload-photo/',secureuri:!1,fileElementId:'fileToUpload2',dataType:'json',success:function(data,status){if(typeof(data.error)!='undefined'){if(data.error!=''){alert(data.error)}else{html='<div class="image">'+'  <s class="uni_close" title="Удалить" onclick="$(this).parent().remove();"></s>'+'    <img src="'+data.file+'" id="photo">'+'  <input type="hidden" name="photo" value="'+data.file_id+'" />'+'</div>';$('.img_load > image').remove();$('.img_load > div').before(html)}}
overlay_hide()},error:function(data,status,e){alert(e);overlay_hide()}})
return!1}
function ajaxFileUpload(){count_photos=$('#add_img > media_block').length-1;if(count_photos>=30){alert('Не более 30 фотографий на одну экспозицию.');return!1}
jQuery("#photo_loading").show();jQuery.ajaxFileUpload({url:'/upload-photo/',secureuri:!1,fileElementId:'fileToUpload',dataType:'json',beforeSend:function(){jQuery("#photo_loading").show()},complete:function(){jQuery("#photo_loading").hide()},success:function(data,status){if(typeof(data.error)!='undefined'){if(data.error!=''){alert(data.error)}else{title='Обложка';if(typeof(window.photos_replace_text)!='undefined')title='Логотип';$html='<div class="media_block">'+'    <s class="uni_close" onclick="javascript: remove_img(jQuery(this));" title="Удалить"></s>'+'    <div class="media_file"><img src="'+data.file+'"></div>'+'    <input class="input" type="text" placeholder="Описание..." value="" name="photo_description[]">'+'    <div class="check_radio">'+'        <input type="radio" onclick="javascript: set_main_img(jQuery(this), \''+data.file_id+'\')" name="obl">'+'        <label>'+title+'</label>'+'    </div>'+'    <input type="hidden" value="'+data.file_id+'" name="photo[]">'+'</div>'
jQuery('#photo_loading').before($html);if(jQuery('#add_img > .media_block').length==2){jQuery('#add_img input[name="obl"]').attr('checked','checked');jQuery('#main_photo').val(data.file_id)}}}},error:function(data,status,e){alert(e)}})
return!1}
function photoUploader_load_by_url(id){count_photos=$('div.upload.images > div').length-1;if(count_photos>=30){alert('Не более 30 фотографий на одну экспозицию.');return!1}
result=jQuery(id).val();if(result){jQuery("#photo_loading").show();descr=jQuery('#photo-description').val();jQuery.post('/upload-photo/',{type:'url',url:result,description:descr},function(data_request){data=jQuery.parseJSON(data_request);if(typeof(data.error)!='undefined'){if(data.error!=''){alert(data.error)}else{title='Обложка';if(typeof(window.photos_replace_text)!='undefined')title='Логотип';$html='<div class="media_block">'+'    <s class="uni_close" onclick="javascript: remove_img(jQuery(this));" title="Удалить"></s>'+'    <div class="media_file"><img src="'+data.file+'"></div>'+'    <input class="input" type="text" placeholder="Описание..." value="" name="photo_description[]">'+'    <div class="check_radio">'+'        <input type="radio" onclick="javascript: set_main_img(jQuery(this), \''+data.file_id+'\')" name="obl">'+'        <label>'+title+'</label>'+'    </div>'+'    <input type="hidden" value="'+data.file_id+'" name="photo[]">'+'</div>'
jQuery('#photo_loading').before($html);if(jQuery('#add_img > .media_block').length==2){jQuery('#add_img input[name="obl"]').attr('checked','checked');jQuery('#main_photo').val(data.file_id)}
jQuery('#photo-url').val('')}}
jQuery("#photo_loading").hide()})}else{alert('Сначала введите URL (ссылку) на изображение')}
return!1}
$('#upload-video').on('click',function(event){event.preventDefault();video_url=$('#video-url').val();if(video_url.length<5){alert('Введите корректную ссылку на ролик в YouTube.');return!1}
var myregexp=/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;var videoID=video_url.match(myregexp);videoID=videoID[1];html='<div class="media_block">'+'    <s class="uni_close" title="Удалить" onclick="javascript: remove_img(jQuery(this));"></s>'+'    <div class="media_file video"><a target="_blank" href="https://www.youtube.com/watch?v='+videoID+'"><img data-href="https://www.youtube.com/watch?v='+videoID+'" src="http://i2.ytimg.com/vi/'+videoID+'/hqdefault.jpg"></a></div>'+'    <input type="hidden" value="'+videoID+'" name="video[]">'+'</div>'
jQuery('#photo_loading').before(html);$('#video-url').val('');return!1});function ajaxFilesUpload(file_type){if(file_type=='price')file_type='price-list';jQuery("#files_loading").show();jQuery.ajaxFileUpload({url:'/upload-file/',secureuri:!1,fileElementId:'filesToUpload',dataType:'json',beforeSend:function(){jQuery("#files_loading").show()},complete:function(){jQuery("#files_loading").hide()},success:function(data,status){if(typeof(data.error)!='undefined'){if(data.error!=''){alert(data.error)}else{$html='<div data-href="/uploads/'+data.id+'/" class="file_block '+file_type+'">'+'   <s class="uni_close" title="Удалить" onclick="javascript: remove_img(jQuery(this)); return false;"></s>'+'   <div class="icon"><svg class="svg _icon_text_list"><use xlink:href="#icon_text_list"></use></svg></div>'+'   <div class="text">'+'       <a href="/uploads/'+data.id+'/">'+data.name+'</a>'+'       <small>PDF '+data.size+' </small>'+'   </div>'+'   <input type="hidden" value="'+data.id+'" name="files[]"> '+'   <input type="hidden" value="'+data.name+'" name="files_name[]"> '+'   <input type="hidden" value="'+data.size+'" name="files_size[]"> '+'   <input type="hidden" value="'+file_type+'" name="files_type[]"> '+'</div>';jQuery('#files_loading').before($html)}}},error:function(data,status,e){alert(e)}})
return!1}
$(window).on('load',function(){$('.imgs_slider').lightSlider({gallery:!0,item:1,slideMargin:0,thumbMargin:10,thumbItem:5,enableTouch:!0})});$(document).ready(function(){$(".chosen, .chosen-select").chosen();$('#srch').autocomplete({serviceUrl:'/ajax/get_search_suggestions',type:'POST',dataType:'json',minChars:3,onSelect:function(suggestion){window.location.href=suggestion.data},formatResult:function(suggestion,currentValue){return'<a data-id="'+suggestion.id+'" href="'+suggestion.data+'">'+suggestion.value+'</a>'}});$(function(){$(document).on('mouseenter','.cards .card_item .image .img_mark',function(){var index=$(this).index();$(this).parents('.image a').find('img').addClass('hidden').removeClass('visible');$(this).parents('.image a').find('img').eq(index).removeClass('hidden').addClass('visible')})
$(document).on('mouseleave','.cards .card_item .image .img_marks',function(){$(this).parent('a').find('img').addClass('hidden').removeClass('visible');$(this).parent('a').find('img:first').addClass('visible')})});$('.prc').on('click','[data-action="order"]',function(){product_id=$(this).data('product-id');url='/ajax/order_form?product_id='+product_id
if(!product_id){producer_id=$(this).data('producer-id');url='/ajax/order_form?producer_id='+producer_id}
$.fancybox.open({src:url,type:'ajax',opts:{touch:!1}})
return!1})
$('.prc').on('click','[data-action="order-price"]',function(){producer_id=$(this).data('producer-id');product_id=$(this).data('product-id');url='/ajax/order_pricelist_form?';if(!isNaN(producer_id)){url+='producer_id='+producer_id}
if(!isNaN(product_id)){url+='product_id='+product_id}
$.fancybox.open({src:url,type:'ajax',opts:{touch:!1}})
return!1})
$('.prc').on('click','[data-action="modal-price-lists"]',function(){producer_id=$(this).data('producer-id');product_id=$(this).data('product-id');url='/ajax/get_price_modal_window?';if(!isNaN(producer_id)){url+='producer_id='+producer_id}
if(!isNaN(product_id)){url+='product_id='+product_id}
$.fancybox.open({src:url,type:'ajax',opts:{touch:!1}})
return!1})
window.page_loading=!1;if(isNaN(window.page))
window.page=1;$('#try-load-again a, #next_page').bind('click',function(){load_page();$('#try-load-again a, .pagination').css('visibility','hidden');overlay_show();return!1});$('.comments-wrapper').on('click','[data-action="comments-reply"]',function(e){comment_id=$(this).data('comment-id');type=$(this).data('item-type');elem=$(this).closest('.comments-wrapper').find('.comment-wrapper.answer.form_msg');elem.show();$('#comment-'+comment_id).after(elem);elem.find('input[name="parent_id"]').val(comment_id);elem.find('input[name="type"]').val(type);return!1});$('.comments-wrapper .ask_form').on('submit',function(e){e=$(this);window.overlay_lock=!0;overlay_show();params=$(this).closest('form').serialize();window.parent_id=parseInt($(this).closest('form').find('input[name="parent_id"]').val());type_id=parseInt($(this).closest('form').find('input[name="type"]').val());smart_token=$(this).closest('form').find('input[name="smart-token"]').val()
smart_captcha_el=$(this).closest('form').find('.smart-captcha');if(smart_captcha_el.length&&smart_token.length<10){alert('Необходимо подтвердить, что Вы - не робот.');window.overlay_lock=!1;overlay_hide();return!1}
comments_div=$(this).closest("div.comments-wrapper");$.post('/ajax/post_comment',params,function(data){if(data=='err_1'){alert('Вы не указали контактных данных')}else if(data=='category_err'){alert('Выберите категорию.')}else if(data=='err_content'){alert('Заполните все текстовые поля отзыва!')}else if(data=='err_rating'){alert('Поставьте вашу оценку.')}else if(data.length>10){data=$.parseJSON(data);if(window.parent_id>0){$('#comment-'+window.parent_id).after(data)}else{if(type_id==6){alert(data.message);window.location.reload()}else{comments_div.prepend(data);alert('Сообщение отправлено, если производитель не ответит Вам в течение суток — свяжитесь с ним по телефону во вкладке «Контакты»')}}
$('.comment-wrapper.new').show(0).queue(function(){$('html, body').animate({scrollTop:($(this).offset().top-20)},320);$(this).animate({opacity:'1'},2000)
$(this).dequeue();$(this).queue(function(){$(this).removeClass('new');$(this).dequeue()})});e.trigger("reset");comments_div.find('.comment-wrapper textarea[name="content"]').val('')}
window.overlay_lock=!1;overlay_hide()});return!1});$('[data-action="comments-more"]').on('click',function(e){e=$(this);if(typeof(window.comments_page)=="undefined"){window.comments_page=1}
window.comments_page ++;$id=$(this).data('item-id');$type=$(this).data('item-type');$page=window.comments_page;appendto=$(this).closest('.comments-wrapper');$.post('/ajax/load_comments',{page:$page,id:$id,type:$type},function(data){data=$.parseJSON(data);if(!data.has_more){e.remove()}
$(e).before(data)})});$('.sidebar .offers a').on('click',function(){window.yaCounter156713.reachGoal('invite_dilers')})
$('#ModWin_AskPRC form').on('submit',function(e){params=$(this).serialize();name=$('#ModWin_AskPRC input[name="name"]').val();email=$('#ModWin_AskPRC input[name="email"]').val();content=$('#ModWin_AskPRC textarea[name="content"]').val();overlay_show();$.post('/ajax/feedback',params,function(data){if(data==1){alert('Ваше сообщение успешно отправлено!');$('#ModWin_AskPRC form').trigger('reset')}else{alert('Не удалось отправить сообщение! Заполните все поля и попробуйте еще раз.')}
overlay_hide();$.fancybox.close()});e.preventDefault()});$('.hndl_activate_orders_show_contacts').on('click',function(e){overlay_show();$.post('/ajax/orders_show_contacts',function(data){if(data=='1'){alert('Услуга успешно подключена.');window.location.reload()}else{alert('Недостаточно средств. Пополните счет и повторите попытку.')}
overlay_hide()});e.preventDefault()});$('[data-action="comments-show-contacts"]').on('click',function(e){$.fancybox.open({src:'#ModWin_AccessContacts'});return!1});$('[data-action="demand-show-contacts"]').on('click',function(e){$.fancybox.open({src:'#ModWin_AccessContactsDemand'});return!1});$('.rating_stars').on('click',function(pos){w=$(this).width();rate=Math.ceil(pos.offsetX*5/w);$(this).find('.rating_stars_mask').css('width',(rate*20)+'%');$(this).closest('form').find('input[name="rating"]').val(rate);return!1});$('.btn_ask').on('click',function(){$('.tab_questions').click();window.yaCounter156713.reachGoal('ask-question');$('html, body').animate({scrollTop:($('.tc_questions form.add_comment').offset().top-20)},500);return!1});$('#login-form-submit').on('click',function(){$('#login-form').submit();return!1})
$('#login-form').on('submit',function(){$(this).find('input').removeClass('error');email=$(this).find('input[name="email"]').val();if(email.length<3){$(this).find('.error_msg').text('Введите Ваш email').show();$(this).find('input[name="email"]').addClass('error').focus();return!1}
pass=$(this).find('input[name="pass"]').val();if(pass.length<=0){$(this).find('.error_msg').text('Введите Ваш пароль').show();$(this).find('input[name="pass"]').addClass('error').focus();return!1}
$(this).find('.error_msg').hide();form_data=$(this).serialize();$.post('/ajax/login2',form_data,function(data){data=JSON.parse(data);if(data.result>0){if(typeof(window.login_redirect)!='undefined'){window.location.href=window.login_redirect}else{window.location.href='/'}}else{$('#login-form').find('.error_msg').text('Вы ввели неверный логин или пароль').show();$('#login-form').find('input[name="pass"]').addClass('error').focus()}})
return!1});$('.month_goods a').on('click',function(){window.yaCounter156713.reachGoal('invite_dilers')})
$('#svg_icons').load('/img/all_icons.svg');$('[data-fancybox').fancybox({touch:!1});$('.header .rfi_srch, .header .rfi_menu').click(function(){$(this).toggleClass('active')});$('.header .rfi_srch').on('click',function(){$('.search_block').toggleClass('active');setTimeout(function(){$('.search_block.active .input').focus()},420)});$('.header .rfi_menu').click(function(){$('body').toggleClass('ovh');$('.nav_menu').toggleClass('active')});$(window).scroll(function(){if($(this).scrollTop()>=400){$('.to_top').addClass('fixed')}else{$('.to_top').removeClass('fixed')}});$('.to_top').click(function(){$("html, body").animate({scrollTop:0},600);return!1});$(window).scroll(function(){if($(this).scrollTop()>=400){$('.search_block').addClass('fixed')}else{$('.search_block').removeClass('fixed')}});$('.btn.show_content').click(function(){$(this).hide();$(this).parent().addClass('show_full')});$('#items_regions, #firms_rubrics, #firms_regions').hide()
$('.catalog_tabs > div > span.link').on('click',function(){$(this).parent().find('span').removeClass('active');$(this).addClass('active');tab_id=$('.catalog_tabs span.active[data-rel]').data('rel')+'_'+$('.catalog_tabs span.active[data-type]').data('type');$('.catalog_list').hide();$("#"+tab_id).fadeTo(720,1).show().css('display','flex')});$('.main_catalog .show_links').click(function(){$(this).toggleClass("active").next().slideToggle(240)});$('.nav_menu .nav_links .link_title.clh_firms').mouseover(function(){$('.nav_menu .catalog_list.firms').addClass('active')});$('.nav_menu .nav_links .link_title.clh_firms').mouseout(function(){$('.nav_menu .catalog_list.firms').removeClass('active')});$('.nav_menu .nav_links .link_title.clh_products').mouseover(function(){$('.nav_menu .catalog_list.products').addClass('active')});$('.nav_menu .nav_links .link_title.clh_products').mouseout(function(){$('.nav_menu .catalog_list.products').removeClass('active')});$('.central .call_cabinet_menu').click(function(){$('.content .sidebar .sb_block.cabinet_links').toggleClass('active')});$('.content .sidebar .sb_block.cabinet_links .uni_close').click(function(){$(this).parents('.sb_block.cabinet_links').toggleClass('active')});$(document).on('click',"[data-action='add2favorites']",function(){item_type=$(this).data('item-type');item_id=$(this).data('item-id');set_status='1';if($(this).hasClass('added')){set_status='0';$(this).removeClass('added')}else{$(this).addClass('added')}
$.post('/ajax/add2favorites',{item_type:item_type,item_id:item_id,set_status:set_status})})
$('.content .central .sort .sort_mark.show_map').click(function(){});$('.central .sort .filter_call').click(function(){$('.content .sidebar .sb_block.filter').toggleClass('active')});$('.content .sidebar .sb_block.filter .uni_close').click(function(){$(this).parents('.sb_block.filter').toggleClass('active')});$('.central .rubrics_list_call').click(function(){$('.content .sidebar .sb_block.sb_news_rubric').toggleClass('active')});$('.content .sidebar .sb_block.sb_news_rubric .uni_close').click(function(){$(this).parents('.sb_block.sb_news_rubric').toggleClass('active')});$('.modwin.mw_sign_in .modwin_body .recovery_pass, .modwin.mw_sign_in .modwin_body .go_back').click(function(){$('.modwin.mw_sign_in .title').text($('.modwin.mw_sign_in .title').text()=='Вход'?'Восстановление пароля':'Вход');$('.modwin.mw_sign_in form').toggleClass('active')});$('#password-recovery').on('submit',function(){formdata=$(this).serialize();overlay_show();$.post('/ajax/password_recovery',formdata,function(data){alert(data);overlay_hide()});return!1})
$(function(){var $first=$('.sb_block.offers .sbb_offer_item:first'),$last=$('.sb_block.offers .sbb_offer_item:last');$('.sb_block.offers .slide.next').click(function(){var $next,$selected=$('.sbb_offer_item.active');$next=$selected.next('.sbb_offer_item').length?$selected.next('.sbb_offer_item'):$first;$selected.removeClass("active").hide();$next.addClass('active').show()});$('.sb_block.offers .slide.prev').click(function(){var $prev,$selected=$('.sbb_offer_item.active');$prev=$selected.prev('.sbb_offer_item').length?$selected.prev('.sbb_offer_item'):$last;$selected.removeClass("active").hide();$prev.addClass('active').show()})});$('.item_view .iv_conditions .iv_block_body .link').click(function(){$(this).text($(this).text()=='Ознакомиться с условиями'?'Скрыть условия':'Ознакомиться с условиями');$(this).parents().next('.hide_text').slideToggle(80)});$('.iv_bottom .iv_about .tabs_header').on('click','li:not(.active)',function(){$(this).addClass('active').siblings().removeClass('active').closest('.iv_bottom .iv_about').find('.tab_content').removeClass('active').eq($(this).index()).addClass('active')});$('.service_item > .help_link').on('click',function(){$(this).next('.help_text').slideToggle(80)})})