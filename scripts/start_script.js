const models = require("../models");

module.exports.startScript = function() {

    var questionList = { };


    // The values of each ethnic here is assuming the user answers "STRONGLY AGREE" - multiplied * -1 for strongly disagree
    questionList.question001 = {
        question: "Granting full citizenship to any sapient alien, regardless of their biology and culture is beneficial for human civilization.",
        xenophobe: 0,
        xenophile: 60,
        egalitarian: 40,
        authoritarian: 0,
        materialist: 0,
        spiritualist: 0,
        militarist: 0,
        pacifist: 0,
    }

    questionList.question002 = {
        question: "A superior military fleet ensures the success of humanity's survival amongst the stars.",
        xenophobe: 0,
        xenophile: 0,
        egalitarian: 0,
        authoritarian: 0,
        materialist: 0,
        spiritualist: 0,
        militarist: 20,
        pacifist: 0,
    }

    questionList.question003 = {
        question: "Democratic leadership is inferior than that of autocracy.",
        xenophobe: 0,
        xenophile: 0,
        egalitarian: 0,
        authoritarian: 80,
        materialist: 0,
        spiritualist: 0,
        militarist: 0,
        pacifist: 0,
    }

    questionList.question004 = {
        question: "The sovereign superiority of the state supercedes the happiness of its citizens.",
        xenophobe: 0,
        xenophile: 0,
        egalitarian: 0,
        authoritarian: 20,
        materialist: 0,
        spiritualist: 0,
        militarist: 20,
        pacifist: 0,
    }

    questionList.question005 = {
        question: "Hostile alien species best serve humanity through slavery.",
        xenophobe: 30,
        xenophile: 0,
        egalitarian: 0,
        authoritarian: 30,
        materialist: 0,
        spiritualist: 0,
        militarist: 5,
        pacifist: 0,
    }

    questionList.question006 = {
        question: "It is the responsibility of my mankind's military to wage war and defeat conquering and enslaving empires in order to protect weaker civilizations.",
        xenophobe: 0,
        xenophile: 25,
        egalitarian: 0,
        authoritarian: 0,
        materialist: 0,
        spiritualist: 0,
        militarist: 25,
        pacifist: 0,
    }

    questionList.question007 = {
        question: "Humanity must achieve peace through order, dominance and the sacrifice of its own citizen's freedom.",
        xenophobe: 0,
        xenophile: 0,
        egalitarian: 0,
        authoritarian: 40,
        materialist: 0,
        spiritualist: 0,
        militarist: 0,
        pacifist: 20,
    }

    questionList.question008 = {
        question: "War must be brought to end through least amount of bloodshed as possible.",
        xenophobe: 0,
        xenophile: 0,
        egalitarian: 0,
        authoritarian: 0,
        materialist: 0,
        spiritualist: 0,
        militarist: 0,
        pacifist: 20,
    }

    questionList.question009 = {
        question: "There exists in all races intangible and beautiful elements of life, the sentimental intuition, the moral conscious, the spiritual soul.",
        xenophobe: 0,
        xenophile: 0,
        egalitarian: 0,
        authoritarian: 0,
        materialist: 0,
        spiritualist: 20,
        militarist: 0,
        pacifist: 0,
    }

    questionList.question010 = {
        question: "The universe is vast and beautiful, surely there is some form of divine higher being who crafted and molded the grace of the cosmos.",
        xenophobe: 0,
        xenophile: 0,
        egalitarian: 0,
        authoritarian: 0,
        materialist: 0,
        spiritualist: 20,
        militarist: 0,
        pacifist: 0,
    }
    
    questionList.question011 = {
        question: "Diplomacy and cooperation is the most ideal way to building a bright future for all civilizations.",
        xenophobe: 0,
        xenophile: 60,
        egalitarian: 30,
        authoritarian: 0,
        materialist: 0,
        spiritualist: 0,
        militarist: 0,
        pacifist: 5,
    }

    questionList.question012 = {
        question: "Humanity must avoid contact with unknown alien civilizations or we risk endangering humanity's safety, freedom and survival.",
        xenophobe: 25,
        xenophile: 0,
        egalitarian: 0,
        authoritarian: 0,
        materialist: 0,
        spiritualist: 0,
        militarist: 0,
        pacifist: 0,
    }

    questionList.question013 = {
        question: "Worlds with ruined civilization should not be disturbed and allowed to rest in peace.",
        xenophobe: 0,
        xenophile: 0,
        egalitarian: 0,
        authoritarian: 0,
        materialist: 0,
        spiritualist: 30,
        militarist: 0,
        pacifist: 0,
    }

    questionList.question014 = {
        question: "Mass replacing individuals with robotics with superior performance in fields of industry, military and research - is beneficial and efficient for an advanced society.",
        xenophobe: 0,
        xenophile: 0,
        egalitarian: 0,
        authoritarian: 0,
        materialist: 50,
        spiritualist: 0,
        militarist: 0,
        pacifist: 0,
    }

    questionList.question015 = {
        question: "The surest way to destroy your enemies, is to befriend them.",
        xenophobe: 0,
        xenophile: 80,
        egalitarian: 0,
        authoritarian: 0,
        materialist: 0,
        spiritualist: 0,
        militarist: 0,
        pacifist: 30,
    }

    questionList.question016 = {
        question: "For the sake of security, health or racial purity, we must not permit entry biologically different aliens onto Earth. ",
        xenophobe: 0,
        xenophile: 80,
        egalitarian: 0,
        authoritarian: 0,
        materialist: 0,
        spiritualist: 0,
        militarist: 0,
        pacifist: 30,
    }

    questionList.question017 = {
        question: "Advancing universal rights for all sentient species even through force or against another state's will, is a mandatory part of humanity's philosophy when diplomatically engaging with other civilizations.",
        xenophobe: 0,
        xenophile: 80,
        egalitarian: 40,
        authoritarian: 0,
        materialist: 0,
        spiritualist: 0,
        militarist: 30,
        pacifist: 0,
    }

    questionList.question018 = {
        question: "The genetics of proven, excellent leaders such as cunning admirals, charming governors and genius intellects must be preserved and used for breeding a new generation of superior leaders for humanity's cause.",
        xenophobe: 0,
        xenophile: 0,
        egalitarian: 0,
        authoritarian: 10,
        materialist: 15,
        spiritualist: 0,
        militarist: 30,
        pacifist: 0,
    }

    questionList.question019 = {
        question: "Native, sapient species of a planet, should have their societal development guided by humanity.",
        xenophobe: 0,
        xenophile: 15,
        egalitarian: 0,
        authoritarian: 0,
        materialist: 0,
        spiritualist: 0,
        militarist: 0,
        pacifist: 0,
    }

    questionList.question020 = {
        question: "Should the populace of humanity's civilization permit citizenship for alien races, humanity should be the most prevalent in number and dominant with leading positions within society.",
        xenophobe: 0,
        xenophile: 15,
        egalitarian: 0,
        authoritarian: 0,
        materialist: 0,
        spiritualist: 0,
        militarist: 0,
        pacifist: 0,
    }

    questionList.question021 = {
        question: "Diplomacy is futile with barbaric war mongering civilizations or states who are domineering and resentful of us.",
        xenophobe: 10,
        xenophile: 0,
        egalitarian: 0,
        authoritarian: 0,
        materialist: 0,
        spiritualist: 0,
        militarist: 25,
        pacifist: 0,
    }

    questionList.question022 = {
        question: "Only by guidance of the most determined, and tenacious leaders, only through unquestioning obedience of its populace, can humanity's civilization stand strong and pursue its goals for its individuals cannot make the most ideal decisions for themselves or the state.",
        xenophobe: 0,
        xenophile: 0,
        egalitarian: 0,
        authoritarian: 80,
        materialist: 0,
        spiritualist: 0,
        militarist: 0,
        pacifist: 0,
    }

    questionList.question023 = {
        question: "Xenophilia is foolish - as it exposes humanity to diplomatic and economical exploitation particularly regarding territorial borders and our society has nothing to gain through such ideals.",
        xenophobe: 40,
        xenophile: 0,
        egalitarian: 0,
        authoritarian: 0,
        materialist: 0,
        spiritualist: 0,
        militarist: 0,
        pacifist: 0,
    }

    questionList.question024 = {
        question: "Individuals will not tolerate their freedoms deprived through authoritarian regimes. Individual rights and freedom is the only way to a harmonious and functional state.",
        xenophobe: 0,
        xenophile: 0,
        egalitarian: 80,
        authoritarian: 0,
        materialist: 0,
        spiritualist: 0,
        militarist: 0,
        pacifist: 0,
    }
    
    questionList.question025 = {
        question: "Modification to the human gene pool that changes and improves our biology, intellect and aptitude is perfectly acceptable.",
        xenophobe: 0,
        xenophile: 0,
        egalitarian: 0,
        authoritarian: 0,
        materialist: 30,
        spiritualist: 0,
        militarist: 0,
        pacifist: 0,
    }

    questionList.question026 = {
        question: "The gradual replacement of our biological bodies with cybernetics that improves our durability, intellect and aptitude is perfectly acceptable.",
        xenophobe: 0,
        xenophile: 0,
        egalitarian: 0,
        authoritarian: 0,
        materialist: 60,
        spiritualist: 0,
        militarist: 0,
        pacifist: 0,
    }

    questionList.question027 = {
        question: "Wars waged by other states or empires should not be intervened by humanity regardless of the motivations, goals and consequences of the war so long as our people are unharmed.",
        xenophobe: 10,
        xenophile: 0,
        egalitarian: 0,
        authoritarian: 0,
        materialist: 0,
        spiritualist: 0,
        militarist: 0,
        pacifist: 10,
    }

    questionList.question028 = {
        question: "There is nothing for humanity to gain by protecting younger and weak civilization, therefore are not worth risking the lives and the state to ensure their freedom and independence.",
        xenophobe: 20,
        xenophile: 0,
        egalitarian: 0,
        authoritarian: 0,
        materialist: 20,
        spiritualist: 0,
        militarist: 0,
        pacifist: 0,
    }

    questionList.question029 = {
        question: "Humanity should ally themselves with strong, warring and aggressive empires. By allying and annexing weaker states, can humanity truly gain from other civilizations as well as avoid conflict with potential rivals.",
        xenophobe: 10,
        xenophile: 0,
        egalitarian: 0,
        authoritarian: 10,
        materialist: 10,
        spiritualist: 0,
        militarist: 80,
        pacifist: 0,
    }

    questionList.question030 = {
        question: "God watches over all of humanity. We must solemnly remain faithful and respectful of the divine teachings.",
        xenophobe: 10,
        xenophile: 0,
        egalitarian: 0,
        authoritarian: 10,
        materialist: 10,
        spiritualist: 0,
        militarist: 80,
        pacifist: 0,
    }

    for (var key in questionList){
        var question = questionList[key]
        models.stellaris_question.create(question);
    }
}