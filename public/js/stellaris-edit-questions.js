$(document).ready(function(){
    $("a.delete-action").on("click", function(e){
        var id = event.target.id.split("-")[1];
        $.ajax({
            type: "DELETE",
            url: "/EditStellarisSurvey/" + id,
            success: function(res){
                if (res === null || res === 0){
                    alert("Error with deleting message.");
                    location.reload();
                } else {
                    $("#question-row-" + res.id).animate({"height": "-=70px"})
                    generateSuccessNotification(res.id);
                    

                }
            }
        })
        e.preventDefault(); 
    });
});

function generateSuccessNotification(id){
    var topOffset = 110;
    var notificationColumn = $("#notifications-column")[0];

    for (var i = 0 ; i < sumNotifications(); i++){
        topOffset = topOffset + 45;
    }

    var notificationRemoveIcon = document.createElement("span")
    notificationRemoveIcon.classList.add("glyphicon");
    notificationRemoveIcon.classList.add("glyphicon-remove");
    notificationRemoveIcon.classList.add("foreground");

    var notificationRemoveLink = document.createElement("a");
    notificationRemoveLink.classList.add("pull-right");
    notificationRemoveLink.classList.add("remove-notification-icon");
    notificationRemoveLink.classList.add("foreground");
    notificationRemoveLink.appendChild(notificationRemoveIcon);

    var notificationText = document.createElement("p");
    notificationText.classList.add("notification-text");
    notificationText.classList.add("foreground");
    notificationText.appendChild(document.createTextNode("Question deleted from survey successfully"));
    notificationText.appendChild(notificationRemoveLink);

    var notificationCard = document.createElement("div");
    notificationCard.classList.add("notification-card");
    notificationCard.classList.add("notification-info");
    notificationCard.classList.add("foreground");
    notificationCard.classList.add("delete-success");
    notificationCard.id = "delete-successful-" + id;
    notificationCard.appendChild(notificationText);

    notificationColumn.appendChild(notificationCard);

    notificationCard.style.top = topOffset + "px";
  
    showSuccessNotification(notificationCard.id);


    $("a.remove-notification-icon").on("click", function(e){
        hideSuccessNotification(e.target.parentElement.parentElement.parentElement.id);
    });  
    // <div class="notification-card notification-info delete-success">
    //     <p class="notification-text">    
    //         Question deleted from survey successfully. 
    //         <a class="pull-right remove-notification-icon">
    //             <span class="glyphicon glyphicon-remove"></span>
    //         </a>
    //     </p>
    // </div>

}

function showSuccessNotification(element){
    $("#" + element).animate({ "right": "+=360px"});
}

function hideSuccessNotification(element){
    $("#" + element).animate({ "right": "-=360px"});
}

function sumNotifications(){
    return ($("div.notification-card").length);
}

