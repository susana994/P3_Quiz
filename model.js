const Sequelize = require('sequelize');
const sequelize = new Sequelize("sqlite:quizzes.sqlite", {logging: false});

sequelize.define('quiz', {

	question: {

		type: Sequelize.STRING,
		unique: {msg: "Ya existe esta pregunta"},
		validate: {notEmpty: {msg: "La pregunta no puede estar vacía"}}


	},

	answer: {

		type: Sequelize.STRING,
		validate: {notEmpty: {msg: "La pregunta no puede estar vacía"}}
		

	}

});

sequelize.sync()
.then(() => sequelize.models.quiz.count())
.then(count => {

	if (!count) {
		return sequelize.models.quiz.bulkCreate([
			{ question:"capital de italia", answer:"roma"},
			 {
    

			question:"capital de francia", answer:"paris"
  },
  {
    question:"capital de españa", answer:"madrid"
  },
  {
    question:"capital de portugal", answer:"lisboa"
  }




]);




}






})

.catch(error => {

	console.log(error);

});

module.exports = sequelize;

