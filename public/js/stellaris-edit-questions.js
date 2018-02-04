$(document).ready(function(){
    $("a.delete-action").on("click", function(e){
        var id = event.target.id.split("-")[1];
        $.ajax({
            type: "DELETE",
            url: "/EditStellarisSurvey/" + id,
            success: function(res){
                hideQuestion("#question-row-" + res.id);
                generateNotification("success", res.message);
            },
            error: function(res){
                hideQuestion(e.target.parentElement.parentElement.parentElement.parentElement);
                generateNotification("failed", res.responseJSON.error);
            }
        });
        e.preventDefault();
    });

    $("button.edit-question-btn").on("click", function(e){
        var id = event.target.id.split("-")[2];

        $.ajax({
            type: "POST",
            url: "/EditStellarisSurvey/" + id,
            data: $("#question-form-" + id).serialize(),
            success: function(res){
                updateQuestionBlurb("#question-blurb-" + id, res.updatedQuestion.question);
                generateNotification("success", res.message);
            },
            error: function(res){ generateNotification("failed", res.responseJSON.error); }
        })
       e.preventDefault();
    });

    $("#add-question-btn").on("click", function(e){
        $.ajax({
            type: "PUT",
            url: "/EditStellarisSurvey/",
            data: $("#add-question-form").serialize(),
            success: function(res){ generateNotification("success", res.message ); },
            error: function(res){ generateNotification("failed", res.responseJSON.error); }
        })
       e.preventDefault();
    });
});

function hideQuestion(element){
    $(element) === undefined ? "" : $(element).animate({"height": "-=70px"}, 500,"linear", function(){ $(element).remove(); });
}

function updateQuestionBlurb(element, blurb){
    var x = $(element);
    $(element)[0].innerText = blurb;
}

