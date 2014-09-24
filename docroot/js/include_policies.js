function getList(data){
	var td = [];
	$.each(data.data, function(k,v){
		$.each(v, function(k2,v2){
			data.data[k][k2] = getDefiniton(k2,v2);
		});
		td.push(v)
	});
	return td;
}

function crossData(data){
	var temp = data.master;
	var temp2 = [];
	$.each(data.master, function(k,v){
		$.each(v, function(k1,v1){
			if(k1.indexOf('_name') > -1){
				temp2.push({
					id: v.id,
					push_val: 0,
				}) 
				temp2[k][k1] = data.master[k][k1];
				if(getValid(data.slave)){
					$.each(data.slave, function(k2,v2){
						if(v.id == v2[data.rel]){
							temp2[k]['push_val'] = 1;
							return false;
						}
					})
				}
			}
		})
	});
	return temp2;
}

function getValid(val){
	var status, type = typeof val;
	switch(type){
		case'object':
			status = (Object.keys(val).length != 0)
		break;
		case'array':
			status = (val.length != 0)
		break;
		case'string':
			status = (val != '')
		break;
	}
	return status
}

function getLength(val){
	var length, type = typeof val;
	switch(type){
		case'object':
			length = Object.keys(val).length;
		break;
		case'array':
			length = val.length >= 1;
		break;
		case'string':
			length = false;
		break;
	}
	return length
}

// user defined definition from js/definition.js
function getDefiniton(k,v){
	if(typeof definitions[k] != 'undefined'){
		return definitions[k][v];
	} else {
		return v;
	}
}

function pushTable(td,filter){
	var fields = []
	var get_fields = (typeof filter != 'undefined')? filter.list: td[0];
	$.each(get_fields, function(k,v){
		var get_v = (typeof filter != 'undefined')? v: getDefiniton('fields_device',k);
		fields.push({ field: k, title: get_v})
	});
	fields.push({ field: 'id', title: 'Details', encoded: false, format: "<a class='more-button' href='#' onclick='pushMoreDetails({0});'>More</a>" });

	// constuct page list item
	var grid = $(".compare").kendoGrid({
		dataSource: {
			data: td,
			autoBind: false,
			schema: {
				model: {
					id: "id",
					fields: fields
				}
			},
			pageSize: 5
		},
		selectable: "row",
			sortable:{
			mode: "single",
			allowUnsort: false
		},
		scrollable: false,
		pageable: true,
		columns: fields
	});

	// constuct search filter
	$("#search").kendoAutoComplete({
		dataTextField: "profile_name",
		dataValueField: "profile_name",
		dataSource: td,
		change: function() {
			var filtered;
			var value = this.value();
			if (value) {
				grid.data("kendoGrid").dataSource.filter({ field: "profile_name", operator: "contains", value: value });
			} else {
				grid.data("kendoGrid").dataSource.filter({});
			}
		}
	});
}

function pushMoreDetails(id){
	getMoreDetails(id)
	// Liferay.fire('getPolicyDetails',{
	//     id: clickData.id
	// });
	return false;
}

function getMoreDetails(id){
	$('.form_actions').hide();
	$.ajax({
		url: "http://10.1.66.105/wspolicy/detail/all/"+id,
		type: "GET",
		dataType: "json",
		crossDomain: true,
		success: function(response){
			console.log(response)
			// console.log(JSON.stringify(response))
			var disabledTab = []; // list of tab index to be disabled
			var i = 0, getset, temp;

			$.each(listData.details, function(k,v){ 
				if(typeof v.rel != 'undefined'){
					var rel = v.rel.split('.');
					var cross_data = {
						master: response[rel[0]],
						slave: response[v.set],
						rel: rel[1]
					}
					var temp2 = crossData(cross_data);
					temp = viewDetails(temp2, v, v.type);
				} else {
					temp = viewDetails(response[v.set], v, v.type);
				}
				$('#'+k).html(temp);
				i++;
			});
			$('#details').tabs({disabled:disabledTab});
			$('.form_tool').unbind('click').bind('click', function(e){// reset click event to avoid stacking bind event
				$('.form_tool').removeClass('active');
				formAction($(this).attr('data-action'),response);
				$(this).addClass('active');
				e.preventDefault();
			});
		},
		error:function (xhr, ajaxOptions, thrownError){
			$('#summary').html('<p class="message">Data not loaded.</p>');
			$('#details').tabs({disabled:[1,2,3,4,5,6]});
		}
	});
	return false;
}

