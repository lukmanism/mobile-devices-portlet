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

// user defined definition from js/definition.js
function getDefiniton(k,v){
	if(typeof definitions[k] != 'undefined'){
		return definitions[k][v];
	} else {
		return v;
	}
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

function pushTable(td){
	var fields = []
	$.each(listData.list.geofence.geofence_list.list, function(k,v){
		fields.push({field: k, title: v})
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
		dataTextField: "location_name",
		dataValueField: "location_name",
		dataSource: td,
		change: function () {
			var filtered;
			var value = this.value();
			if (value) {
				grid.data("kendoGrid").dataSource.filter({ field: "location_name", operator: "contains", value: value });
			} else {
				grid.data("kendoGrid").dataSource.filter({});
			}
		}
	});
}

function pushMoreDetails(id){
	getMoreDetails(id)
	// Liferay.fire('getLocationDetails',{
	//     id: clickData.id
	// });
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
			$.each(val.defval, function(k,v){
				selected = (k == val.value)? 'selected': '';
				if(typeof v != 'object'){
					option += '<option '+selected+' value="'+k+'">'+v+'</option>'
				} else {
					if(typeof v.title != 'undefined'){
						option += '<option '+selected+' value="'+k+'">'+v.title+'</option>'
					}
				}
			});
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

function getMoreDetails(id){
	$.ajax({
		url: "http://10.1.66.105/wsgeofence/detail/all/"+id,
		type: "GET",
		dataType: "json",
		crossDomain: true,
		success: function(response){
			console.log(response)
			// console.log(JSON.stringify(response))
			var disabledTab = []; // list of tab index to be disabled



			$.each(listData.details, function(k,v){ 
				viewLocation(response, v)
			});

			// re-init google maps
			var asummary = $('.asummary');// reset click event to avoid stacking bind event
			asummary.unbind('click').bind('click', function(e){
				setTimeout(function(){
					google.maps.event.addDomListener(document, 'load', getMapSetting(response));
				}, 300);
				e.preventDefault();
			});

			$('#details').tabs({disabled:disabledTab});
			var form_tool = $('.form_tool');
			form_tool.unbind('click').bind('click', function(e){
				$('.form_tool').removeClass('active');
				formAction($(this).attr('data-action'),response);
				$(this).addClass('active');
				e.preventDefault();
			});
		},
		error:function (xhr, ajaxOptions, thrownError){
			$('#summary').html('<p class="message">Data not loaded.</p>');
			$('#details').tabs();
		}
	});
	return false;
}

function getMapSetting(pull_response) {
	var temp, allocations=[];
	temp = pull_response.lat_lng_string.replace(/[\)]/g, '],');
	temp = temp.replace(/[\(]/g, '[');
	temp = temp.replace('),(', ',');
	temp = '['+temp.slice(0,-1)+']';
	temp = JSON.parse([temp]);
	allocations.push(temp);

	var arrCoords = [], bounds = new google.maps.LatLngBounds();
	$.each(allocations, function(k,v){
		$.each(v, function(k1,v1){
			arrCoords.push(new google.maps.LatLng(v1[0], v1[1]));
			bounds.extend(new google.maps.LatLng(v1[0], v1[1]));
		})
	});

	var mapOptions = {
		zoom: 16,
		center: bounds.getCenter(),
		scrollwheel: false,
		navigationControl: false,
		mapTypeControl: false,
		scaleControl: false,
		draggable: true,
		streetViewControl: false
	}
	var map = new google.maps.Map(document.getElementById('location_map'), mapOptions);

	polygon = new google.maps.Polygon({
		paths: arrCoords,
		strokeColor: '#FF0000',
		strokeOpacity: 0.6,
		strokeWeight: 1,
		fillColor: '#FF0000',
		fillOpacity: 0.35
	});
	polygon.setMap(map);
}

function viewLocation(pull_response, setlist) {
	var temp =  viewDetails(pull_response, setlist, 'dd');
	$('#geofence_details').html(temp);

	// init google maps, set delay 0.3 sec
	setTimeout(function(){
		google.maps.event.addDomListener(document, 'load', getMapSetting(pull_response));
	}, 300);
}

function viewDetails(data, setlist, type){
	// console.log(getValid(data[0]), data, type)
	var template = '', attr, data_set, data_field;	
	$.each(setlist.data, function(k,v){
		template +='<span class="sub_tab_title">'+v.name+'</span>';
		template +='<div id="location_map"></div>';
		if(typeof data != 'undefined'){
			template += '<dl>';
				$.each(v.list, function(k2,v2){                     
					data_set = (getLength(setlist.set) >= 1)?setlist.set[0]: setlist.set;
					attr_ori = (typeof data[0] != 'undefined')? data[0][k2]: data[k2];
					data_field = k2;
					attr = (typeof getDefiniton(k2,attr_ori) != 'undefined')? getDefiniton(k2,attr_ori): attr_ori;

					template +='<dt>'+v2+'</dt>';
					template +='<dd class="datafield" data-set="'+data_set+'" data-field="'+k2+'" data-val="'+attr_ori+'" id="'+k2+'">'+attr+'</dd>';
				});
			template +='</dl>';
		} else {
			template +='<p class="message">'+v.ifEmpty+'</p>';
		}
	});
	return template;
}

function addLocation(pull_response){
	// console.log(pull_response)
	addForm(pull_response)
	var mapOptions = {
		center: new google.maps.LatLng(3.046711327972767, 101.69537544250488),
		zoom: 16,
		scrollwheel: false,
		navigationControl: false,
		mapTypeControl: false,
		scaleControl: false,
		draggable: true,
		streetViewControl: false
	};

	var map = new google.maps.Map(document.getElementById('location_map'), mapOptions);

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function (position) {
			initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			map.setCenter(initialLocation);
		});
	}

	var drawingManager = new google.maps.drawing.DrawingManager({
	drawingMode: google.maps.drawing.OverlayType.POLYGON,
	drawingControl: true,
	drawingControlOptions: {
		position: google.maps.ControlPosition.TOP_CENTER,
		drawingModes: [
			google.maps.drawing.OverlayType.POLYGON
		]
	},
	polygonOptions: stroke_fill,
	rectangleOptions: stroke_fill
	});
	drawingManager.setMap(map);

	// var getPoly = [];
	google.maps.event.addListener(drawingManager, 'overlaycomplete', function(event) {
	var getPolies = [];
	var getPoly = '';
		if (event.type == google.maps.drawing.OverlayType.POLYGON) {
			var vertices = event.overlay.getPath();
			for (var i =0; i < vertices.getLength(); i++) {
				var xy = vertices.getAt(i);
				// getPoly.push([xy.lat(), xy.lng()]);
				// getPoly.push('('+xy.lat()+', '+xy.lng()+')');
				getPoly += '('+xy.lat()+', '+xy.lng()+')';
			}
		}
		getPolies.push(getPoly);
		// $('#lat_lng_string').attr('data-val',JSON.stringify(getPolies));
		$('#lat_lng_string').attr('data-val',getPolies);
		console.log(getPolies)
	});
}

