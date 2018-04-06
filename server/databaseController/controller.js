//pulls in the entity collection from the mongo db
//an open connection is also imported as a component of the schema
const Entity = require('./../databaseModel/model.js');

const dataController = {
	findAll: (req, res, next) => {
		Entity.find({}, function (err, content) {
			if (err) {
				res.set('Content-Type', 'text/plain');
				res.statusCode(418);
				next();
			} else {
				console.log('all in database', content);
				//sets the response data (content) to the res.locals at databaseFindings
				//next has to be inside of this else in order to allow for the asynch actions
				res.locals.databaseFindings = content;
				next();
			}
		});
	},
	insertOne: (req, res, next) => {
		console.log('req insert body', req.body);
		//best to pull out the aspects of the body that matters and set to new variables.
		let thing1 = req.body.thing1;
		let thing2 = req.body.thing2;
		//pass the object to Collection.create implicitly setting values to the corresponding properties a la ES6
		Entity.create({thing1, thing2}, function (err, content) {
			if (err) {
				console.log('Fucked up in the insert of controller');
			} else {
				res.locals.databaseFindings = content; //this returns the entry that was just logged
				next();
			}
		});
	},
	findOne: (req, res, next) => {
		console.log('findone body', req.body);
		let thing2Value = req.body.thing2;
		//let thing1Value = req.body.thing1;
		//Here we explicitly pass to Collection.findOne an object to be checked against database records
		Entity.findOne({thing2: thing2Value}, function (err, content) {
			if (err) {
				res.set('Content-Type', 'text/plain');
				res.statusCode(418);
				next();
			};
			if (content === null) {
				res.set('Content-Type', 'text/plain');
				res.statusCode = 418;
				next();
			}
			console.log('findOne content', content);
			res.locals.databaseFindings = content;
			next();
		});
	},
	removeOne: (req, res, next) => {
		console.log('req.body in delete one', req.body);
		let thing1Value = req.body.thing1;
		let thing2Value = req.body.thing2;
		//Here we grab both values out of the req.body and pass the explicit object to the Collection.remove
		Entity.remove({thing1: thing1Value, thing2: thing2Value}, function (err, content) {
			if (err) console.log('error in removeOne', err);
			res.statusCode = 200;
			next();
		});
	},
	updateOne: (req, res, next) => {
		console.log('req.body of updateOne', req.body);
		//here I pass req.body.thing1 and thing2 as an object to be found; the next argument is what about the record I want to update
		Entity.findOneAndUpdate({ 'thing1': req.body.thing1, 'thing2': req.body.thing2 }, { $set: { 'thing1': req.body.newValueForThing1 }}, function (err, content) {
			if (err) console.log('error updateOne', err);
			console.log(content);
		});
		next();
	},
}

module.exports = dataController;