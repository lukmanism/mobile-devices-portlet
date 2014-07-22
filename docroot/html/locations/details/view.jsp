<%@ taglib uri="http://java.sun.com/portlet_2_0" prefix="portlet" %>
<portlet:defineObjects />

    <link href="http://code.jquery.com/ui/1.11.0/themes/smoothness/jquery-ui.css" rel="stylesheet">
    <link href="<%=request.getContextPath()%>/html/locations/details/css/locations_details.css" rel="stylesheet" />

<div id="container">
    <div id="details">
        <ul>
            <li><a class="asummary" href="#summary">Summary</a></li>
            <li class="ui-tab-dialog-close"></li>
        </ul>
        <div>
        <div id="summary"><span class="sub_tab_title">Summary</span><div id="location_map"></div></div>
        </div>
    </div>
</div>

<script>
$(document).ready(function() {
    Liferay.on('getLocationDetails',function(event) {
        getMoreDetails(event.id);
    });  
});  
</script>