function reinit(){
	$.ajax({
		url: "http://10.1.66.105/wsgeofence/list/all/",
		type: "GET",
		dataType: "json",
		crossDomain: true,
		beforeSend: function(xhr){}
	}).success(function(response) {
		var list = getList(response);
		pushTable(list);
		// Liferay.fire('getMoreDetails',{
		//     id: response.data[0]['id']
		// });
		getMoreDetails(response.data[0]['id']);
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

// Form Editor Start
function formAction(action,push_response){
	console.log(action,push_response)
	switch(action){
		case 'add':
			$('.form_actions').show();
			$('.tools').hide();
			$('a.delete').hide();
			$('.save').attr('data-type', 'add');
			setTimeout(function(){
				google.maps.event.addDomListener(document, 'load', addLocation(push_response));
			}, 300);
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
	// setTimeout(function(){
	// 	google.maps.event.addDomListener(document, 'load', viewLocation(push_response));
	// }, 300);
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
		val     = $(this).attr('data-val');

		fetch_data = listData.edit[set][field];
		fetch_data['value'] = '';

		// if lisData.edit.object.defval defined
		if(typeof fetch_data.defval != 'undefined' && fetch_data.defval != ''){
			fetch_data['defval'] = fetch_data.defval;
		} else {
			if(fetch_data.type == 'select'){
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
			}
		}

		var input = getElem(fetch_data.type,fetch_data);
		input.on('change', function(){
			$(this).parent().attr('data-val',$(this).val());
		});
		$(this).html(input);
	});
}

function deleteForm(pull_response){
	// TBA get user confirmation before delete
	var getids = []
	getids.push(pull_response.id)
	var geofences = {
		'geofences':getids
	}
	$.ajax({
		url: "http://10.1.66.105/wsgeofence/delete/",
		type: "POST",
		data: JSON.stringify(geofences),
		crossDomain: true,
		success: function(response){
			if(response.status == 'success'){
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

function editForm(pull_response){
	var datafield = $('.datafield');
	var set, field, val, rel;

	$.each(datafield, function(k,v){
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
	console.log(pull_response, type)
	pull_response.id = (type == 'add')?'': pull_response.id;
	var url ={
		add: "http://10.1.66.105/wsgeofence/add/",
		edit: "http://10.1.66.105/wsgeofence/update/"+pull_response.id
	}

	var datafield 	= $('.datafield');
	var message 	= $('#message');
	var set, field, val, temp = {};
	temp['id'] = "";
	$.each(datafield, function(k,v){
		set		= $(v).attr('data-set');
		field	= $(v).attr('data-field');
		val		= $(v).attr('data-val');
		temp[field] = val;
	});
	var pushData = JSON.stringify(temp);
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
	// tempEjasLatLng(pull_response.location_list.lat_lng_string)
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
var stroke_fill = {	
	strokeColor: '#FF0000',
	strokeOpacity: 0.6,
	strokeWeight: 1,
	fillColor: '#FF0000',
	fillOpacity: 0.35
}
var listData = {
	'list': {
		'geofence':{
			'geofence_list':{
				name: 'Locations List',
				list: {
					'id': 'ID',
					'location_name': 'Location Name',
					'floor_no': 'Floor No.',
					// 'lat_lng_string': 'Lat/Lng',
					'location_status': 'Status',
					'created_at': 'Created',
					// 'updated_at': 'Updated'
				}
			}
		}         
	},
	'details': {  
		'geofence':{
			data: {
				'geofence_details':{
					name: 'Locations Details',
					list: {
						'location_name': 'Location Name',
						'floor_no': 'Floor No.',
						// 'id': 'ID',
						'lat_lng_string': 'Lat/Lng',
						'location_status': 'Status',
						'created_at': 'Created',
						'updated_at': 'Updated'
					}
				}
			},
			set: 'data',
			type: 'map'
		}       
	},
	'edit': {
		'data': {
			'id': {name: 'id', type: 'text', value:''},
			'location_name': {name: 'location_name', type: 'text', value:''},
			'lat_lng_string': {name: 'lat_lng_string', type: 'hidden', value:''},
			'floor_no': {name: 'floor_no', type: 'select', value:0, defval:[0,1,2,3,4,5,6,7,8,9,10]},
			'location_status': {name: 'location_status', type: 'select', value:1, defval:['Inactive', 'Active']},
			'updated_at': {name: 'updated_at', type: 'hidden', value:''},
			'created_at': {name: 'created_at', type: 'hidden', value:''}
		}
	}
}
