var database = require('../lib/database');

exports.indexPlus = function(req, res){		
	database.globalListAndUser(req.params.id, 50, function(data) {
		res.cookie("lang", data.user.lang);
		req.session.user = data.user;
	//	data.user.firstTime = true;\
		console.log(data.user);
		res.render('index', {user: data.user, rangList: data.rangList, dayList: data.dailyList, notifications: null, gifts: null, startGame: false, games: null });
	});
};

exports.userLogin = function(req, res) {
	if (req.body.username != "" && req.body.email != "") {
		database.checkNameAndPass(req.body, function(data) {
			console.log(data);
			if (data.status == "ok") {
				req.session.user = data.user;
				req.session.user.platform = "web";
				req.session.user.source = "website";
			}
			
			res.send(data.status);
		});
	}
	
}; 

exports.registerUser = function(req, res) {
	req.body.lang = req.cookies.lang;
	console.log(req.body);
	
	if (req.body.username != "" && req.body.email != "") {
		database.checkIfUserRegistered(req, function(data) {
			if (data == true) {
				res.send("exists");
			} else {
				res.send("new");
			}
		});
	}
	
	
}

exports.confirmRegistration = function(req, res) {
	console.log(req.params.hash);
	
	database.verifyRegistration(req.params.hash, function(data) {
		if (data == true) { // uspela registracija
			res.render('activated');
		} else {
			 res.status(403).send('403 Forbidden');
		}
	});
}
