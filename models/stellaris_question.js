module.exports = function(sequelize, Sequelize) {
    const stellarisQuestion = sequelize.define('stellaris_question', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'stellarisQuestions_id'
        },
        question: Sequelize.STRING,
        egalitarian: Sequelize.INTEGER,
        authoritarian: Sequelize.INTEGER,
        xenophile: Sequelize.INTEGER,
        xenophobe: Sequelize.INTEGER,
        materialist: Sequelize.INTEGER,
        spiritualist: Sequelize.INTEGER,
        militarist: Sequelize.INTEGER,
        pacifist: Sequelize.INTEGER,
    });

    stellarisQuestion.insert = async function(question, 
                            xenophobe, 
                            xenophile, 
                            egalitarian, 
                            authoritarian, 
                            materialist, 
                            spiritualist, 
                            militarist, 
                            pacifist){
        const surveyQuestion = {
            question: question,
            xenophobe: xenophobe,
            xenophile: xenophile,
            egalitarian: egalitarian,
            authoritarian: authoritarian,
            materialist: materialist,
            spiritualist: spiritualist,
            militarist: militarist,
            pacifist: pacifist
        };

        return await this.create(surveyQuestion);
    };

    stellarisQuestion.get = async function(id){
        return await this.findById(id);
    };

    stellarisQuestion.update = async function(id, question, xenophile, xenophobe, egalitarian, authoritarian, materialist, spiritualist, militarist, pacifist){
        
        var updateValues = {
            question: question,
            xenophile: xenophile,
            xenophobe: xenophobe,
            egalitarian: egalitarian,
            authoritarian: authoritarian,
            materialist: materialist,
            spiritualist: spiritualist,
            militarist: militarist,
            pacifist: pacifist
        }
        
        const t = await sequelize.transaction();
        const q = await stellarisQuestion.findById(id, { transaction: t });
        updateValues.question = updateValues.question === "" ? q.question : updateValues.question;

        const updatedQuestion = await q.updateAttributes(
            updateValues
        ,{
            transaction: t
        });
        t.commit();
        return updatedQuestion;
    };

    stellarisQuestion.delete = async function (id){
        return await stellarisQuestion.destroy({
            where: {
                id: id
            }
        })
    }

    stellarisQuestion.getAll = async function(){
        return await stellarisQuestion.findAll({
            order: [ 
                ['stellarisQuestions_id', 'ASC'],
            ],
        });
    }

    stellarisQuestion.countRows = async function(){
        return await stellarisQuestion.count();
    }

    stellarisQuestion.listIds = async function(){
        return await stellarisQuestion.findAll({attributes: ['stellarisQuestions_id']})
    }

    return stellarisQuestion;
}