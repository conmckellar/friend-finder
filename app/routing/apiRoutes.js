var path = require('path');

//put friend list into variable
var friends = require('../data/friends.js');

// API route
module.exports = function(app) {

	// Total list of friend entries
	app.get('/api/friends', function(req, res) {
		res.json(friends);
	});

	// Add new friend
	app.post('/api/friends', function(req, res) {
		// put user input into variable
		var userInput = req.body;
		//then put that variable's scores into another variable
		var userResponses = userInput.scores;

		var matchName = '';
		var matchImage = '';
		var totalDifference = 10000; // Make the initial value big for comparison

		// loop through everything in friendsArray
		for (var i = 0; i < friends.length; i++) {
			//difference
			var diff = 0;
			//loop through each response
			for (var j = 0; j < userResponses.length; j++) {
				diff += Math.abs(friends[i].scores[j] - userResponses[j]);
			}

			// whichever has the lowest difference between choices is the best match
			if (diff < totalDifference) {

				totalDifference = diff;
				matchName = friends[i].name;
				matchImage = friends[i].photo;
			}
		}

		// Add new user
		friends.push(userInput);

		res.json({status: 'true', matchName: matchName, matchImage: matchImage});
	});
};