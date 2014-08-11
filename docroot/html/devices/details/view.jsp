<%@ taglib uri="http://java.sun.com/portlet_2_0" prefix="portlet" %>
<portlet:defineObjects />

    <link href="http://code.jquery.com/ui/1.11.0/themes/smoothness/jquery-ui.css" rel="stylesheet">
    <link href="<%=request.getContextPath()%>/html/devices/details/css/devices_details.css" rel="stylesheet" />
       
<div class="portlet_container">
    <div id="details">
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
    $(document).ready(function() {
        Liferay.on('getDeviceDetails',function(event) {
            getMoreDetails(event.id);
        });  
    });   
</script>