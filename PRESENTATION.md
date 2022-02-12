# Definition of XSS
- TODO

- Issues:
	- Message is completely controlled by GET parameter
		- Technical issues:
			- Arbitrary script execution is possible
			- Local storage, cookies, and *anything* else that can be accessed from native javascript running on the page is prone to exfiltration.
			- IP Address 
			- User Agent
			- UDP hole punching with things like STUN
	- Even from a non-technical point of view, this is dangerous because:
		- There are many Social engineering tricks that can be used here
			- Content can be crafted to entice/misdirect user
		- Simply embedding an image that points to an attacker-controlled server can leak information including IP Address and User Agent information.
	
# Dealing with XSS starts with a change in mindset
	- Learn defensive coding practices
		- Functions: 
			- Never trust the input
			- Make sanitization easy:
				- Gather all sanitization functions into a globally available utility library
					```js
						const Sanitize = require('$/src/util/sanitize.js');
						app.post('/users/login', function (req, res, next) {
							const username = Sanitize.username(req.body.username);
						});
					```
				- Make your sanitization functions easy to use
				- Make your sanitization functions self-documenting:
					- cleanInput(req.body.username);	// Not very descriptive
					- sanitizeUsername(req.body.username); // Nice
	- If you sanitize the input, make sure to sanitize the output:
	```js

		app.get('/admin/users', function (req, res, next) {
			const rows = await db.fetchAdminUsers().limit(100).page(0).get();
			for(let user of rows){
				/**
				 * If the backend code that accepted the input for the users
				 * didn't do their job, this could potentially be hazardous.
				 */
				res.send(`<b>User:</b>${user.first_name} ${user.last_name}<br/>`);
				/**
				  * This also violates the MVC pattern...
					* A controller (this route method) shouldn't have to worry about
					* formatting and sending content.
					*/
			}
		});
	```
		- In reality, the above example should be:
	```js
		app.get('/admin/users', function (req, res, next) {
			const rows = await db.fetchAdminUsers().limit(100).page(0).get();
			res.render('list-users', {rows});
		});

	```
	- Measure the tradeoffs of risky practices
	- Know your framework
	- Use a front-end framework
		- Learn how it escapes data
		- Bonus: pay attention to your framework's security vulnerabilities.
	- Avoid using code blocks like these:
	```js
		let html = [];
		for(let user of rows){
			// __NEVER__ DO THIS !!!!
			// __NEVER__ DO THIS !!!!
			// __NEVER__ DO THIS !!!!
			html.push(`<div id="user-${user.id}">${user.first_name} ${user.last_name}</div>`);
		}
		document.getElementById('users-list').innerHTML = html.join('<br/>');
	```
	- Instead, use document.createElement()
		- It's more work, but it's safer
	```js
		let usersList = document.getElementById('users-list');
		for(let user of rows){
			let userRow = document.createElement('div');
			userRow.id = user.id;
			userRow.innerText = `${user.first_name} ${user.last_name}`;
			usersList.appendChild(userRow);
			usersList.appendChild(document.createElement('br'));
		}

	```
