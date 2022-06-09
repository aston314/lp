var api_url = 'http://api.vokino.tv/'


$(document).ready(function(){
var auth_token = localStorage.getItem('auth_token')
	// if(localStorage.getItem('new_ad') == null){
	// 	$.notify("ВНИМАНИЕ!!! \n  Уважаемые пользователи, после технических работ: внесении правок и обновлений, проведенных этой ночью, мы так же сменили структуру базы данных. \n В связи с тем что было много \"мертвых душ\" (аккаунтов которые не активны), мы решили просто эту часть базы переделать и очистить =) \n Так что заново регистрируемся)", {
	// 				className: "white",autoHideDelay: 10000
	// 			});
	// 	localStorage.setItem('new_ad',true);
	// }
	
	$('#get_devices').on('hover:enter',function(){
		var auth_token = localStorage.getItem('auth_token')
		if(auth_token != 'undefined'){
			$.ajax({
				dataType: 'json',
				url: api_url+'user_devices?token='+auth_token,
				success: function(data){
						if(typeof data.error == 'undefined'){
							$('#devices_list').html('')
							$.each(data, function(i,device){
								// $('#devices_list').append('<div id="'+ device +'"><div class="b-devices__name">设备 '+ parseInt(i+1) +'</div><div class="b-devices__value device_name">'+device+'</div><div data-name="'+ device +'" class="e-setting__value selector st-selector device_remove">Удалить</div></div>')
								var truth = device.this_device ? '<span style="color:green"> - 此设备</span>' : ''
								var remove = !device.this_device ? '<div data-name="'+ device.token +'" class="e-setting__value selector st-selector device_remove" data-area="settings">禁用</div>' : '<div class="e-setting__value selector st-selector" data-area="settings">无法禁用此设备</div>'
								$('#devices_list').append('<div id="'+ device.name +' e-setting"><div class="e-setting__name">Устройство '+ parseInt(i+1) +' ('+device.name+') - ID 支持 '+device.device_id+' - 已添加 '+device.created_at + truth + '</div>'+remove+'</div>')
							
							})
						}
						else $.notify(data.error,{className:'error'})
				},
				error: function(error){
					$.notify(error,{className:'error'})
				}
			})	
		}
		else $('#no_auth_devices').removeClass('hide')
		
	})
	$(document).on('click hover:enter','.device_remove',function(){
		auth_token = localStorage.getItem('auth_token')
		// console.log('action')
		var remove_token = $(this).data('name')
		$.ajax({
				dataType: 'json',
				url: api_url+'user_devices/remove?token='+auth_token+'&remove_token='+remove_token,
				success: function(data){
						if(typeof data.error == 'undefined'){
							$('#'+remove_token).remove();
							$.notify('设备已删除!', {className:'success'})
						}
						else $.notify(data.error,{className:'error'})
				},
				error: function(error){
					$.notify('错误!',{className:'error'})
				}
			})		
		
	})	

});