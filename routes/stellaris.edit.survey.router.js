const express = require("express");
const models = require("../models");

const router = express.Router();

router.get("/", (req, res) => {
    models.stellaris_question.getAll().then((returnAllQuestions) => {
        if (returnAllQuestions === null){
            res.render("error_page.ejs", { error: "Could not retrieve survey questions for stellaris ethnics survey."} );
        } else {
            res.render("stellaris_edit_delete_questions.ejs", { questions: returnAllQuestions , surveyInfo: { id: "Editor" }});
        }
    }).catch(e => {
        res.render("error_page.ejs", { error: "An unknown error occured."});
    });
});

router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)){
        res.status(400).send("Input question ID is not a number");
    }

    models.stellaris_question.get(id).then((returnQuestion) => {
        if (returnQuestion === null){
            res.status(200).send({error: "This question could not be found."});
        } else {
            res.status(200).send(returnQuestion);
        }
    }).catch(e => {
        console.log(e);
        res.render("error_page.ejs", { error: "An unknown error occured finding this survey question." });
    })
});

router.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)){
        res.status(400).send("Input question ID is not a number");
    }

    models.stellaris_question.delete(id).then((numberOfRowsDestroyed) => {
        if (numberOfRowsDestroyed === 0){
            res.status(200).send({ error: "This question cannot be deleted because it does not exist."});
        } else {
            res.status(200).send({ message: "Question " + id + " deleted successfully.", id: id });
        }
    }).catch(e => {
        console.log(e);
        res.render("error_page.ejs", { error: "An unknown error occured deleting survey question." });
    });
});

router.post("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)){
        res.status(400).send({ error: "Input id is not a number."})
    }

    models.stellaris_question.update(id, 
                                    req.body.Question, 
                                    req.body.Xenophile, 
                                    req.body.Xenophobe, 
                                    req.body.Egalitarian, 
                                    req.body.Authoritarian,
                                    req.body.Materialist,
                                    req.body.Spiritualist,
                                    req.body.Militarist,
                                    req.body.Pacifist ).then((updatedQuestion) => {
        if (updatedQuestion === undefined){
            res.status(200).send({ error: "This question cannot be updated because it does not exist."})
        } else {
            res.status(200).send({ message: "Question " + id + " updated successfully", updatedQuestion : updatedQuestion });
        }
    }).catch(e => {
        console.log(e);
        res.render("error_page.ejs", { error: "An unknown error occured editing survey question." });
    });
});

module.exports = router;