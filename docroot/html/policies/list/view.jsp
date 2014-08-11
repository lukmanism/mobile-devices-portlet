<%@ taglib uri="http://java.sun.com/portlet_2_0" prefix="portlet" %>
<portlet:defineObjects />

<link href="<%=request.getContextPath()%>/html/policies/list/css/policies_list.css" rel="stylesheet" />
<div class="portlet_container">
    <div class="filter">
        <input type="text" id="search" placeholder="Filter" class="input"/>
    </div>
    <div class="compare"></div>
    <div id="list" style="display: none;"></div>
</div>

<script>
    $(document).ready(function() {
        $.ajax({
            url: "http://10.1.66.105/wspolicy/list/all/",
            type: "GET",
            dataType: "json",
            crossDomain: true,
            beforeSend: function(xhr){}
        }).success(function(response) {
            var list = getList(response);
            pushTable(list, listData.list.policy.policy_management);
            Liferay.fire('getPolicyDetails',{
                id: response.data[0]['id']
            });
        });
    });   
</script>