function getElem(type,val){
	var subelem, pushElem, option = '', selectVal = [], selected, form_row;  
	var form_container = $('<div/>').attr('class', 'form_container');    
	var form_chain = $('<div/>').attr('class', 'form_chain active');    
	var form_section = $('<div/>').attr('class', 'form_section');
	var label = $('<label for="'+val.name+'"/>').html(val.title);

	var properties = (val.disabled === true)? 'disabled': '';
	properties = (val.checked === true)? properties+' checked': properties;
	properties = (type == 'select-multiple')? properties+' multiple': properties;

	switch(type){
		case 'section':
			form_section.attr('id',val.name);
			if(checkVal(val.subtitle))
				form_section.append($('<span class="form_subtitle"/>').html(val.subtitle));
			if(checkVal(val.desc))
				form_section.append($('<span class="form_desc"/>').html(val.desc));
			$.each(val.value, function(k,v){
				form_row.append(getElem(v.type,v));
			});
			form_section.append(form_row);
			form_row = form_section; // push to pushElem
		break;

		case 'text':
		case 'button':
		case 'file':
		case 'checkbox':
		case 'radio':
		case 'password':
		case 'hidden':
			form_row = $('<input '+properties+'/>').attr('type', type).attr('name', val.name).val(val.value)
		break;
		case 'date':
			form_row = $('<input '+properties+'/>').datepicker({ dateFormat: 'yy-mm-dd' }).val(val.value);
		break;

		case 'textarea':
			form_row = $('<textarea '+properties+'/>').attr('type', type).attr('name', val.name)
		break;

		case 'toggle':
		// console.log(val.name,val)
		toggle_status = (val.value == 0)? false: true;
			form_row = $('<div class="toggle"/>').toggles({   
				drag: false,
				on: toggle_status,
				width: 90,
				text:{on: val.defval[1],off: val.defval[0]}
			}).on('toggle', function(e,active){
				if (active) {
					$(this).parent().attr('data-val',1);
				} else {
					$(this).parent().attr('data-val',0);
				}
			});
		break;

		case 'select':
		case 'select-multiple':
		// console.log(val)
			$.each(val.defval, function(k,v){
				selected = (k == val.value)? 'selected': '';
				if(typeof v != 'object'){
					option += '<option '+selected+' value="'+k+'">'+v+'</option>'
				} else {
					if(typeof v.title != 'undefined'){
						option += '<option '+selected+' value="'+k+'">'+v.title+'</option>'
					}
				}
			})
			form_row = $('<select '+properties+'/>').attr('name', val.name).attr('id', val.name).append(option);
		break;

		case 'chain-checkbox':
			form_chain.attr('id', 'chain_'+val.name)
			form_row.append($('<input/>').attr('type', 'checkbox').attr('name', val.name).attr('id', val.name).bind('click', function(){
				if ($(this).is(':checked')) {
					$.each(selectVal[val.name], function(k,v){
						$('#'+v.name).removeAttr("disabled");
					})
				} else {
					form_chain.html('')
					$.each(selectVal[val.name], function(k,v){
						form_chain.append(getElem(v.type, v))
					})
				}
			}));
			selectVal[val.name] = val.chain_value;
			$.each(val.chain_value, function(k,v){
				form_chain.append(getElem(v.type, v))
			})
			form_row.append(form_chain)
		break;

		case 'chain-text':
			form_chain.attr('id', 'chain_'+val.name)
			form_row.append($('<input/>').attr('type', 'text').attr('name', val.name).attr('id', val.name).bind('blur', function(){
				if ($(this).val() != '') {
					$.each(selectVal[val.name], function(k,v){
						$('#'+v.name).removeAttr("disabled");
					})
				} else {
					form_chain.html('')
					$.each(selectVal[val.name], function(k,v){
						form_chain.append(getElem(v.type, v))
					})
				}
			}));
			selectVal[val.name] = val.chain_value;
			$.each(val.chain_value, function(k,v){
				form_chain.append(getElem(v.type, v))
			})
			form_row.append(form_chain)
		break;

		case 'chain-select':
			$.each(val.value, function(k,v){
				if(typeof v != 'object'){
					option += '<option value="'+k+'">'+v+'</option>'
				} else {
					if(typeof v.title != 'undefined'){
						option += '<option value="'+k+'">'+v.title+'</option>'
					} 
				}
			})
			form_row.append($('<select/>').attr('name', val.name).attr('id', val.name).append(option).bind("change", function() {
				var selected = $('option:selected', this)[0]['value'];
				form_chain.html('');
				$.each(selectVal[val.name][selected], function(k1,v1){
					form_chain.append(getElem(v1.type, v1));
				})
			}));
			$.each(val.chain_value, function(k,v){
				selectVal[val.name] = v.value;
				form_row.append(form_section.append(getElem(v.type, v)));
				$.each(v.value[0], function(k1,v1){
					form_chain.append(getElem(v1.type, v1));
				})
				form_row.append(form_chain);
			})
		break;
	}
	pushElem = form_row;
	return  pushElem;
}

