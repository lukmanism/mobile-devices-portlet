<%@ taglib uri="http://java.sun.com/portlet_2_0" prefix="portlet" %>
<portlet:defineObjects />
    <link rel="stylesheet" href="<%=request.getContextPath()%>/css/utilities.css">
<div class="container">
    <div id="config"></div>
</div>
<script type="text/javascript">
var enabled_policy = [
    'general',
    'passcode',
    'restrictions',
    'wifi',
    'vpn',
    'email',
    'exchange_activesync',
    'ldap',
    'calendar',
    'subscribed_calendar',
    'contacts',
    'web_clips',
    'credentials',
    'scep',
    'mobile_device_management',
    'apn'
]
var style = {
    tabs: true
}
var tab_header = $('<ul/>');
var form_elements = $('#config')
var forms = [];

$.each(policy_ios, function(k,v){
    if($.inArray(v.name, enabled_policy) >= 0){
        var form = getElem(v.type, v);
        if((Object.keys(v.value).length >= 1)){
            $.each(v.value, function(k1,v1){
                form.append(getElem(v1.type, v1))
                if(typeof v1.value == 'undefined'){
                    if(typeof v1.value == 'object' && (Object.keys(v1.value).length >= 1))
                    $.each(v1.value, function(k2,v2){
                        if(typeof v2.value != 'undefined'){
                            if(typeof v2.value == 'object' && (Object.keys(v2.value).length >= 1))
                            form.append(getElem(v2.type, v2))
                            $.each(v2.value, function(k3,v3){
                                if(typeof v3.value != 'undefined'){
                                    if(typeof v3.value == 'object' && (Object.keys(v3.value).length >= 1))
                                    form.append(getElem(v3.type, v3))
                                    $.each(v3.value, function(k4,v4){
                                        if(typeof v4.value != 'undefined'){
                                            if(typeof v4.value == 'object' && (Object.keys(v4.value).length >= 1))
                                            form.append(getElem(v4.type, v4))
                                        }
                                    })  
                                }
                            })
                        }
                    })      
                }
            })
        }
    }
    if(style.tabs == true){
        form = $('<div/>').attr('class', 'form').attr('id', v.name).append(form);
        tab_header.append(tabHeader(v));
    }
    forms.push(form)
})
form_elements.append($('<div class="forms"/>').append(forms));
form_elements.prepend(tab_header);
form_elements.tabs().addClass( "ui-tabs-vertical ui-helper-clearfix" );

</script>