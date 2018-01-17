module.exports = function(sequelize, Sequelize) {
    const stellarisQuestion = sequelize.define('stellarisQuestion', {
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

    stellarisQuestion.insert = function(question, 
                            xenophobe, 
                            xenophile, 
                            egalitarian, 
                            authoritarian, 
                            materialist, 
                            spiritualist, 
                            militarist, 
                            pacifist){
        const stellarisQuestion = {
            question: question,
            xenophobe: xenophobe,
            xenophile: xenophile,
            egalitarian: egalitarian,
            authoritarian: authoritarian,
            materialist: materialist,
            spiritualist: spiritualist,
            militarist: militarist,
            pacifist: pacifist
        }

        return this.create()
    };

    stellarisQuestion.get = async function(id){
        return await this.findById(id);
    };

    return stellarisQuestion;
}