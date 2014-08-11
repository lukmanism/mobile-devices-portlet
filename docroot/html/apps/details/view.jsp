<%@ taglib uri="http://java.sun.com/portlet_2_0" prefix="portlet" %>
<portlet:defineObjects />

    <link href="http://code.jquery.com/ui/1.11.0/themes/smoothness/jquery-ui.css" rel="stylesheet">
    <link href="<%=request.getContextPath()%>/html/apps/details/css/apps_details.css" rel="stylesheet" />

    <div class="portlet_container">
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
        getMoreDetails(event.id);
    });
});
</script>