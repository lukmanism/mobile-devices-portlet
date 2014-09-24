function getList(data){
	var td = [];
	//app status 
	// 1 = active
	// 0 = inactive
	// 3 = resigned
	$.each(data.data, function(k,v){
		if(v.app_status == 1){
			$.each(v, function(k2,v2){
				data.data[k][k2] = getDefiniton(k2,v2);
			});			
		}
		td.push(v)
	});
	return td;
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
	var length;
	var type = (val == null)? 'null': typeof val;
	switch(type){
		case'object':
			length = Object.keys(val).length;
		break;
		case'array':
			length = val.length;
		break;
		case'string':
		case'null':
			length = 'false';
		break;
	}
	return length;
}

function pushList(data){
	var li = ''
	var i = 1;
	$.each(data, function(k,v){
		var imgurl = UrlExists('http://10.1.66.105/assets/image/'+v.asset_id);
		var active = (k == 0)? ' class="active" ': '';
		li += '<li data-id="id-'+(i++)+'" data-type="'+v.platform+'" '+active+'>';
		li += '<span><img src="'+imgurl+'" alt="'+v.alias+'" data-id="'+v.id+'"/></span>';
		li += '<p class="app_name">'+v.alias+'</p>';
		li += '<p class="app_size" data-type="size">'+bytesToSize(v.byte_size)+'</p>';
		li += '</li>';
	});
	return li;
}

function pushTable(td,filter){
    var fields = []
    var get_fields = (typeof filter != 'undefined')? filter.list: td[0];
    $.each(get_fields, function(k,v){
        var get_v = (typeof filter != 'undefined')? v: getDefiniton('fields_device',k);
        fields.push({ field: k, title: get_v})
    });
    fields.push({command: { text: "More", click: pushMoreDetails, attributes:{class:"test"} }});

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
            pageSize: 10
        },
        selectable: "row",
            sortable:{
            mode: "single",
            allowUnsort: false
        },
        scrollable: false,
        pageable: false,
        columns: fields
    });

    // constuct search filter
    $("#search").kendoAutoComplete({
        dataTextField: "device_name",
        dataValueField: "device_name",
        dataSource: td,
        change: function () {
            var filtered;
            var value = this.value();
            if (value) {
                grid.data("kendoGrid").dataSource.filter({ field: "device_name", operator: "contains", value: value });
            } else {
                grid.data("kendoGrid").dataSource.filter({});
            }
        }
    });
}

function UrlExists(url) {
	var http = new XMLHttpRequest();
	http.open('HEAD', url, false);
	http.send();
	if(http.status != 404){
		return url;
	} else {
		return 'http://10.1.66.105/img/file_blank.png';
	}
}

