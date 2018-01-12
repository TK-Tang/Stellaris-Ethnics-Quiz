module.exports = function(sequelize, Sequelize) {
    const stellarisQuestion = sequelize.define('stellarisQuestions', {
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
        xenophobia: Sequelize.INTEGER,
        materialist: Sequelize.INTEGER,
        spiritualist: Sequelize.INTEGER,
        militarist: Sequelize.INTEGER,
        pacifist: Sequelize.INTEGER,
        lastModified: Sequelize.STRING
    });

    stellarisQuestion.insert = function(question, 
                            xenophobia, 
                            xenophilia, 
                            egalitarian, 
                            authoritarian, 
                            materialist, 
                            spiritualist, 
                            militarist, 
                            pacifist, 
                            lastModified){
        const stellarisQuestion = {
            question: question,
            xenophobia: xenophobia,
            xenophilia: xenophilia,
            egalitarian: egalitarian,
            authoritarian: authoritarian,
            materialist: materialist,
            spiritualist: spiritualist,
            militarist: militarist,
            pacifist: pacifist,
            lastModified: lastModified,
        }

        return this.create()
    };

    stellarisQuestion.get = async function(id){
        // const result = this.findById(id);
        // return result;

        return await this.findById(id);
    }

    return stellarisQuestion;
}