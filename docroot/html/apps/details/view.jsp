<%@ taglib uri="http://java.sun.com/portlet_2_0" prefix="portlet" %>
<portlet:defineObjects />

    <link href="http://code.jquery.com/ui/1.11.0/themes/smoothness/jquery-ui.css" rel="stylesheet">
    <link href="<%=request.getContextPath()%>/html/apps/details/css/apps_details.css" rel="stylesheet" />

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
                <li><a class="aapp_details" href="#app_details">App Details</a></li>
                <li><a class="apush_app" href="#push_app">Push App</a></li>
                <li class="ui-tab-dialog-close"></li>
            </ul>
            <div>
            <div id="app_details"></div>
            <div id="push_app"></div>
            </div>
        </div>
    </div>

<script>
$(document).ready(function() {
    Liferay.on('getAppDetails',function(event) {
        getAppDetails(event.id);
    });
});
</script>