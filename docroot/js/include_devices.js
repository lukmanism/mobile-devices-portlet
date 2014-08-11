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

function pushMoreDetails(e){
    var clickData = this.dataItem($(e.currentTarget).closest("tr"));
    getMoreDetails(clickData.id)
    // Liferay.fire('getDeviceDetails',{
    //     id: clickData.id
    // });
    return false;
}

function createElement(type,key,val,html){
    var ul = $('<ul/>');
    var li = $('<li/>');
    var a = $('<a/>');
    var div = $('<div/>');

    var temp;

    switch(type){
        case 'li':
            temp = li.append(a.attr('class', 'a'+key).attr('href', '#'+key).html(val.title))
        break;
        case 'div':
            temp = div.attr('id',key).html(html)
        break;
    }




    // ul.append()

    // div.append(div2)

    return temp
}

    

// <ul>
//     <li><a class="asummary" href="#device">Summary</a></li>
//     <li><a class="alocation" href="#location">Latest Location</a></li>
//     <li><a class="aapps" href="#apps">Installed Apps</a></li>
//     <li><a class="apolicies" href="#policy">Policies</a></li>
//     <li><a class="ageofence" href="#locatiopn_activity">Geofence Activities</a></li>
//     <li class="ui-tab-dialog-close"></li>
// </ul>
// <div>
//     <div id="device"></div>
//     <div id="location"><span class="sub_tab_title">Device Location</span><div id="location_map"></div></div>
//     <div id="apps"></div>
//     <div id="policy"></div>
//     <div id="locatiopn_activity"></div>
// </div>


