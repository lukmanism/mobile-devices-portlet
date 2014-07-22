<%@ taglib uri="http://java.sun.com/portlet_2_0" prefix="portlet" %>
<portlet:defineObjects />
<%--
    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/html/app/featured/css/hover-min.css" />
    <link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/html/app/featured/css/mani.bookshelf.css" />
    <script type="text/javascript" src="<%=request.getContextPath()%>/html/app/featured/lib/jquery.transit.min.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/html/app/featured/lib/owl.carousel.min.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/html/app/featured/js/apps.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/html/app/featured/js/mani.bookshelf.js"></script>          
--%>

    <link href="http://cdn.kendostatic.com/2014.1.528/styles/kendo.common.min.css" rel="stylesheet" />
    <link href="http://cdn.kendostatic.com/2014.1.528/styles/kendo.default.min.css" rel="stylesheet" />
    <link href="http://cdn.kendostatic.com/2014.1.528/styles/kendo.dataviz.min.css" rel="stylesheet" /> 
    <link href="http://cdn.kendostatic.com/2014.1.528/styles/kendo.dataviz.default.min.css" rel="stylesheet" />
    <link href="http://code.jquery.com/ui/1.11.0/themes/smoothness/jquery-ui.css" rel="stylesheet">
    <link href="<%=request.getContextPath()%>/css/device.css" rel="stylesheet" />

    <script src="http://code.jquery.com/ui/1.11.0/jquery-ui.js"></script>
    <script src="<%=request.getContextPath()%>/js/definition.js"></script>
    <script src="https://maps.googleapis.com/maps/api/js?v=3.exp"></script>

    <div id="container">
        <div class="filter">
            <input type="text" id="search" placeholder="Filter" class="input"/>
        </div>
        <div class="compare"></div>
        <div id="details" style="display: none;">
            <ul>
                <li><a class="asummary" href="#summary">Summary</a></li>
                <li><a class="alocation" href="#location">Latest Location</a></li>
                <li><a class="aapps" href="#apps">Installed Apps</a></li>
                <li><a class="apolicies" href="#policies">Policies</a></li>
                <li><a class="ageofence" href="#geofence">Geofence Activities</a></li>
                <li class="ui-tab-dialog-close"></li>
            </ul>
            <div>
            <div id="summary"></div>
            <div id="location"><span class="sub_tab_title">Device Location</span><div id="location_map"></div></div>
            <div id="apps"></div>
            <div id="policies"></div>
            <div id="geofence"></div>
            </div>
        </div>
    </div>

<script>
    // user-defined attribute
    var listData = {
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

    $(document).ready(function() {
        $.ajax({
            url: "http://10.1.66.105/wsdevice/list/10434/?page=0",
            type: "GET",
            dataType: "json",
            crossDomain: true,
            beforeSend: function(xhr){}
        }).success(function(response) {
            var list = getList(response);
            pushTable(list);
        });
    });

    function getList(data){
        var td = [];
        $.each(data, function(k,v){
            $.each(v.attributes, function(k2,v2){
                v.attributes[k2] = getDefiniton(k2,v2);
            });
            td.push(v.attributes)
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
        fields.push({command: { text: "More", click: getMoreDetails, attributes:{class:"test"} }});

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

    function getMoreDetails(e){
        var clickData = this.dataItem($(e.currentTarget).closest("tr"));
        $.ajax({
            url: "http://10.1.66.105/wsdevice/detail/10434/"+clickData.id,
            type: "GET",
            dataType: "json",
            crossDomain: true,
            success: function(response){
                // construct tab
                $.fn.tabbedDialog = function () {
                    var disabledTab = []; // list of tab index to be disabled
                    this.tabs();
                    this.dialog({'modal':true,'width':'80%', 'minHeight':600,'draggable':false});
                    this.find('.ui-tab-dialog-close').append($('a.ui-dialog-titlebar-close'));
                    $('.ui-dialog-title').html(response.device.attributes.device_name);

                    var summary = viewDetails(response.device, listData.device);
                    $('#summary').html(summary);

                    var apps = (response.device_apps.length != 0)? viewDetails(response.device_apps, listData.apps, 'table'): disabledTab.push(2);
                    $('#apps').html(apps);

                    var geofence = (response.device_location_activity.length != 0)? viewDetails(response.device_location_activity, listData.location_activity): disabledTab.push(4);
                    $('#geofence').html(geofence);

                    var policies = (response.device_policy.length != 0)? viewDetails(response.device_policy, listData.policy): disabledTab.push(3);         
                    $('#policies').html(policies);

                    // init google maps
                    if(response.device_locate.length != 0){
                        $('.alocation').click(function(){
                            google.maps.event.addDomListener(document, 'load', viewLocation(response.device_locate[0]['attributes']['latitude'],response.device_locate[0]['attributes']['longitude']));
                        });
                    } else {
                        disabledTab.push(1);
                    }   
                    // remove empty tab                             
                    this.tabs({disabled:disabledTab});
                }
                // construct modal window
                $('#details').tabbedDialog();
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
                if(!type){ // check if table=true or null
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
                        template +='<td>'+v2+'</td>'
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
</script>