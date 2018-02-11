const express = require("express");
const models = require("../models");

const router = express.Router();

router.get('/results-data', (req, res) => {

    var dataPayload = {
        Egalitarian : 0,
        Authoritarian : 0,
        Materialist : 0,
        Spiritualist : 0,
        Xenophobe : 0,
        Xenophile : 0,
        Militarist : 0,
        Pacifist : 0
    }
    
    Promise.all([ models.stellaris_question.getAll(), models.stellaris_answer.getAll() ])
        .then(([stellarisQuestion, stellarisAnswer]) => {
            for (var i = 0; i < stellarisQuestion.length; i++ ) {

                if( !(stellarisAnswer[i] === null || stellarisAnswer[i] === undefined) ) {
                    dataPayload.Egalitarian += stellarisQuestion[i].egalitarian * stellarisAnswer[i].answer;
                    dataPayload.Authoritarian += stellarisQuestion[i].authoritarian * stellarisAnswer[i].answer;
                    dataPayload.Materialist += stellarisQuestion[i].materialist * stellarisAnswer[i].answer;
                    dataPayload.Spiritualist += stellarisQuestion[i].spiritualist * stellarisAnswer[i].answer;
                    dataPayload.Xenophobe += stellarisQuestion[i].xenophobe * stellarisAnswer[i].answer;
                    dataPayload.Xenophile += stellarisQuestion[i].xenophile * stellarisAnswer[i].answer;
                    dataPayload.Militarist += stellarisQuestion[i].militarist * stellarisAnswer[i].answer;
                    dataPayload.Pacifist += stellarisQuestion[i].pacifist * stellarisAnswer[i].answer;
                }
            }

            res.status(200).send({ result: dataPayload });
        }).catch(e => {
            console.log(e);
            res.render("error_page.ejs", {message: "An unknown error occured calculating results."});
        });
});

router.get('/results', (req, res) => {

    var dataPayload = {
        Egalitarian : 0,
        Authoritarian : 0,
        Materialist : 0,
        Spiritualist : 0,
        Xenophobe : 0,
        Xenophile : 0,
        Militarist : 0,
        Pacifist : 0
    }

    var result = {
        PercentileEgalitarian : 0,
        PercentileAuthoritarian : 0,
        PercentileMaterialist : 0,
        PercentileSpiritualist : 0,
        PercentileXenophobe : 0,
        PercentileXenophile : 0,
        PercentileMilitarist : 0,
        PercentilePacifist : 0
    }
    
    Promise.all([ models.stellaris_question.getAll(), models.stellaris_answer.getAll() ])
        .then(([stellarisQuestion, stellarisAnswer]) => {
            for (var i = 0; i < stellarisQuestion.length; i++ ) {
                if( !(stellarisAnswer[i] === null || stellarisAnswer[i] === undefined) ) {
                    dataPayload.Egalitarian += stellarisQuestion[i].egalitarian * stellarisAnswer[i].answer;
                    dataPayload.Authoritarian += stellarisQuestion[i].authoritarian * stellarisAnswer[i].answer;
                    dataPayload.Materialist += stellarisQuestion[i].materialist * stellarisAnswer[i].answer;
                    dataPayload.Spiritualist += stellarisQuestion[i].spiritualist * stellarisAnswer[i].answer;
                    dataPayload.Xenophobe += stellarisQuestion[i].xenophobe * stellarisAnswer[i].answer;
                    dataPayload.Xenophile += stellarisQuestion[i].xenophile * stellarisAnswer[i].answer;
                    dataPayload.Militarist += stellarisQuestion[i].militarist * stellarisAnswer[i].answer;
                    dataPayload.Pacifist += stellarisQuestion[i].pacifist * stellarisAnswer[i].answer;
                }
                result.PercentileEgalitarian += stellarisQuestion[i].egalitarian * 2;
                result.PercentileAuthoritarian += stellarisQuestion[i].authoritarian * 2;
                result.PercentileMaterialist += stellarisQuestion[i].materialist * 2;
                result.PercentileSpiritualist += stellarisQuestion[i].spiritualist * 2;
                result.PercentileXenophobe += stellarisQuestion[i].xenophobe * 2;
                result.PercentileXenophile += stellarisQuestion[i].xenophile * 2;
                result.PercentileMilitarist += stellarisQuestion[i].militarist * 2;
                result.PercentilePacifist += stellarisQuestion[i].pacifist * 2;
            }
            result.PercentileEgalitarian = Math.round( dataPayload.Egalitarian / result.PercentileEgalitarian * 100);
            result.PercentileAuthoritarian = Math.round( dataPayload.Authoritarian / result.PercentileAuthoritarian * 100);
            result.PercentileMaterialist = Math.round( dataPayload.Materialist / result.PercentileMaterialist * 100);
            result.PercentileSpiritualist = Math.round( dataPayload.Spiritualist / result.PercentileSpiritualist * 100);
            result.PercentileXenophobe = Math.round( dataPayload.Xenophobe / result.PercentileXenophobe * 100);
            result.PercentileXenophile = Math.round( dataPayload.Xenophile / result.PercentileXenophile * 100);
            result.PercentileMilitarist = Math.round( dataPayload.Militarist / result.PercentileMilitarist * 100);
            result.PercentilePacifist = Math.round( dataPayload.Pacifist / result.PercentilePacifist * 100);

            res.render("stellaris_results.ejs", { result: result});
        }).catch(e => {
            console.log(e);
            res.render("error_page.ejs", {message: "An unknown error occured calculating results."});
        });
});

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)){
        res.status(400).send({ message:"Input ID is not a number" });
        return;
    }

    models.stellaris_question.get(id).then((returnQuestion) => {
        if (returnQuestion === null || returnQuestion === undefined){
            res.render("error_page.ejs", { error: "Survey question not found for Stellaris ethnics survey."} );
        } else {
            models.stellaris_question.countRows().then((returnRowCount) => {
                rowCount = returnRowCount;                           
                res.render("stellaris_question.ejs", { result: returnQuestion, id: id, rowCount: returnRowCount, breadcrumb: id });
            });
        }
    }).catch(e => {
        res.render("error_page.ejs", { error: "An unknown error occured." });
    });
});

router.post('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    var message;

    if (isNaN(id)){
        res.status(400).send({ message:"Input ID is not a number" });
    }

    models.stellaris_answer.get(id).then((returnAnswer) => {
        if (returnAnswer === null || returnAnswer === undefined){
            models.stellaris_answer.insert(req.body.question_id, req.body.answer).catch( e => {
                console.log(e);
                res.render("error_page.ejs", { error: "An unknown error occured inserting survey answer." });
            });
        } else {
            models.stellaris_answer.update(req.body.question_id, req.body.answer).catch( e => {
                console.log(e); 
                res.render("error_page.ejs", { error: "An unknown error occured with updating survey answer." });
            });
        }

        models.stellaris_question.listIds().then((idList) => {
            res.status(200).send({ id: id, message: message, idList: idList });
        });  
    }).catch( e => {
        console.log(e);
        res.render("error_page.ejs", {error: "An unknown error occured in answer survey question." });
    });
});

module.exports = router;