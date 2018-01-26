var notificationId = 0;

$(document).ready(function(){
    $("a.delete-action").on("click", function(e){
        var id = event.target.id.split("-")[1];
        $.ajax({
            type: "DELETE",
            url: "/EditStellarisSurvey/" + id,
            success: function(res){
                if (res === undefined || res.error !== undefined){
                    hideQuestion(e.target.parentElement.parentElement.parentElement.parentElement);
                    generateNotification("failed", "Question does not exist in database");
                } else {
                    hideQuestion("#question-row-" + res.id);
                    generateNotification("success", "Question deleted from survey successfully");
                }
            }
        })
        e.preventDefault(); 
    });
});

function generateNotification(status, message){
    notificationId = notificationId + 1;
    var topOffset = 80 + (45 * sumNotifications());

    var notificationColumn = $("#notifications-column")[0];

    var notificationRemoveIcon = document.createElement("span")
    notificationRemoveIcon.classList.add("glyphicon");
    notificationRemoveIcon.classList.add("glyphicon-remove");
    notificationRemoveIcon.classList.add("foreground");

    var notificationRemoveLink = document.createElement("a");
    notificationRemoveLink.classList.add("pull-right");
    notificationRemoveLink.id = "remove-notification-icon" + notificationId;
    notificationRemoveLink.classList.add("foreground");
    notificationRemoveLink.appendChild(notificationRemoveIcon);

    var notificationText = document.createElement("p");
    notificationText.classList.add("notification-text");
    notificationText.classList.add("foreground");
    notificationText.appendChild(document.createTextNode(message));
    notificationText.appendChild(notificationRemoveLink);

    var notificationCard = document.createElement("div");
    notificationCard.classList.add("notification-card");
    notificationCard.classList.add("foreground");
    status === "success" ? notificationCard.classList.add("notification-info") : notificationCard.classList.add("notification-error");
    notificationCard.id = "delete-notification-" + notificationId;
    notificationCard.appendChild(notificationText);
    notificationCard.style.top = topOffset + "px";

    notificationColumn.appendChild(notificationCard);
  
    showNotification(notificationCard.id);

    $("#remove-notification-icon" + notificationId).on("click", function(e){
        hideNotification(e.target.parentElement.parentElement.parentElement.id);
        e.preventDefault(); 
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

function showNotification(element){
    $("#" + element).animate({ "right": "+=360px"});
}

function hideNotification(element){
    $("#" + element).animate({ "right": "-=360px"}, 500, "linear", function(){ $("#" + element).remove(); });

    var elementId = parseInt(element.split("-")[2]);
    for (var i = 1 ; i <= sumNotifications(); i++){
        tuckNotification("delete-notification-" + (elementId + i));
    }
}

function tuckNotification(element){
    $("#" + element).animate({ "top": "-=45px"}, 300, "linear");
}

function sumNotifications(){
    var x = $("div.notification-card").length
    return x;
}

function hideQuestion(element){
    $(element) === undefined ? "" : $(element).animate({"height": "-=70px"}, 200,"linear", function(){ $(element).remove(); });
}