function viewDetails(data, setlist, type){
	// console.log(getLength(data), data, type)
	var template = '', attr, attr_ori, data_set, data_field, rel='false';
	var multiple = (typeof data[0] != 'undefined' && getLength(data) >= 2)? true: false;
	var data_vals;

	$.each(setlist.data, function(k,v){
		template +='<span class="sub_tab_title">'+v.name+'</span>';
		if(typeof data != 'undefined'){
			if(type != 'table'){ // check if table=true or null
				template += '<dl>';
					$.each(v.list, function(k2,v2){                           
						data_set = (getLength(setlist.set) >= 1)?setlist.set[0]: setlist.set;
						data_field;
						if(typeof data[0] != 'undefined'){
							if(data[0]['push_val'] != 'undefined'){
								data_field = 'id';
								attr_ori = data[0]['push_val'];
								rel = setlist.rel;
							} else {
								attr_ori = data[0][k2];
							}
							attr = (typeof getDefiniton(k2,data[0][k2]) != 'undefined')? getDefiniton(k2,data[0][k2]): data[0][k2];
						} else {
							attr_ori = data[k2];
							data_field = k2;
							attr = (typeof getDefiniton(k2,attr_ori) != 'undefined')? getDefiniton(k2,attr_ori): attr_ori;
						}
						data_vals = (multiple)? 'data-vals="'+v2['id']+'"': '';
						template +='<dt>'+v2+'</dt>';
						template +='<dd class="datafield" data-set="'+data_set+'" data-field="'+data_field+'" data-val="'+attr_ori+'" data-rel="'+rel+'" data-multiple="'+multiple+'" '+data_vals+'>'+attr+'</dd>';
					});
				template +='</dl>';
			} else {
				template +='<table>';
				template +='<tr>';
				$.each(v.list, function(k4,v4){
					template +='<th>'+v4+'</th>';
				});
				template +='</tr>';
				$.each(data, function(k3,v3){                       
					template +='<tr>';
					$.each(v.list, function(k4,v4){
						if(typeof v3[k4] == 'string'){
							template +='<td>'+v3[k4]+'</td>';
							attr_ori = k4;
						} else {
							data_set = (getValid(setlist.set))?setlist.set: k;
							if(k4==='push_val'){
								data_field = 'id';
								rel=setlist.rel;
							} else {
								data_field = k4;
							}
							data_vals = (multiple)? 'data-vals="'+v3['id']+'"': '';
							template +='<td class="datafield" data-set="'+data_set+'" data-field="'+data_field+'" data-val="'+v3[k4]+'" data-rel="'+rel+'" data-multiple="'+multiple+'" '+data_vals+'>'+getDefiniton(attr_ori,v3[k4])+'</td>';
						}
					});
					template +='</tr>';
				});
				template +='</table>';
			}
		} else {
			template +='<p class="message">'+v.ifEmpty+'</p>';
		}
	});
	return template;
}

// Form Editor Start
function formAction(action,push_response){
	switch(action){
		case 'add':
			$('.form_actions').show();
			$('.tools').hide();
			$('a.delete').hide();
			$('.save').attr('data-type', 'add');
			addForm(push_response);
		break;
		case 'edit':
			$('.form_actions').show();
			$('.tools').hide();
			$('a.delete').show();
			$('.save').attr('data-type', 'edit');
			editForm(push_response);
		break;
		case 'impose':
		break;
		case 'save':
			saveForm(push_response, $('.save').attr('data-type'));
		break;
		case 'cancel':
			$('.form_actions').hide();
			$('.tools').show();
			cancelForm($('.save').attr('data-type'));
		break;
		case 'delete':
			$('.form_actions').hide();
			$('.tools').show();
			deleteForm(push_response)
		break;
	}
}