function bytesToSize(bytes) {
	var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
	if (bytes == 0) return '0 Byte';
	var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
	return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

// user defined definition from js/definition.js
function getDefiniton(k,v){
	if(typeof definitions[k] != 'undefined'){
		return definitions[k][v];
	} else {
		return v;
	}
}

function pushMoreDetails(){
	$('#applications img').unbind('click').bind('click', function(){
		getAppDetails($(this).attr('data-id'));
		// Liferay.fire('getAppDetails',{
		//     id: $(this).attr('data-id')
		// });
		$('#applications li').attr('class', '');
		$(this).parent().parent().attr('class', 'active');
	});
	return false;
}

function addPreviewImage(){
	setTimeout(function(){
		var preview_image = $('#preview_image .upload-file-container');
		var add_btn = $('<div class="add_el">').unbind('click').bind('click', function(){
			var self = $(this);
			$.each(preview_image, function(k,v){
				if(!$(v).is(":visible")){
					$(v).show();
					return false;
				} else {
					if(k >= 3){ self.hide(); }
				}
			});
		});
		$.each(preview_image, function(k,v){
			var data_val = $(v).attr('data-val');
			$('#preview_image').append(add_btn);
			if(data_val == 'undefined'){
				if(k > 0){
					$(v).hide();
				}
			} else {
				if(k >= 3){
					add_btn.hide();
				}
			}
		});
	}, 100);
}

function createPreviewImage(target){
	$('<form/>').attr({
		action: "http://10.1.66.105/wsapp/tmp/preview",
		method: "post",
		encoding: "multipart/form-data",
		enctype: "multipart/form-data",
		target: "iframe_"+target.attr('name'),
		file: target.val()
	}).append(target).submit();		
}

function removePreviewImage(target, multiple){
	// Fire on-the-fly upload to webservice, return filepath for background image
	return $('<div class="remove-file"></div>').unbind('click').bind('click', function(){
		var getid = "#"+target.attr('name');
		var copy = $('.upload-file', getid).html();
		$('.upload-file', getid).html(copy);
		$('.upload-file img', getid).remove(); // edit mode image thumbnail
		$('input', getid).unbind('change').bind('change', function(){
			var self = $(this);
			$('<form/>').attr({
				action: "http://10.1.66.105/wsapp/tmp/preview",
				method: "post",
				encoding: "multipart/form-data",
				enctype: "multipart/form-data",
				target: "iframe_"+self.attr('name'),
				file: self.val()
			}).append(self).submit();
			$('.upload-file', getid).append($(this));
		});
		if(multiple){
			$(getid).hide();
			if(!$('.add_el').is(":visible")){
				console.log(multiple, (!$('.add_el').is(":visible")))
				$('.add_el').show();
			}
		}
	});
}

function getElem(type,val,data_val,newsetup){
	var subelem, pushElem, option = '', selectVal = [], selected, form_row;  
	var form_container = $('<div/>').attr('class', 'form_container');    
	var form_chain = $('<div/>').attr('class', 'form_chain active');    
	var form_section = $('<div/>').attr('class', 'form_section');
	var label = $('<label for="'+val.name+'"/>').html(val.label);
	var data_getval = (typeof data_val != 'undefined')? data_val: val.value;

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
		case 'checkbox':
		case 'radio':
		case 'password':
		case 'hidden':
			var form_el = $('<input '+properties+'/>').attr({type: type, name: val.name}).val(data_getval);
			form_row = (type == 'hidden')? $('<div class="void" id="'+val.name+'"/>').html('Not applicable').append(form_el): form_el;
		break;

		case 'void':
			form_row = $('<div class="void" id="'+val.name+'"/>').html('Not applicable');
		break;

		case 'file':
			form_row = $('<input '+properties+'/>').attr({type: type, name: val.name});
		break;

		case 'file-image': // single image
		case 'file-images': // multiple images
			var multiple = (type == 'file-images')? true: false;
			var form_file = $('<input '+properties+'/>').attr({type: 'file', name: val.name});
			var remove_file = removePreviewImage(form_file, multiple);
			form_file.unbind('change').bind('change', function(){
				if($(this).val() != ''){
					createPreviewImage($(this));
					var target = '#'+$(this).attr('name');
					$('.upload-file', target).append($(this));
					$('.upload-file img', target).remove(); // edit mode image thumbnail					
				}
				return false;
			});
			var iframe = $('<iframe name="iframe_'+val.name+'" class="postiframe" scrolling="no"></iframe>');
			var img = (typeof data_val != 'undefined')? $('<img src="http://'+data_val+'">'): '';
			form_row = $('<div class="upload-file-container" id="'+val.name+'" data-val="'+data_val+'"><div class="upload-file" ></div></div>');
			form_row.append(remove_file);
			$('.upload-file', form_row).append(form_file, iframe, img);
		break;

		case 'date':
			form_row = $('<input '+properties+'/>').datepicker({ dateFormat: 'yy-mm-dd' }).val(val.value);
		break;

		case 'textarea':
			form_row = $('<textarea '+properties+'/>').attr({type: type, name: val.name}).html(data_getval)
		break;

		case 'toggle':
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
			$.each(val.defval, function(k,v){
				selected = (k == data_getval)? 'selected': '';
				if(typeof v != 'object'){
					option += '<option '+selected+' value="'+k+'">'+v+'</option>'
				} else {
					if(typeof v.title != 'undefined'){
						option += '<option '+selected+' value="'+k+'">'+v.title+'</option>'
					}
				}
			})
			form_row = $('<select '+properties+'/>').attr({name: val.name, id: val.name}).append(option);
		break;

		case 'chain-checkbox':
			form_chain.attr('id', 'chain_'+val.name)
			form_row.append($('<input/>').attr({name: val.name, id: val.name, type: 'checkbox'}).unbind('click').bind('click', function(){
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
			form_row.append($('<input/>').attr({name: val.name, id: val.name, type: 'text'}).unbind('blur').bind('blur', function(){
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
			form_row.append($('<select/>').attr({name: val.name, id: val.name}).append(option).unbind('change').bind("change", function() {
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
	pushElem = (newsetup && type != 'hidden')? $('<div class="row"/>').append(label, form_row): form_row;
	return  pushElem;
}

function getAppDetails(id){
	$.ajax({
		url: "http://10.1.66.105/wsapp/detail/all/"+id,
		type: "GET",
		dataType: "json",
		crossDomain: true,
		success: function(response){
			var disabledTab = []; // list of tab index to be disabled

			var app_details = viewDetails({data: response}, listData.details.apps, true);
			$('#app_details').html(app_details);

			$('.file-container img').unbind('click').bind('click', function(){
				var clone = $(this).clone();
				clone.dialog({
					resizable: false,
					modal: true,
					title: '',
					draggable: false,
					minwidth: 350,
					minHeight: 200,
					width: 400,
					close: function(){},
					open: function(){
						$('.ui-widget-overlay').unbind('click').bind('click', function(){
							clone.dialog( "close" );
						});
					}
				});
				return false;
			})

			var push_app = disabledTab.push(1);
			$('#push_app').html(push_app);

			$('#details').tabs({disabled:disabledTab});
			$('.form_tool').unbind('click').bind('click', function(e){// reset click event to avoid stacking bind event
				$('.form_tool').removeClass('active');
				formAction($(this).attr('data-action'),{data: response});
				$(this).addClass('active');
				e.preventDefault();
			});
		},
		error:function (xhr, ajaxOptions, thrownError){
			$('#app_details').html('<p class="message">Data not loaded.</p>');
			$('#details').tabs({disabled:[1]});

			$('.form_tool').unbind('click').bind('click', function(e){// reset click event to avoid stacking bind event
				$('.form_tool').removeClass('active');
				formAction($(this).attr('data-action'));
				$(this).addClass('active');
				e.preventDefault();
			});
			compileMsg(xhr.responseText, 'error');
		}
	});
	return false;
}

function viewDetails(data, setlist, type){
	var template = '', attr;
	$.each(setlist.data, function(k,v){
		template +='<span data-id="'+data.data.id+'" class="sub_tab_title">'+v.name+'</span>';
		if(typeof data != 'undefined'){
			if(type != 'table'){ // check if table=true or null
				var download_url = '';
				template +='<dl>';
					$.each(v.list, function(k2,v2){
						data_set = (getLength(setlist.set) >= 1)?setlist.set[0]: setlist.set;
						attr_ori = (typeof data.data[0] != 'undefined')? data.data[0][k2]: data.data[k2];
						data_field = k2;
						attr = (typeof data.data[0] != 'undefined')? data.data[0][k2]: data.data[k2];
						if(attr != null){
							// now rollover!				
							attr = (typeof getDefiniton(k2,attr) != 'undefined')? getDefiniton(k2,attr): attr;
							attr = (k2 == 'byte_size')? bytesToSize(data.data[k2]): attr;
							template +='<dt>'+v2+'</dt>';
							if(getLength(attr) != 'false' && getLength(attr) != 0){
								var temp_attr = '';
								$.each(attr, function(k3,v3){
									var this_id = k2+'_'+(k3+1);
									if (v3.indexOf("/image/") > 0){
										temp_attr += '<div class="file-container" id="'+this_id+'"><img src="http://'+v3+'"></div>';
									}
								});
								template +='<dd class="datafield" data-set="'+data_set+'" data-field="'+data_field+'" data-val="" id="'+data_field+'">'+temp_attr+'</dd>';
							} else {
								if(attr.indexOf("/download/") > 0){
									attr = '<div class="download"><a href="'+attr+'">Download App</a></div>';
								} else if (attr.indexOf("/image/") > 0){
									attr = '<div class="file-container" id="'+k2+'"><img src="http://'+attr+'"></div>';
								}
								template +='<dd class="datafield" data-set="'+data_set+'" data-field="'+data_field+'" data-val="'+attr_ori+'" id="'+data_field+'">'+attr+'</dd>';
							}								
						}
					});
				template +='</dl>'
			} else {
				template +='<table>'
				template +='<tr>'
				$.each(v.list, function(k2,v2){
					template +='<th>'+v2+'</th>'
				});
				template +='</tr>'
				$.each(data, function(k3,v3){                       
					template +='<tr>'
					$.each(v.list, function(k2,v2){
						template +='<td>'+data.data[k2]+'</td>'
					});
					template +='</tr>'
				});
				template +='</table>'
			}
		} else {
			template +='<p class="message">'+v.ifEmpty+'</p>'
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
	wrapForm();
	var datafield = $('.datafield');
	var newsetup = (typeof pull_response == 'undefined')? true: false;


	$.each(listData.edit.data, function(k2,v2){
		var selector = (k2.indexOf('_file') > 1)? k2.replace('_file', '_url'): k2;
		var el = $('#'+selector);
		if(el.length != 0 && newsetup == false){
			if(typeof v2.name == 'undefined'){
				var template = [];
				$.each(v2, function(k1,v1){
					template.push(getElem(v1.type,v1, undefined, newsetup));
				});
				el.html(template);
			} else {
				el.html(getElem(v2.type,v2, undefined, newsetup));
			}
		} else {
			if(typeof v2.name == 'undefined'){
				var template = [];
				$.each(v2, function(k1,v1){
					template.push(getElem(v1.type,v1, undefined, newsetup));
				});
				$('#edit').append(template);
			} else {
				$('#edit').append(getElem(v2.type,v2, undefined, newsetup));
			}		
		}
	});
}

function refetch(){
	var data_id = $('.sub_tab_title').attr('data-id');
	getAppDetails(data_id) 
}

function deleteForm(pull_response){
	// TBA get user confirmation before delete
	var getids = []
	getids.push(pull_response.data.id)
	var app_id = {
		'apps':getids
	}
	$.ajax({
		url: "http://10.1.66.105/wsapp/delete/",
		type: "POST",
		data: JSON.stringify(app_id),
		crossDomain: true,
		success: function(response){
			if(response.status == 'Success'){
				refetch();
				compileMsg(response, 'success');
			} else {
				compileMsg(response, 'fail');
			}			
			setTimeout(function(){
				location.reload();
			}, 1000);
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
	wrapForm();
	var datafield = $('.datafield');
	$.each(listData.edit.data, function(k2,v2){
		var selector = (k2.indexOf('_file') > 1)? k2.replace('_file', '_url'): k2;
		var el = $('#'+selector);
		var data_val = el.attr('data-val');
		if(el.length != 0){
			if(typeof v2.name == 'undefined'){
				var template = [];
				$.each(v2, function(k1,v1){
					template.push(getElem(v1.type,v1,pull_response.data.preview_image[k1]));
				});
				el.html(template);
			} else {
				el.html(getElem(v2.type,v2,data_val));
			}
		} else {
			$('#edit').append(getElem(v2.type,v2,data_val));			
		}
	});
}

function wrapForm(){	
	addPreviewImage();
	var app_details = $('#app_details').html();
	var push_form = '<form id="edit">'+app_details+'</form>';
	$('#app_details').html(push_form);
}

function saveForm(pull_response, type){
	var block = blockScreen();
	if(type == 'add' && typeof pull_response != 'undefined'){
		pull_response.data.id = '';
	}
	var id = (typeof pull_response != 'undefined')? pull_response.data.id: '';
	var url = {
		add: "http://10.1.66.105/wsapp/add/",
		edit: "http://10.1.66.105/wsapp/update/"+id
	}

	if(type == 'edit'){
		$.each($('#edit')[0], function(k,v){
			if($(v).attr('type') == 'file'){
				if($(v).val() == ''){
					if($(v).attr('name').indexOf('download')){
						var selector = $(v).attr('name').replace('_file', '_url');		
						$('input[name="'+$(v).attr('name')+'"]').remove();
						$('#'+selector).append($('<input type="text" name="'+$(v).attr('name')+'"/>').val($('#'+selector).attr('data-val')));
					} else {	
						var selector = $(v).attr('name').replace('_file', '_url');		
						$('input[name="'+selector+'"]').remove();
						$('#'+selector+' div').append($('<input type="text" name="'+$(v).attr('name')+'"/>').val($('#'+selector).attr('data-val')));
					}
				}
			}
		});
	}

	var formData = new FormData($('#edit')[0]);

	// hack for uploading large file size
	var jqxhr = $.ajax({
		url: url[type],
		type: 'POST',
		done: function(response){
			return true;
		},
		fail:function (xhr, ajaxOptions, thrownError){
			compileMsg(xhr.responseText, 'error');
			block.dialog('close');
			return false;
		},
		always:function (xhr, ajaxOptions, thrownError){
			return true;
		},
		data: formData,
		cache: false,
		contentType: false,
		processData: false
	});
	jqxhr.always(function(response) {
		if(response.status == 'success'){
			refetch();
			compileMsg(response, 'success');
			setTimeout(function(){
				location.reload();
			}, 1000);
		} else {
			if(response.status == 500){
				compileMsg('{status: "error", message: "Error 500. Contact administrator."}', 'fail');
				block.dialog('close');
			} else if(response.status == 400){
				compileMsg(response, 'fail');
				block.dialog('close');
			} else {
				compileMsg(response, 'fail');
				block.dialog('close');
			}
		}
		formAction('cancel');
	});
}

function blockScreen(){
	// disable F5 keystroke
	$(document).keydown(function (e) {
		return (e.which || e.keyCode) != 116;
	});
	// block screen
	var div = $('<div class="freeze"/>').append('<img src="/mobile-devices-portlet/assets/loader.gif">');
	return div.dialog({
		resizable: false,
		modal: true,
		title: '',
		draggable: false,
		minwidth: 350,
		minHeight: 200,
		top: 700,
		width: 400,
		closeOnEscape: false,
		dialogClass: 'dialogTransparent',
		close: function(){},
		open: function(){
			$('button.ui-dialog-titlebar-close').hide();
			$('.ui-widget-overlay').unbind('click');
		}
	});
}

function cancelForm(type){
	refetch();
}
// Form Editor End


// user-defined attribute
var toggle_enable = {0:'Disabled', 1:'Enabled'};
var listData = {
	'list': {
		'apps':{
			'app_list':{
				name: 'Applications',
				list: {
					'alias': 'App Name',
					// 'api_key': 'Api Key',
					// 'app_bugs_fixes': 'Bug Fixes',
					// 'app_category_id': 'Category',
					// 'app_detail': 'Details',
					// 'app_device_type': 'Device Type',
					// 'app_identifier': 'Identifier',
					// 'app_lang_support': 'Language Support',
					// 'app_name': 'App Name',
					// 'app_path': 'Path',
					// 'app_promo': 'Promo',
					// 'app_publish_date': 'Publish Date',
					// 'app_publisher': 'Publisher',
					// 'app_rate': 'Rating',
					'app_status': 'Status',
					// 'app_type_id': 'Type',
					// 'app_version_code': 'Version Code',
					// 'app_version_name': 'Version Name',
					// 'app_whats_new': 'What\'s New',
					// 'asset_filename': 'File Name',
					'asset_id': 'asset_id',
					// 'asset_path': 'Asset Path',
					'byte_size': 'File Size',
					// 'category_desc': 'Description',
					// 'content_rating_id': 'content_rating_id',
					// 'created_at': 'Created',
					'id': 'ID',
					// 'min_os_sdk_version': 'Min. OS Version',
					// 'organization_id': 'Organization',
					'platform': 'Platform',
					// 'type': 'Type',
					// 'updated_at': 'Updated'
				}
			}
		}         
	},
	'details': {  
		'apps':{
			data: {
				'app_details':{
					name: 'Applications',
					list: {
						'name': 'App Name',
						'app_identifier': 'Identifier',
						'category_id': 'Category',
						'description': 'Description',
						'device_compatibility': 'Device Compatibility',
						'icon_url': 'Icon Image',// Thumbnail
						// 'minimum_os_version': 'Min. OS Version',
						// 'new_version_date': 'new_version_date',
						// 'new_version_description': 'new_version_description',
						// 'parental_rating': 'parental_rating',//Multiple
						'preview_image': 'Preview Image',//Multiple
						'app_access_rights': 'App Access Rights',
						// 'video_url': 'Video', // TBC
						// 'price': 'price',
						'publisher': 'Publisher',
						// 'rating': 'rating',
						// 'related': 'related',//Multiple
						// 'review': 'review',//Multiple
						// 'support_url': 'support url',
						'version': 'Version',
						'app_download_url': 'App File'
					}
				}
			},
			set: 'data',
			type: 'dd'
		}       
	},
	'edit': {
		'data': {
			'name': {name: 'name', label: 'App Name', type: 'text', value:''},
			'app_identifier': {name: 'app_identifier', label: 'Identifier', type: 'hidden', value:''},
			'category_id': {name: 'category_id', label: 'Category', type: 'select', value:'', defval:['Please select..', 'Business', 'Others']},
			'description': {name: 'description', label: 'Description', type: 'textarea', value:''},
			'device_compatibility': {name: 'device compatibility', label: 'Device Compatibility', type: 'select', value:'', defval:['Please select..', 'Phone', 'Tablet', 'Any']},
			// 'minimum_os_version': {name: 'minimum_os_version', label: 'Minimum OS Ver.', type: 'hidden', value:''},
			'preview_image': [
				{name: 'preview_image_1', label: 'Preview Image 1', type: 'file-images', value:''},
				{name: 'preview_image_2', label: 'Preview Image 2', type: 'file-images', value:''},
				{name: 'preview_image_3', label: 'Preview Image 3', type: 'file-images', value:''},
				{name: 'preview_image_4', label: 'Preview Image 4', type: 'file-images', value:''},
				{name: 'preview_image_5', label: 'Preview Image 5', type: 'file-images', value:''}
			],
			'icon_file': {name: 'icon_file', label: 'Icon Image', type: 'file-image', value:''}, // icon_url
			'app_download_file': {name: 'app_download_file', label: 'App File', type: 'file', value:''}, // app_download_url
			// 'video_file': {name: 'video_file', label: 'Video File', type: 'file', value:''}, // video_url
			'app_access_rights': {name: 'app_access_rights', label: 'App Access Rights', type: 'void', value:''}, // TBC taken from liferay
			'publisher': {name: 'publisher', label: 'Publisher', type: 'hidden', value:''}, // TBC taken from liferay
			'version': {name: 'version', label: 'Version', type: 'hidden', value:''},
			'user_id': {name: 'user_id', label: 'User ID', type: 'hidden', value:'1'} // TBC taken from liferay
		}
	}
}