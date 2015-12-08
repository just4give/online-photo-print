var mysql = require('mysql');

var pool = mysql.createPool({
  host     : '127.0.0.1',
  user     : 'root',
  password : 'root',
  database : 'maumau',
  connectionLimit: 10
});

exports.getUser = function(id, callback) {
	pool.getConnection(function(err, connection) {
		connection.query("select * from user where id = ?", [id], function(err, rows) {
			if (err) {
				console.log("Database error in getUser: " + err);
				connection.end();
				return;
			}
			
			rows[0].otherLangs = getOtherLangs(rows[0].lang);
			connection.end();
			callback(rows[0]);
			
		});
	});	
};

exports.getProfile = function(id, callback) {
	pool.getConnection(function(err, connection) {
		connection.query("select u.*, t.name as title, t.xpneed as xpneed, t.next from user u join user_titles t on u.title_id = t.id where u.id = ?", [id], function(err, user) {
			if (err || !user[0]) {
				console.log("Database error in getProfile: " + err);
				connection.end();
				return;
			}
			
			var levelProgress = Math.round(user[0].xp * 100 / user[0].xpneed);
			user[0].levelProgress = levelProgress;
			
			connection.query("select * from user_games where user_id = ? order by time desc limit 30", [id], function(err, rows) {
				if (err) {
					console.log("Database error in getProfile2: " + err);
					connection.end();
					return;
				}	
				
//				var gameMap = {};
//				for (var i = 0; i < rows.length; i++) {
//					gameMap[rows[i].gamenr] = rows[i];
//				}		
				
				connection.query("select count(*) as count from user where rating > ?", [user[0].rating], function(err, user_rank) {
					if (err) {
						console.log("Database error in getRating2: " + err);
						connection.end();
						return;
					}
					
				//	console.log(JSON.stringify(user_rank[0]));
					user[0].rank = user_rank[0].count + 1;
										
					connection.end();
					callback(user[0], rows);									
					
				});
				
				
				
			});			
			
		});
	});	
}

exports.getUserByFb = function(facebookId, callback) {
	pool.getConnection(function(err, connection) {
		connection.query("select id, name, country, gold, silver, rating, facebook_id, gender, lang, times_played from user where facebook_id = ?", [facebookId], function(err, rows) {
			if (err) {
				console.log("Database error in getUserByFB: " + err);
				connection.end();
				return;
			}
			
			connection.end();
			callback(rows);
			
		});
	});	
};

