// user-defined attribute
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
            'geofence_details':{
                name: 'Locations Details',
                list: {
                    'created_at': 'Created',
                    'floor_no': 'Floor No.',
                    'id': 'ID',
                    'lat_lng_string': 'Lat/Lng',
                    'location_name': 'Location Name',
                    'location_status': 'Status',
                    'updated_at': 'Updated'
                }
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
    $.each(listData.list.geofence.geofence_list.list, function(k,v){
        fields.push({field: k, title: v})
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

function pushMoreDetails(e){
    var clickData = this.dataItem($(e.currentTarget).closest("tr"));
    // getMoreDetails(clickData.id)
    Liferay.fire('getLocationDetails',{
        id: clickData.id
    });
    return false;
}

function getMoreDetails(id){
// num = device id
// user id =10434
    $.ajax({
        url: "http://10.1.66.105/wsgeofence/list/all/"+id,
        type: "GET",
        dataType: "json",
        crossDomain: true,
        success: function(response){
            var disabledTab = []; // list of tab index to be disabled

            // init google maps
            setTimeout(function(){
                google.maps.event.addDomListener(document, 'load', viewLocation(response));
            }, 300);

            // re-init google maps
           $('.asummary').click(function(){
                setTimeout(function(){
                    google.maps.event.addDomListener(document, 'load', viewLocation(response));
                }, 300);
            });

            $('#details').tabs({disabled:disabledTab});
        },
        error:function (xhr, ajaxOptions, thrownError){
            $('#summary').html('<p class="message">Data not loaded.</p>');
            $('#details').tabs();
        }
    });
    return false;
}

function viewLocation(response) {

    var temp, allocations=[];
    $.each(response.data, function(k,v){     

        // temporary until reformart lat_lng_string into json string
        temp = v.lat_lng_string.replace(/[\)]/g, '],');
        temp = temp.replace(/[\(]/g, '[');
        temp = '['+temp.slice(0,-1)+']';
        temp = JSON.parse([temp]);

        allocations.push(temp);
    });

    var arrCoords = [], bounds = new google.maps.LatLngBounds();
    $.each(allocations, function(k,v){
        $.each(v, function(k1,v1){
            arrCoords.push(new google.maps.LatLng(v1[0], v1[1]));
            bounds.extend(new google.maps.LatLng(v1[0], v1[1]));
        })
    })

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
