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

function pushMoreDetails(e){
    var clickData = this.dataItem($(e.currentTarget).closest("tr"));

    getMoreDetails(clickData.id)  
    // Liferay.fire('getPolicyDetails',{
    //     id: clickData.id
    // });
    return false;
}


function getMoreDetails(id){
    $.ajax({
        url: "http://10.1.66.105/wspolicy/detail/all/"+id,
        type: "GET",
        dataType: "json",
        crossDomain: true,
        success: function(response){
            console.log(response)
            var disabledTab = []; // list of tab index to be disabled
            var i = 0, getset;
            $.each(listData.details, function(k,v){
            // console.log(k,v)
                if(typeof v.set == 'object'){
                    var cross_data = {
                        master: response[v.set[0]],
                        slave: response[v.set[1]],
                        rel: v.rel
                    }
                    crossData(cross_data);
                    getset = v.set[0];
                } else {
                    getset = v.set;
                }
                var temp = (getValid(response[getset]))? viewDetails(response[getset], v, v.type): disabledTab.push(i);
                $('#'+k).html(temp);
                i++;
            })
            $('#details').tabs({disabled:disabledTab});
            $('.form_tool').bind('click', function(){
                $('.form_tool').removeClass('active');
                formAction($(this).attr('data-action'));
                $(this).addClass('active')
                return false;
            })
        },
        error:function (xhr, ajaxOptions, thrownError){
            $('#summary').html('<p class="message">Data not loaded.</p>');
            $('#details').tabs({disabled:[1,2,3,4,5,6]});
        }
    });
    return false;
}

function formAction(type){
    // console.log(type)
    switch(type){
        case 'add':
        break;
        case 'edit':
            editForm();
            // console.log(listData.edit)
        break;
        case 'impose':
        break;
    }
}

function editForm(){
    var datafield = $('.datafield');
    $.each(datafield, function(k,v){
        // console.log(k,v)
        var fetch_data = listData.edit[$(this).attr('data-set')][$(this).attr('data-field')];
        fetch_data['value'] = (fetch_data.value != '')? fetch_data.value: $(this).attr('data-val');

        var input = getElem(fetch_data.type,fetch_data);


        $(this).html(input);

    })
}

function getElem(type,val){ 
    var subelem, pushElem, option='', selectVal = [];
    var form_container = $('<div/>').attr('class', 'form_container');   
    var form_row;   
    var form_chain = $('<div/>').attr('class', 'form_chain active');    
    var form_section = $('<div/>').attr('class', 'form_section');
    var label = $('<label for="'+val.name+'"/>').html(val.title);
    var properties = (val.disabled === true)? 'disabled': '';
    properties = (val.checked === true)? properties+' checked': properties;
    properties = (type == 'select-multiple')? properties+' multiple': properties;

    switch(type){
        case 'section':
            form_section.attr('id', val.name);
            if(checkVal(val.subtitle))
                form_section.append($('<span class="form_subtitle"/>').html(val.subtitle))
            if(checkVal(val.desc))
                form_section.append($('<span class="form_desc"/>').html(val.desc))

            $.each(val.value, function(k,v){
                form_row.append(getElem(v.type, v))
            })

            form_section.append(form_row)
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
            // form_row = $('<input '+properties+'/>').attr('type', 'text').attr('name', val.name).datepicker();
            // "setDate", new Date(val.value)
        break;

        case 'textarea':
            form_row = $('<textarea '+properties+'/>').attr('type', type).attr('name', val.name)
        break;

        case 'select':
        case 'select-multiple':
        // console.log(type,val)
            $.each(val.value, function(k,v){
                if(typeof v != 'object'){
                    option += '<option value="'+k+'">'+v+'</option>'
                } else {
                    if(typeof v.title != 'undefined'){
                        option += '<option value="'+k+'">'+v.title+'</option>'
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
                form_chain.html('')
                $.each(selectVal[val.name][selected], function(k1,v1){
                    form_chain.append(getElem(v1.type, v1))
                })
            }));

            $.each(val.chain_value, function(k,v){
                selectVal[val.name] = v.value;
                form_row.append(form_section.append(getElem(v.type, v)))
                $.each(v.value[0], function(k1,v1){
                    form_chain.append(getElem(v1.type, v1))
                })
                // if(form_chain[0]['textContent'] != '')
                form_row.append(form_chain)
            })
        break;
    }
    pushElem = form_row;
    return  pushElem;
}

function crossData(data){
    var temp = data.master;
    $.each(data.master, function(k,v){
        $.each(v, function(k1,v1){
            if(getValid(data.slave)){
                $.each(data.slave, function(k2,v2){
                    if(v.id == v2[data.rel]){
                        temp[k]['push_val'] = 1;
                    } else {
                        temp[k]['push_val'] = 0;
                    }
                })
            } else {
                temp[k]['push_val'] = 0;
            }
        })
    });
    return temp;
}

function getValid(val){
    var status, type = typeof val;
    // console.log(val,type)
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

function dynElements(val){
    // TBC return dynamic selection 

    // $.each(val, function(){
    // })
    return false
}

function viewLocation(lat,lng) {
    var myLatlng = new google.maps.LatLng(lat,lng);
    var mapOptions = {
        zoom: 16,
        center: myLatlng,
        scrollwheel: false,
        navigationControl: false,
        mapTypeControl: false,
        scaleControl: false,
        draggable: true,
        streetViewControl: false
    }
    var map = new google.maps.Map(document.getElementById('location_map'), mapOptions);
    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        title: 'Device Location'
    });
}