function addForm(pull_response){
	var datafield = $('.datafield');
	var set, field, val, rel;

	$.each(datafield, function(k,v){
		var fetch_data = [];
		set     = $(this).attr('data-set');
		field   = $(this).attr('data-field');
		val   = $(this).attr('data-val');
		fetch_data = listData.edit[set][field];
		// fetch_data['value'] = '';

		// if lisData.edit.object.defval defined
		if(typeof fetch_data.defval != 'undefined' && fetch_data.defval != ''){
			$(this).attr('data-val', 0);
			fetch_data['value'] = 0;
			fetch_data['defval'] = fetch_data.defval;
		} else {
			switch(fetch_data.type){
				case 'select':
					rel = $(this).attr('data-rel');
					rel = rel.split('.');
					fetch_data['value'] = ''; // get one selected id
					var rel_defval =[];
					rel_defval[0] = 'Please select...';
					$.each(pull_response[rel[0]], function(k1,v1){
						$.each(v1, function(k2,v2){
							if(k2.indexOf('_name') > -1){
								rel_defval[v1.id] = v2;
								return false;
							}
						});
					});
					fetch_data['defval'] = rel_defval;
				break;
				case 'text':
					$(this).attr('data-val', fetch_data.value);
				break;
			}
		}

		var input = getElem(fetch_data.type,fetch_data);
		input.on('change', function(){
			$(this).parent().attr('data-val',$(this).val());
		});
		$(this).html(input);
	});
}

function reinit(){
	$.ajax({
		url: "http://10.1.66.105/wspolicy/list/all/",
		type: "GET",
		dataType: "json",
		crossDomain: true,
		beforeSend: function(xhr){}
	}).success(function(get_response) {
		var list = getList(get_response);
		pushTable(list, listData.list.policy.policy_management);
		getMoreDetails(get_response.data[0]['id'])  
	});
}

function refetch(){
	var datafield = $('.datafield');
	$.each(datafield, function(k,v){
		var fetch_data = listData.edit[$(this).attr('data-set')][$(this).attr('data-field')];
		var restore_data = (typeof fetch_data.defval != 'undefined')? fetch_data.defval[$(this).attr('data-val')]: $(this).attr('data-val');
		$(this).html(restore_data);
	})	
}

function deleteForm(pull_response){
	// TBA get user confirmation before delete
	var getids = []
	getids.push(pull_response.policy_profile.id)
	var policy_id = {
		'policies':getids
	}
	$.ajax({
		url: "http://10.1.66.105/wspolicy/delete/",
		type: "POST",
		data: JSON.stringify(policy_id),
		crossDomain: true,
		success: function(response){
			if(response.status == 'Success'){
				reinit();
				compileMsg(response, 'success');
			} else {
				compileMsg(response, 'fail');
			}
		},
		error:function (xhr, ajaxOptions, thrownError){
			compileMsg(xhr.responseText, 'error');
		}
	});   
}


function compileMsg(xhr, type){
	var response = (typeof xhr == 'object')? xhr: $.parseJSON(xhr);
	$('#message').html('');
	$('#message').removeClass();

	switch(type){
		case 'error':
			$('#message').addClass('red');
		break;
		case 'success':
			$('.form_actions').hide();
			$('.tools').show();
			$('#message').addClass('green');
		break;
		case 'fail':
			$('#message').addClass('yellow');
		break;
	}
	var message = $('<ul>');
	var response = (typeof response.message == 'undefined')? $.parseJSON(response.responseText): response;
	if(typeof response.message.messages != 'undefined'){
		$.each(response.message.messages, function(k,v){
			$.each(v, function(k1,v1){
				message.append($('<li/>').html(v1));
			});
		});
	} else {
		message.append($('<li/>').html(response.message));
	}
	$('#message').append(message).show().fadeOut(9000);
}

