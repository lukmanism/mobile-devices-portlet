<%@ taglib uri="http://java.sun.com/portlet_2_0" prefix="portlet" %>
<portlet:defineObjects />

    <script src="<%=request.getContextPath()%>/html/apps/list/js/jquery.quicksand.js"></script>
    <link href="<%=request.getContextPath()%>/html/apps/list/css/apps_list.css" rel="stylesheet" />

    <div class="portlet_container">
        <div id="filter">
            <span>Filter by platform:</span>
            <a href="#Android" class="type">Android</a>
            <a href="#iOS" class="type">iOS</a>
            <a href="#all" class="active type">All</a>
        </div>
        <div class="clear"></div>
        <ul id="applications" class="image-grid"></ul>
    </div>

<script>
$(document).ready(function() {
    $.ajax({
        url: "http://10.1.66.105/wsapp/list/all/",
        type: "GET",
        dataType: "json",
        crossDomain: true,
        beforeSend: function(xhr){}
    }).success(function(response) {
        var list = getList(response);
        $('#applications').html(pushList(list));

        var $filterType   = $('#filter .type');
        var $applications = $('#applications');
        var $data         = $applications.clone();

        $filterType.click(function(){
            var selected = $(this).attr('href').replace('#', '');
            $filterType.attr('class', '');
            $(this).attr('class', 'active');
            if(selected == 'all'){
                var $filteredData = $data.find('li');
            } else {
                var $filteredData = $data.find('li[data-type=' + selected + ']');           
            }
            $applications.quicksand($filteredData, {
                duration: 800,
            }, function(){
                pushMoreDetails();
            });
            return false;
        });
        pushMoreDetails();
        if(typeof response.data[0] == 'undefined'){
            Liferay.fire('getAppDetails');
        } else {           
            Liferay.fire('getAppDetails',{
                id: response.data[0]['id']
            });
        }
    });
    $('.portlet_hidden').hide();
});
</script>