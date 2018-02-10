module.exports = function(sequelize, Sequelize) {
    const stellarisAnswer = sequelize.define('stellaris_answer', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'stellarisAnswer_id'
        },
        question_id: Sequelize.INTEGER,
        answer: Sequelize.INTEGER
    });

    // CREATE METHODS
    stellarisAnswer.insert = async function(question_id, answer){
        const surveyAnswer = {
            question_id: question_id,
            answer: answer
        }

        return await this.create(surveyAnswer);
    }

    // GET METHODS
    stellarisAnswer.get = async function(id){
        return await this.findById(id);
    }

    stellarisAnswer.getAll = async function(){
        return await stellarisAnswer.findAll({
            order: [
                ['stellarisAnswer_id', 'ASC'],
            ],
        });
    }

    // UPDATE METHODS
    stellarisAnswer.update = async function(id, answer) {

        var updateValues = {
            question_id: id,
            answer: answer
        }

        const t = await sequelize.transaction();
        const q = await stellarisAnswer.findById(id, {transaction: t});
        const updatedAnswer = await q.updateAttributes(updateValues, { transaction: t });

        t.commit();

        return updatedAnswer;
    }

    // DELETE METHODS
    stellarisAnswer.delete = function (id){
        return stellarisAnswer.destroy({
            where: {
                question_id: id
            }
        });
    }

    // UTILLITY METHODS
    stellarisAnswer.countRows = async function(){
        return await stellarisAnswer.count();
    }

    return stellarisAnswer;
}