function viewDetails(data, setlist, type){
    // console.log(data[0])
    var template = '', attr, attr_ori;
    $.each(setlist.data, function(k,v){
        template +='<span class="sub_tab_title">'+v.name+'</span>'
        if(typeof data != 'undefined'){
            if(type != 'table'){ // check if table=true or null
                template +='<dl>'
                    $.each(v.list, function(k2,v2){
            // console.log(k2, data)
                        attr_ori = (typeof data[0] != 'undefined')? data[0][k2]: data[k2];
                        attr = (typeof getDefiniton(k2,attr_ori) != 'undefined')? getDefiniton(k2,attr_ori): attr_ori;
                        template +='<dt>'+v2+'</dt>'
                        template +='<dd class="datafield" data-set="'+setlist.set+'" data-field="'+k2+'" data-val="'+attr_ori+'">'+attr+'</dd>'
                    });
                template +='</dl>'
            } else {
            // console.log(k,v)
                template +='<table>'
                template +='<tr>'
                $.each(v.list, function(k2,v2){
                    template +='<th>'+v2+'</th>'
                });
                template +='</tr>'
                $.each(data, function(k3,v3){                       
                    template +='<tr>'
                    $.each(v.list, function(k2,v2){
                        if(typeof v3[k2] == 'string'){
                            template +='<td>'+v3[k2]+'</td>'
                        } else {
                        console.log(k3,v3.id)
// TBC
                            template +='<td class="datafield" data-set="'+k+'" data-field="'+k2+'" data-val="'+v3[k2]+'">'+v3[k2]+'</td>'
                        }
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






// user-defined attribute
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
                        'ap_status': 'AP Status'
                    }
                }
            },
            set: ['wifi_access_points_list','policy_wifi'],
            type: 'table',
            rel: 'wifi_id'
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
            set: ['blacklist_app_list', 'policy_location_blacklist_app'],
            rel: ['policy_app_id'],
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
            'created_at': {name: 'created_at', type: 'date', value:''},
            'id': {name: 'id', type: 'text', value:''},
            'platform_id': {name: 'platform_id', type: 'text', value:''},
            'push_val': {name: 'push_val', type: 'select', value:['Disabled', 'Enabled']},
            'updated_at': {name: 'updated_at', type: 'hidden', value:''}
        },
        'location_list': {
            'created_at': {name: 'created_at', type: 'date', value:''},
            'floor_no': {name: 'floor_no', type: 'text', value:''},
            'id': {name: 'id', type: 'text', value:''},
            'lat_lng_string': {name: 'lat_lng_string', type: 'text', value:''},
            'location_name': {name: 'location_name', type: 'text', value:''},
            'location_status': {name: 'location_status', type: 'text', value:''},
            'updated_at': {name: 'updated_at', type: 'hidden', value:''}
        },
        'policy_location_blacklist_app': {
            'created_at': {name: 'created_at', type: 'date', value:''},
            'id': {name: 'id', type: 'text', value:''},
            'policy_app_id': {name: 'policy_app_id', type: 'text', value:''},
            'policy_location_id': {name: 'policy_location_id', type: 'text', value:''},
            'profile_id': {name: 'profile_id', type: 'text', value:''},
            'updated_at': {name: 'updated_at', type: 'hidden', value:''}
        },
        'policy_location_profile': {
            'created_at': {name: 'created_at', type: 'date', value:''},
            'id': {name: 'id', type: 'text', value:''},
            'location_id': {name: 'location_id', type: 'text', value:''},
            'location_name': {name: 'location_name', type: 'text', value:''},
            'policy_gl_status': {name: 'policy_gl_status', type: 'text', value:''},
            'profile': {name: 'profile', type: 'text', value:''},
            'updated_at': {name: 'updated_at', type: 'hidden', value:''}
        },
        'policy_passcode': {
            'alphanumeric': {name: 'alphanumeric', type: 'select', value:['Disabled', 'Enabled']},
            'auto_lock': {name: 'auto_lock', type: 'select', value:['Disabled', 'Enabled']},
            'created_at': {name: 'created_at', type: 'date', value:['Disabled', 'Enabled']},
            'grace_period': {name: 'grace_period', type: 'select', value:['Disabled', 'Enabled']},
            'history': {name: 'history', type: 'select', value:['Disabled', 'Enabled']},
            'id': {name: 'id', type: 'select', value:['Disabled', 'Enabled']},
            'max_age': {name: 'max_age', type: 'select', value:['Disabled', 'Enabled']},
            'max_fail': {name: 'max_fail', type: 'select', value:['Disabled', 'Enabled']},
            'min_complex_char': {name: 'min_complex_char', type: 'select', value:['Disabled', 'Enabled']},
            'min_length': {name: 'min_length', type: 'select', value:['Disabled', 'Enabled']},
            'payload_uuid': {name: 'payload_uuid', type: 'select', value:['Disabled', 'Enabled']},
            'profile_id': {name: 'profile_id', type: 'select', value:['Disabled', 'Enabled']},
            'simple': {name: 'simple', type: 'select', value:['Disabled', 'Enabled']},
            'updated_at': {name: 'updated_at', type: 'hidden', value:['Disabled', 'Enabled']}
        },
        'policy_profile': {
            'allow_compromised_device': {name: 'allow_compromised_device', type: 'text', value:''},
            'allow_remote_locate': {name: 'allow_remote_locate', type: 'select', value:['Disabled', 'Enabled']},
            'allow_remote_lock_factory_reset': {name: 'allow_remote_lock_factory_reset', type: 'select', value:['Disabled', 'Enabled']},
            'call_logging': {name: 'call_logging', type: 'select', value:['Disabled', 'Enabled']},
            'created_at': {name: 'created_at', type: 'date', value:''},
            'description': {name: 'description', type: 'text', value:''},
            'id': {name: 'id', type: 'text', value:''},
            'identifier': {name: 'identifier', type: 'text', value:''},
            'org_name': {name: 'org_name', type: 'text', value:''},
            'ownership_type': {name: 'ownership_type', type: 'text', value:''},
            'profile_name': {name: 'profile_name', type: 'text', value:''},
            'sms_logging': {name: 'sms_logging', type: 'select', value:['Disabled', 'Enabled']},
            'status': {name: 'status', type: 'text', value:''},
            'type': {name: 'type', type: 'text', value:''},
            'updated_at': {name: 'updated_at', type: 'hidden', value:''}
        },
        'policy_vpn': {
            'created_at': {name: 'created_at', type: 'date', value:''},
            'id': {name: 'id', type: 'text', value:''},
            'policy_gv_status': {name: 'policy_gv_status', type: 'text', value:''},
            'profile_id': {name: 'profile_id', type: 'text', value:''},
            'updated_at': {name: 'updated_at', type: 'hidden', value:''}
        },
        'policy_wifi': {
            'ap_name': {name: 'ap_name', type: 'text', value:''},
            'created_at': {name: 'created_at', type: 'date', value:''},
            'id': {name: 'id', type: 'text', value:''},
            'policy_gw_status': {name: 'policy_gw_status', type: 'text', value:''},
            'profile': {name: 'profile', type: 'text', value:''},
            'updated_at': {name: 'updated_at', type: 'hidden', value:''}
        },
        'wifi_access_points_list': {
            'ap_name': {name: 'ap_name', type: 'text', value:''},
            'ap_status': {name: 'ap_status', type: 'text', value:''},
            'created_at': {name: 'created_at', type: 'date', value:''},
            'id': {name: 'id', type: 'text', value:''},
            'location_id': {name: 'location_id', type: 'text', value:''},
            'mac_address': {name: 'mac_address', type: 'text', value:''},
            'updated_at': {name: 'updated_at', type: 'hidden', value:''}
        }
    }
}