function editForm(pull_response){
	var datafield = $('.datafield');
	var set, field, val, rel;

	$.each(datafield, function(k,v){
		// console.log(k,v)
		var fetch_data = [];
		set     = $(this).attr('data-set');
		field   = $(this).attr('data-field');
		val     = $(this).attr('data-val');

		fetch_data = listData.edit[set][field];
		fetch_data['value'] = (val != '')? val: '';

		// if lisData.edit.object.defval defined
		if(typeof fetch_data.defval != 'undefined' && fetch_data.defval != ''){
			fetch_data['defval'] = fetch_data.defval;
		} else {
			if(fetch_data.type == 'select'){

// console.log(pull_response,pull_response[set],set)

				rel = $(this).attr('data-rel');
				rel = rel.split('.');
				fetch_data['value'] = pull_response[set][0][rel[1]]; // get one selected id
				var rel_defval =[];
				rel_defval[0] = 'Please select...';
				$.each(pull_response[rel[0]], function(k1,v1){
					$.each(v1, function(k2,v2){
						if(k2.indexOf('_name') > -1){
							rel_defval[v1.id] = v2;
							return false;
						}
					});
				});
				fetch_data['defval'] = rel_defval;
			}
		}

		var input = getElem(fetch_data.type,fetch_data);
		input.on('change', function(){
			$(this).parent().attr('data-val',$(this).val());
		});
		$(this).html(input);
	});
}

function saveForm(pull_response, type){
	pull_response.policy_profile.id = (type == 'add')?'': pull_response.policy_profile.id;
	var url ={
		add: "http://10.1.66.105/wspolicy/add/",
		edit: "http://10.1.66.105/wspolicy/update/"+pull_response.policy_profile.id
	}

	var datafield 	= $('.datafield');
	var message 	= $('#message');
	var set, field, val, temp = [];
	$.each(datafield, function(k,v){
		var temp2 = {};
		set		= $(v).attr('data-set');
		field		= $(v).attr('data-field');
		val		= $(v).attr('data-val');
		vals		= $(v).attr('data-vals');
		rels		= $(v).attr('data-rel');
		rel		= rels.split('.');
		multiple = $(v).attr('data-multiple');
		if(multiple=='true'){
			if(typeof temp[set] == 'undefined')
			temp[set] = [];
			if(val == 1){
				temp2[rel[1]] = parseInt(vals);
				temp[set].push(temp2);
			}
			pull_response[set] = temp[set];
		} else {
			if(getLength(rel) >= 2){
				pull_response[set][0][rel[1]] = parseInt(val);
			} else {
				pull_response[set][field] = val;
			}
		}
	});
	var pushData = JSON.stringify(pull_response);
	$.ajax({
		url: url[type],
		type: "POST",
		data: pushData,
		crossDomain: true,
		success: function(response){
			if(response.status == 'success'){
				reinit();
				compileMsg(response, 'success');
			} else {
				compileMsg(response, 'fail');
			}
			formAction('cancel');
		},
		error:function (xhr, ajaxOptions, thrownError){
			compileMsg(xhr.responseText, 'error');
			return false;
		}
	});
}

function cancelForm(type){
	if(type == 'edit'){
		refetch();
	} else {
		reinit();
	}
}
// Form Editor End

