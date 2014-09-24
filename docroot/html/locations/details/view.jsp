<%@ taglib uri="http://java.sun.com/portlet_2_0" prefix="portlet" %>
<portlet:defineObjects />

    <link href="http://code.jquery.com/ui/1.11.0/themes/smoothness/jquery-ui.css" rel="stylesheet">
    <link href="<%=request.getContextPath()%>/html/locations/details/css/locations_details.css" rel="stylesheet" />

<div class="portlet_container">
    <div class="tools">
        <ul>
            <li><a class="form_tool" data-action="add" href="#">Add</a></li>
            <li><a class="form_tool" data-action="edit" href="#">Edit</a></li>
        </ul>
    </div>

    <div class="form_actions portlet_hidden">
        <ul>
            <li><a class="form_tool green save" data-action="save" data-type="" href="#">Save</a></li>
            <li><a class="form_tool yellow" data-action="cancel" href="#">Cancel</a></li>
            <li><a class="form_tool red delete" data-action="delete" href="#">Delete</a></li>
        </ul>
    </div>

    <p id="message" class="portlet_hidden"></p>

    <div id="details">
        <ul>
            <li><a class="ageofence_details" href="#geofence_details">Summary</a></li>
            <li class="ui-tab-dialog-close"></li>
        </ul>
        <div>
        <div id="geofence_details">
            <!-- <span class="sub_tab_title">Summary</span>
            <div class="datafield" id="location_map"></div> -->
        </div>
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