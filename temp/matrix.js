var api_url = 'http://api.vokino.tv/'


$(document).ready(function(){
var auth_token = localStorage.getItem('auth_token')
	// if(localStorage.getItem('new_ad') == null){
	// 	$.notify("注意!!! \n  亲爱的用户，经过昨晚的技术工作: 更改和更新，我们也改变了数据库的结构。 \n 由于有很多 \"死灵\" (未激活的帐户), 我们决定重做并清理这部分数据库 =) \n 所以重新注册)", {
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
								// $('#devices_list').append('<div id="'+ device +'"><div class="b-devices__name">设备 '+ parseInt(i+1) +'</div><div class="b-devices__value device_name">'+device+'</div><div data-name="'+ device +'" class="e-setting__value selector st-selector device_remove">删除</div></div>')
								var truth = device.this_device ? '<span style="color:green"> - 这个设备</span>' : ''
								var remove = !device.this_device ? '<div data-name="'+ device.token +'" class="e-setting__value selector st-selector device_remove" data-area="settings">禁用</div>' : '<div class="e-setting__value selector st-selector" data-area="settings">这个设备不能被禁用</div>'
								$('#devices_list').append('<div id="'+ device.name +' e-setting"><div class="e-setting__name">设备 '+ parseInt(i+1) +' ('+device.name+') - ID 支持 '+device.device_id+' - 添加 '+device.created_at + truth + '</div>'+remove+'</div>')
							
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
							$.notify('设备删除!', {className:'success'})
						}
						else $.notify(data.error,{className:'error'})
				},
				error: function(error){
					$.notify('错误!',{className:'error'})
				}
			})		
		
	})	

});
