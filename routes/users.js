var express = require('express');
var router = express.Router();

router.get('/login', function(req, res, next) {
	let div_class = '';

	/**
	 * Check if the div should have a specific css class
	 */
	if(req.query.error_class){
		div_class = req.query.error_class;
	}

  res.render('login', {message: req.query.message, div_class });
});

router.post('/login', function(req, res, next) {
	if(req.body.user === 'admin' && req.body.password === 'password') {
		res.send('Login success');
		return;
	}
	res.redirect(`/users/login?` + 
		`message=user+${req.body.user}+login+failed` + 
		`&error_class=error`
	);
	return;
});


module.exports = router;
