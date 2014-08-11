<%@ taglib uri="http://java.sun.com/portlet_2_0" prefix="portlet" %>
<portlet:defineObjects />

    <link href="http://code.jquery.com/ui/1.11.0/themes/smoothness/jquery-ui.css" rel="stylesheet">
    <link href="<%=request.getContextPath()%>/html/policies/details/css/policies_details.css" rel="stylesheet" />
       
<div class="portlet_container">
    <div id="details">
        <ul>
            <li><a class="ageneral" href="#general">General</a></li>
            <li><a class="apasscode" href="#passcode">Passcode</a></li>
            <li><a class="awifi" href="#wifi">WiFi</a></li>
            <li><a class="alocation" href="#location">Location</a></li>
            <li><a class="anetwork" href="#network">Network</a></li>
            <li><a class="aapps" href="#apps">Apps</a></li>
            <li><a class="aothers" href="#others">Others</a></li>
            <li class="ui-tab-dialog-close"></li>
        </ul>
        <div>
            <div id="general"></div>
            <div id="passcode"></div>
            <div id="wifi"></div>
            <div id="location"></div>
            <div id="network"></div>
            <div id="apps"></div>
            <div id="others"></div>
        </div>
    </div>
</div>
<script>
    $(document).ready(function() {
        Liferay.on('getPolicyDetails',function(event) {
            getMoreDetails(event.id);
        });  
    });   
</script>