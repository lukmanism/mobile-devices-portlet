// user-defined attribute
var listData = {
    'list': {
        'locations':{
            'map': {
                name: 'Device\'s Approximate Location',
                list: {
                    'latitude': 'latitude',
                    'longitude': 'longitude'
                },
                ifEmpty:''
            }
        } ,
        'stats':{
            'platform': {
                name: 'Platform',
                list: {
                    // 'id': 'id',
                    // 'enrolled_at': 'enrolled_at',
                    // 'device_name': 'Device Name',
                    'status': 'Status',
                    'platform_id': 'Platform',
                    'device_os_version': 'Device OS Ver.'
                },
                stats_set: {
                    'status': {
                        title: 'Status',
                        color: ['#F79273','#B6DE8C'],
                        type: 'pie'
                    },
                    'platform_id': {
                        title: 'Platform',
                        color: ['#9DA6A5','#D2E44F'],
                        type: 'column',
                        group: 'platform'
                    },
                    'device_os_version_1': {
                        title: 'Android Version',
                        color: ['#B5DE8C','#6DAD8C','#F6B19B','#D888A4'],
                        type: 'column',
                        group: 'platform'
                    },
                    'device_os_version_2': {
                        title: 'iOS Version',
                        color: ['#789078','#A8C090','#D8D890','#D8C078','#A89060'],
                        type: 'column',
                        group: 'platform'
                    }
                },
                ifEmpty:''
            }
        }           
    }
}


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

function pushTable(td){
    var fields = []
    $.each(td[0], function(k,v){
        fields.push({ field: k, title: getDefiniton('fields_device',k)})
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
            }
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
    Liferay.fire('getDeviceDetails',{
        id: clickData.id
    });
    return false;
}

function getMoreDetails(id){
    $.ajax({
        url: "http://10.1.66.105/wsdevice/detail/all/"+id,
        type: "GET",
        dataType: "json",
        crossDomain: true,
        success: function(response){
            var disabledTab = []; // list of tab index to be disabled

            var summary = viewDetails(response.device, listData.details.device, true);
            $('#summary').html(summary);

            var apps = (response.device_apps.length != 0)? viewDetails(response.device_apps, listData.details.apps, 'table'): disabledTab.push(2);
            $('#apps').html(apps);

            var geofence = (response.device_location_activity.length != 0)? viewDetails(response.device_location_activity, listData.details.location_activity): disabledTab.push(4);
            $('#geofence').html(geofence);

            var policies = (response.device_policy.length != 0)? viewDetails(response.device_policy, listData.details.policy): disabledTab.push(3);
            $('#policies').html(policies);

            // init google maps
            if(response.device_locate.length != 0){
                $('.alocation').click(function(){
                    setTimeout(function(){
                    google.maps.event.addDomListener(document, 'load', viewLocation(response.device_locate[0]['attributes']['latitude'],response.device_locate[0]['attributes']['longitude']));
                    }, 300);
                });
            } else {
                disabledTab.push(1);
            }

            $('#details').tabs({disabled:disabledTab});
        },
        error:function (xhr, ajaxOptions, thrownError){
            $('#summary').html('<p class="message">Data not loaded.</p>');
            $('#details').tabs({disabled:[1,2,3,4]});
        }
    });
    return false;
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
    $.each(setlist, function(k,v){
        template +='<span class="sub_tab_title">'+v.name+'</span>'

        if(typeof data != 'undefined'){
            if(typeof type != 'undefined'){ // check if table=true or null
                template +='<dl>'
                    $.each(v.list, function(k2,v2){
                        attr = (typeof data[0] != 'undefined')? data[0]['attributes'][k2]: data['attributes'][k2];
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
                        template +='<td>'+v3['attributes'][k2]+'</td>'
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