const express = require("express");
const controller = require("../controllers/stellaris.quiz.controller");

const router = express.Router();

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    models.stellarisQuestion.get(id).then((result) => {
        if (result === null){
            res.render("error_page.ejs", "Quiz question not found for Stellaris ethnics quiz.");
        } else {
            res.render("stellaris_question.ejs", result);
        }
    }).catch(e => {
        res.render("error_500.ejs");
    })
});

module.exports = router;