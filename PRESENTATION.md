# Definition of XSS
- TODO

# Levels of badness
	- LOW
	- MEDIUM
	- HIGH

# Login form example

- Issues:
	- Message is completely controlled by GET parameter [badness: HIGH]
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
	
# Recipe maker example

- Issues:
	- Data is *PERSISTENT*
		- Technical issues:
			- Take everything from the login form example and add database persistence.
			- Privileged users likely vulnerable
				- Admins
				- Employees of company hosting the content
		- Non-technical issues
			- Entry level HTML devs will find it hard to figure out why portions of the site work they way they do.
			- User experience likely affected.
				- Chat/Support widgets may refuse to work
					- If a Chat window is included at the end of your page
						- Users will have to call in
						- Not all companies have phone customer service
							- think: start-ups

# Methods to prevent XSS
	- Front-end Frameworks:
		- Understand how your framework escapes data
		- *IMPORTANT*: Front-end frameworks always have XSS vulnerabilities with edge cases. Keep up to date with what's deprecated and routinely check your front-end framework's npm page for updates!
	- Do not be lazy!
		- We do not mean to be rude, but data has to be handled properly.
		- See: LAZY.md
	- Back-end developers:
		- Be aware of *context* when escaping/sanitizing data