function getMoreDetails(id){
    $.ajax({
        url: "http://10.1.66.105/wsdevice/detail/all/"+id,
        type: "GET",
        dataType: "json",
        crossDomain: true,
        success: function(response){
            console.log(response)
            var disabledTab = []; // list of tab index to be disabled

            var i = 0, getset, getEl = [];
            var ul = $('<ul/>');
            var div = $('<div/>');
            var push_tabs =  $('#details');

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
                var temp;
                if(getValid(response[getset])){
                    temp = viewDetails(response[getset], v, v.type)
                } else {
                    temp = '<p class="message">No data.</p>';
                    disabledTab.push(i)
                }
                // $('#'+k, ).html(temp);

                    ul.append(createElement('li',k,v, temp))
                    div.append(createElement('div',k,v, temp))
                i++;
            })

        // console.log(getEl)
            push_tabs.html([ul,div]).hide();
            console.log(push_tabs)
            setTimeout(function(){
                push_tabs.tabs({disabled:disabledTab}).show(300);
            }, 300);


            // var summary = viewDetails(response.device, listData.details.device, true);
            // $('#summary').html(summary);

            // var apps = (response.device_apps.length != 0)? viewDetails(response.device_apps, listData.details.apps, 'table'): disabledTab.push(2);
            // $('#apps').html(apps);

            // var geofence = (response.device_location_activity.length != 0)? viewDetails(response.device_location_activity, listData.details.location_activity): disabledTab.push(4);
            // $('#geofence').html(geofence);

            // var policies = (response.device_policy.length != 0)? viewDetails(response.device_policy, listData.details.policy): disabledTab.push(3);
            // $('#policies').html(policies);

            // init google maps
            // if(response.device_locate.length != 0){
            //     $('.alocation').click(function(){
            //         setTimeout(function(){
            //         google.maps.event.addDomListener(document, 'load', viewLocation(response.device_locate[0]['latitude'],response.device_locate[0]['longitude']));
            //         }, 300);
            //     });
            // } else {
            //     disabledTab.push(1);
            // }

            // $('#details').tabs({disabled:disabledTab});
        },
        error:function (xhr, ajaxOptions, thrownError){
            $('#summary').html('<p class="message">Data not loaded.</p>');
            $('#details').tabs({disabled:[1,2,3,4]});
        }
    });
    return false;
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
    // console.log('status',status)
    return status
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
    var template = '', attr;
    $.each(setlist.data, function(k,v){
        template +='<span class="sub_tab_title">'+v.name+'</span>'

        if(typeof data != 'undefined'){
            if(type != 'table'){ // check if table=true or null
                template +='<dl>'
                    $.each(v.list, function(k2,v2){
                        attr = (typeof data[0] != 'undefined')? data[0][k2]: data[k2];
                        attr = (typeof getDefiniton(k2,attr) != 'undefined')? getDefiniton(k2,attr): attr;
                        template +='<dt>'+v2+'</dt>'
                        template +='<dd>'+attr+'</dd>'
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
                        template +='<td>'+v3[k2]+'</td>'
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
        'device':{
            data: {
                'device_summary':{
                    name: 'Device Summary',
                    list: {
                        'status': 'Status',
                        'enrolled_at': 'Enrolled'
                    }
                },
                'device_about':{
                    name: 'About Device',
                    list: {
                        'device_udid': 'Device UDID',
                        'imei': 'IMEI',
                        'serial_number': 'Serial Number',
                        'wifi_mac_address': 'WIFI Mac Address',
                        'bluetooth_enable': 'Enrolled',
                        'bluetooth_mac_address': 'Bluetooth Mac Address',
                        'ip_address': 'IP Address'
                    }
                },
                'device_info':{
                    name: 'Additional Info',
                    list: {
                        'platform_id': 'Platform Id',
                        'device_type': 'Device Type',
                        'device_os_version': 'Device Os Version',
                        'carrier_network': 'Carrier Network',
                        'kernel_version': 'Kernel Version',
                        'api_level': 'API Level',
                        'base_band_version': 'Base Band Version',
                        'build_number': 'Build Number',
                        'battery_health': 'Battery Health',
                        'battery_technology': 'Battery Technology',
                        'battery_temperature': 'Battery Temperature',
                        'data_roaming': 'Data Roaming'
                    }
                }
            },
            set: 'device',
            title: 'Summary',
            type: 'dd'
        },
        'apps':{
            data: {
                'app_info': {
                    name: 'Installed Applications',
                    list: {
                        'app_name': 'App Name',
                        'id': 'Id',
                        'app_version_name': 'App Version Name'
                    },
                    ifEmpty:'No Application Installed'
                }
            },
            set: 'device_apps',
            title: 'Installed Apps',
            type: 'dd'

        },
        'policy':{
            data: {
                'policy_info': {
                    name: 'Device Policies',
                    list: {
                        'policy_identifier': 'Policy Identifier',
                        'imposed_at': 'Date Imposed'
                    },
                    ifEmpty:'No Policy Imposed'
                }
            },
            set: 'device_policy',
            title: 'Policies',
            type: 'dd'    
        },
        'location_activity':{
            data: {
                'geofence_info': {
                    name: 'Device Geofence Activities',
                    list: {
                        'location_name': 'Location Name',
                        'isenter': 'Activity',
                        'device_timestamp': 'Device Timestamp'
                    },
                    ifEmpty:'No Geofence Activity Detected'
                }
            },
            set: 'device_locate',
            title: 'Geofence Activities',
            type: 'dd'  
        }            
    },
    'list': {
        'device':{
            'device_summary':{
                name: 'Device Summary',
                list: {
                    'status': 'Status',
                    'enrolled_at': 'Enrolled'
                }
            },
            'device_about':{
                name: 'About Device',
                list: {
                    'device_udid': 'Device UDID',
                    'imei': 'IMEI',
                    'serial_number': 'Serial Number',
                    'wifi_mac_address': 'WIFI Mac Address',
                    'bluetooth_enable': 'Enrolled',
                    'bluetooth_mac_address': 'Bluetooth Mac Address',
                    'ip_address': 'IP Address'
                }
            },
            'device_info':{
                name: 'Additional Info',
                list: {
                    'platform_id': 'Platform Id',
                    'device_type': 'Device Type',
                    'device_os_version': 'Device Os Version',
                    'carrier_network': 'Carrier Network',
                    'kernel_version': 'Kernel Version',
                    'api_level': 'API Level',
                    'base_band_version': 'Base Band Version',
                    'build_number': 'Build Number',
                    'battery_health': 'Battery Health',
                    'battery_technology': 'Battery Technology',
                    'battery_temperature': 'Battery Temperature',
                    'data_roaming': 'Data Roaming'
                }
            }
        },
        'apps':{
            'app_info': {
                name: 'Installed Applications',
                list: {
                    'app_name': 'App Name',
                    'id': 'Id',
                    'app_version_name': 'App Version Name'
                },
                ifEmpty:'No Application Installed'
            }
        },
        'policy':{
            'policy_info': {
                name: 'Device Policies',
                list: {
                    'policy_identifier': 'Policy Identifier',
                    'imposed_at': 'Date Imposed'
                },
                ifEmpty:'No Policy Imposed'
            }
        },
        'location_activity':{
            'geofence_info': {
                name: 'Device Geofence Activities',
                list: {
                    'location_name': 'Location Name',
                    'isenter': 'Activity',
                    'device_timestamp': 'Device Timestamp'
                },
                ifEmpty:'No Geofence Activity Detected'
            }
        }            
    }
}