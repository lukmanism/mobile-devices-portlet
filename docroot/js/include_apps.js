// user-defined attribute
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
                    // 'app_status': 'Status',
                    // 'app_type_id': 'Type',
                    // 'app_version_code': 'Version Code',
                    // 'app_version_name': 'Version Name',
                    // 'app_whats_new': 'What\'s New',
                    // 'asset_filename': 'File Name',
                    // 'asset_id': 'asset_id',
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
            'app_details':{
                name: 'Applications',
                list: {
                    'alias': 'App Name',
                    // 'api_key': 'Api Key',
                    // 'app_bugs_fixes': 'Bug Fixes',
                    'app_category_id': 'Category',
                    'app_detail': 'Details',
                    'app_device_type': 'Device Type',
                    // 'app_identifier': 'Identifier',
                    'app_lang_support': 'Language Support',
                    // 'app_name': 'App Name',
                    'app_path': 'Path', // download path
                    // 'app_promo': 'Promo',
                    'app_publish_date': 'Publish Date',
                    'app_publisher': 'Publisher',
                    // 'app_rate': 'Rating',
                    'app_status': 'Status',
                    // 'app_type_id': 'Type',
                    'app_version_code': 'Version',
                    // 'app_version_name': 'Version Name',
                    // 'app_whats_new': 'What\'s New',
                    // 'asset_filename': 'File Name',
                    // 'asset_id': 'asset_id',
                    // 'asset_path': 'Asset Path',
                    'byte_size': 'File Size',
                    // 'category_desc': 'Description',
                    // 'content_rating_id': 'content_rating_id',
                    // 'created_at': 'Created',
                    'id': 'ID',
                    'min_os_sdk_version': 'Min. OS Version',
                    'organization_id': 'Organization',
                    'platform': 'Platform',
                    // 'type': 'Type',
                    // 'updated_at': 'Updated'
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

function pushList(data){
    var li = ''
    var i = 1;
    $.each(data, function(k,v){
        var imgurl = UrlExists('http://10.1.66.105/assets/image/'+v.id);
        li += '<li data-id="id-'+(i++)+'" data-type="'+v.platform+'">';
        li += '<span><img src="'+imgurl+'" height="128" alt="'+v.alias+'" data-id="'+v.id+'"/></span>';
        li += '<p>'+v.alias+'</p>';
        li += '<p data-type="size">'+bytesToSize(v.byte_size)+'</p>';
        li += '</li>';
    });
    return li;
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


function pushMoreDetails(e){
    $('#applications img').click(function(){
        // getMoreDetails($(this).attr('data-id'));
        $('#applications li').attr('class', '');
        $(this).parent().parent().attr('class', 'active');
        Liferay.fire('getAppDetails',{
            id: $(this).attr('data-id')
        });
    });
    return false;
}

function getMoreDetails(id){
// num = device id
// user id =10434
    $.ajax({
        url: "http://10.1.66.105/wsapp/detail/all/"+id,
        type: "GET",
        dataType: "json",
        crossDomain: true,
        success: function(response){
            var disabledTab = []; // list of tab index to be disabled

            var app_details = viewDetails(response, listData.details.apps, true);
            $('#app_details').html(app_details);

            var push_app = disabledTab.push(1);
            $('#push_app').html(push_app);

            $('#details').tabs({disabled:disabledTab});
        },
        error:function (xhr, ajaxOptions, thrownError){
            $('#summary').html('<p class="message">Data not loaded.</p>');
            $('#details').tabs({disabled:[1]});
        }
    });
    return false;
}

function viewDetails(data, setlist, type){
    var template = '', attr;
    $.each(setlist, function(k,v){
        template +='<span class="sub_tab_title">'+v.name+'</span>'

        if(typeof data != 'undefined'){
            if(typeof type != 'undefined'){ // check if table=true or null
                var download_url = '';
                template +='<dl>'
                    $.each(v.list, function(k2,v2){
                        attr = (typeof data[0] != 'undefined')? data[0]['attributes'][k2]: data['attributes'][k2];
                        attr = (typeof getDefiniton(k2,attr) != 'undefined')? getDefiniton(k2,attr): attr;
                        attr = (k2 == 'byte_size')? bytesToSize(data['attributes'][k2]): attr;
                        if(k2 == 'app_path'){
                            download_url ='<div class="download"><a href="'+data['attributes'][k2]+'">Download App</a></div>'
                        } else {
                            template +='<dt>'+v2+'</dt><dd>'+attr+'</dd>'                            
                        }

                    });
                template +='</dl>'+download_url

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
                        // if(typeof v3['attributes'] != 'undefined'){
                        // console.log(v3['attributes'])
                        //     template +='<td>'+v3['attributes'][k2]+'</td>'
                        // } else {
                            template +='<td>'+data[k2]+'</td>'
                        // }
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
