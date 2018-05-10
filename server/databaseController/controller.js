//pulls in the entity collection from the mongo db
//an open connection is also imported as a component of the schema
const Entity = require('./../databaseModel/model.js');

const dataController = {
	findAll: (req, res, next) => {
		Entity.find({}, function (err, content) {
			if (err) {

			} else {

			}
		});
	},
	insertOne: (req, res, next) => {
		console.log('req insert body', req.body);
		//best to pull out the aspects of the body that matters and set to new variables.

		//pass the object to Collection.create implicitly setting values to the corresponding properties a la ES6
		Entity.create({thing1, thing2}, function (err, content) {
			if (err) {
				console.log(' up in the insert of controller');
			} else {
				res.locals.databaseFindings = content; //this returns the entry that was just logged

			}
		});
	},
	findOne: (req, res, next) => {
		console.log('findone body', req.body);
		let thing2Value = req.body.thing2;
		//let thing1Value = req.body.thing1;
		//Here we explicitly pass to Collection.findOne an object to be checked against database records
		Entity.findOne([], function (err, content) {
			if (err) {
			  SET THE STATUS CODE AND THE HEADER!!

				next();
			};
			if (content === null) {
				res.set('Content-Type', 'text/plain');
				res.statusCode = 418;
				next();
			}
			res.locals.databaseFindings = content;
			next();
		});
	},
	removeOne: (req, res, next) => {
		console.log('req.body in delete one', req.body);

		//Here we grab both values out of the req.body and pass the explicit object to the Collection.remove
		Entity.remove([], function (err, content) {
			if (err) console.log('error in removeOne', err);
			res.statusCode = 200;
		});
	},
	updateOne: (req, res, next) => {
		console.log('req.body of updateOne', req.body);
		//here I pass req.body.thing1 and thing2 as an object to be found; the next argument is what about the record I want to update
		Entity.findOneAndUpdate()
		});
		next();
	},
}

module.exports = dataController;
