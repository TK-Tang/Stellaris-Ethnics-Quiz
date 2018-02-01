$(document).ready(function(){
    $("a.delete-action").on("click", function(e){
        var id = event.target.id.split("-")[1];
        $.ajax({
            type: "DELETE",
            url: "/EditStellarisSurvey/" + id,
            success: function(res){
                if (res === undefined || res.error !== undefined){
                    hideQuestion(e.target.parentElement.parentElement.parentElement.parentElement);
                    generateNotification("failed", res.error);
                } else {
                    hideQuestion("#question-row-" + res.id);
                    generateNotification("success", "Question deleted from survey successfully");
                }
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
                if (res === undefined || res.error !== undefined ){
                    generateNotification("failed", res.error);
                } else {
                    updateQuestionBlurb("#question-blurb-" + id, res.updatedQuestion.question);
                    generateNotification("success", "Question updated successfully")
                }
            }
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