// user-defined attribute
var toggle_enable = {0:'Disabled', 1:'Enabled'};
var listData = {
	'details': {        
		'general':{
			data: {
				'policy_general':{
					name: 'General',
					list: {
						'profile_name': 'Policy Name',
						'description': 'Description',
						'org_name': 'Organization',
						'identifier': 'Identifier',
						'created_at': 'Created Date',
						'updated_at': 'Last Update'
					}
				}
			},
			set: 'policy_profile',
			type: 'dd'
		},
		'passcode':{
			data: {
				'policy_passcode':{
					name: 'Passcode',
					list: {
						'simple': 'Allow simple value',
						'alphanumeric': 'Requires alphanumeric value',
						'min_length': 'Minimum passcode length',
						'min_complex_char': 'Minimum complex characters',
						'max_age': 'Maximum passcode age',
						'auto_lock': 'Maximum Auto-lock',
						'history': 'Maximum passcode history',
						'max_fail': 'Maximum number of fail attempts'
					}
				}
			},
			set: 'policy_passcode',
			type: 'dd'
		},
		'wifi':{
			data: {
				'policy_wifi':{
					name: 'WiFi',
					list: {
						// 'id': 'ID',
						'ap_name': 'AP Name',
						'push_val': 'Value',
					}
				}
			},
			set: 'policy_wifi',
			type: 'table',
			rel: 'wifi_access_points_list.wifi_id'
		},
		'location':{
			data: {
				'policy_location':{
					name: 'Location',
					list: {
						// 'id': 'ID',
						'location_name': 'Location Name'
					}
				}
			},
			set: 'policy_location_profile',
			rel: 'location_list.location_id',
			type: 'dd'
		},
		'network':{
			data: {
				'policy_network':{
					name: 'Network',
					list: {
						'call_logging': 'Call Logging',
						'sms_logging': 'SMS Logging'
					}
				}
			},
			set: 'policy_profile',
			type: 'dd'
		},
		'apps':{
			data: {
				'policy_apps':{
					name: 'Apps',
					list: { // get from policy_location_blacklist_app
						// 'id': 'id',
						'app_name': 'App Name',
						'push_val': 'Value',
					}
				}
			},
			set: 'policy_location_blacklist_app',
			rel: 'blacklist_app_list.policy_app_id',
			type: 'table'
		},
		'others':{
			data: {
				'policy_others':{
					name: 'Others',
					list: {
						'allow_remote_locate': 'Allow Remote Locate',
						'allow_remote_lock_factory_reset': 'Allow Remote Lock & Factory Reset'
					}
				}
			},
			set: 'policy_profile',
			type: 'dd'
		}
	},
	'list': {
		'policy':{
			'policy_management':{
				name: 'Policy Management',
				list: {
					'profile_name': 'Profile Name',
					'identifier': 'Identifier',
					'status': 'Status',
					// 'allow_compromised_device': 'allow_compromised_device',
					// 'allow_remote_locate': 'allow_remote_locate',
					// 'allow_remote_lock_factory_reset': 'allow_remote_lock_factory_reset',
					// 'call_logging': 'call_logging',
					// 'created_at': 'created_at',
					// 'description': 'description',
					// 'id': 'id',
					// 'org_name': 'org_name',
					// 'ownership_type': 'ownership_type',
					// 'sms_logging': 'sms_logging',
					// 'type': 'type',
					// 'updated_at': 'updated_at'
				}
			}
		}
	},
	'edit': {
		'blacklist_app_list': {
			'api_key': {name: 'api_key', type: 'text', value:''},
			'app_identifier': {name: 'app_identifier', type: 'text', value:''},
			'app_name': {name: 'app_name', type: 'text', value:''},
			'created_at': {name: 'created_at', type: 'hidden', value:''},
			'id': {name: 'id', type: 'toggle', value:'', defval:toggle_enable},
			'platform_id': {name: 'platform_id', type: 'text', value:''},
			'push_val': {name: 'push_val', type: 'toggle', value:'', defval:toggle_enable},
			'updated_at': {name: 'updated_at', type: 'hidden', value:''}
		},
		'location_list': {
			'created_at': {name: 'created_at', type: 'hidden', value:''},
			'floor_no': {name: 'floor_no', type: 'text', value:''},
			'id': {name: 'id', type: 'text', value:''},
			'lat_lng_string': {name: 'lat_lng_string', type: 'text', value:''},
			'location_name': {name: 'location_name', type: 'select', value:'', defval:''},
			'location_status': {name: 'location_status', type: 'text', value:''},
			'updated_at': {name: 'updated_at', type: 'hidden', value:''}
		},
		'policy_location_blacklist_app': {
			'created_at': {name: 'created_at', type: 'hidden', value:''},
			'id': {name: 'id', type: 'toggle', value:'', defval:toggle_enable},
			'policy_app_id': {name: 'policy_app_id', type: 'text', value:''},
			'policy_location_id': {name: 'policy_location_id', type: 'text', value:''},
			'profile_id': {name: 'profile_id', type: 'text', value:''},
			'updated_at': {name: 'updated_at', type: 'hidden', value:''}
		},
		'policy_location_profile': {
			'created_at': {name: 'created_at', type: 'hidden', value:''},
			'id': {name: 'id', type: 'select', value:''},
			'location_id': {name: 'location_id', type: 'text', value:''},
			'location_name': {name: 'location_name', type: 'text', value:''},
			'policy_gl_status': {name: 'policy_gl_status', type: 'text', value:''},
			'profile': {name: 'profile', type: 'text', value:''},
			'updated_at': {name: 'updated_at', type: 'hidden', value:''}
		},
		'policy_passcode': {
			'alphanumeric': {name: 'alphanumeric', type: 'toggle', value:'', defval:toggle_enable},
			'auto_lock': {name: 'auto_lock', type: 'select', value:'', defval:{0:0,1:1,2:2,3:3,4:4,5:5,10:10,15:15}},
			'created_at': {name: 'created_at', type: 'toggle', value:'', defval:toggle_enable},
			'grace_period': {name: 'grace_period', type: 'toggle', value:'', defval:toggle_enable},
			'history': {name: 'history', type: 'text', value:0},
			'id': {name: 'id', type: 'toggle', value:'', defval:toggle_enable},
			'max_age': {name: 'max_age', type: 'text', value:0},
			'max_fail': {name: 'max_fail', type: 'select', value:'', defval:{0:0,4:4,5:5,6:6,7:7,8:8,9:9,10:10,11:11}},
			'min_complex_char': {name: 'min_complex_char', type: 'select', value:'', defval:{0:0,1:1,2:2,3:3,4:4,5:5}},
			'min_length': {name: 'min_length', type: 'select', value:'', defval:{0:0,4:4,5:5,6:6,7:7,8:8,9:9,10:10,11:11,12:12,13:13,14:14,15:15,16:16}},
			'payload_uuid': {name: 'payload_uuid', type: 'toggle', value:'', defval:toggle_enable},
			'profile_id': {name: 'profile_id', type: 'toggle', value:'', defval:toggle_enable},
			'simple': {name: 'simple', type: 'toggle', value:'', defval:toggle_enable},
			'updated_at': {name: 'updated_at', type: 'toggle', value:'', defval:toggle_enable}
		},
		'policy_profile': {
			'allow_compromised_device': {name: 'allow_compromised_device', type: 'text', value:''},
			'allow_remote_locate': {name: 'allow_remote_locate', type: 'toggle', value:'', defval:toggle_enable},
			'allow_remote_lock_factory_reset': {name: 'allow_remote_lock_factory_reset', type: 'toggle', value:'', defval:toggle_enable},
			'call_logging': {name: 'call_logging', type: 'toggle', value:'', defval:toggle_enable},
			'created_at': {name: 'created_at', type: 'hidden', value:''},
			'description': {name: 'description', type: 'text', value:''},
			'id': {name: 'id', type: 'text', value:''},
			'identifier': {name: 'identifier', type: 'text', value:''},
			'org_name': {name: 'org_name', type: 'text', value:''},
			'ownership_type': {name: 'ownership_type', type: 'text', value:''},
			'profile_name': {name: 'profile_name', type: 'text', value:''},
			'sms_logging': {name: 'sms_logging', type: 'toggle', value:'', defval:toggle_enable},
			'status': {name: 'status', type: 'text', value:''},
			'type': {name: 'type', type: 'text', value:''},
			'updated_at': {name: 'updated_at', type: 'hidden', value:''}
		},
		'policy_vpn': {
			'created_at': {name: 'created_at', type: 'hidden', value:''},
			'id': {name: 'id', type: 'text', value:''},
			'policy_gv_status': {name: 'policy_gv_status', type: 'text', value:''},
			'profile_id': {name: 'profile_id', type: 'text', value:''},
			'updated_at': {name: 'updated_at', type: 'hidden', value:''}
		},
		'policy_wifi': {
			'ap_name': {name: 'ap_name', type: 'select', value:''},
			'created_at': {name: 'created_at', type: 'hidden', value:''},
			'id': {name: 'id', type: 'toggle', value:'', defval:toggle_enable},
			'policy_gw_status': {name: 'policy_gw_status', type: 'text', value:''},
			'profile': {name: 'profile', type: 'text', value:''},
			'updated_at': {name: 'updated_at', type: 'hidden', value:''}
		},
		'wifi_access_points_list': {
			'ap_name': {name: 'ap_name', type: 'text', value:''},
			'ap_status': {name: 'ap_status', type: 'text', value:''},
			'created_at': {name: 'created_at', type: 'hidden', value:''},
			'id': {name: 'id', type: 'toggle', value:'', defval:toggle_enable},
			'location_id': {name: 'location_id', type: 'text', value:''},
			'mac_address': {name: 'mac_address', type: 'text', value:''},
			'updated_at': {name: 'updated_at', type: 'hidden', value:''}
		}
	}
}
