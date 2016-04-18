
exports.show = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) return next(err);
		connection.query('SELECT * from purchases', function(err, results) {
        	if (err) return next(err);
    		res.render( 'purchases', {
					purchases : results
    		});
      	});
	});
};
