nor-github
==========

Github API library

Create an issue
---------------

```javascript
var github = require('nor-github');

github.create_issue({
	'auth_token': 'foobarsecret',
	'user_agent': 'jheusala',
	'repository': 'sendanor/nor-github',
	'title': 'Test issue',
	'body': 'Test content.'
}).then(function() {
	console.log('OK');
}).fail(function(err) {
	util.error('Error: ' +err);
}).done();
```

Commercial Support
------------------

You can buy commercial support from [Sendanor](http://sendanor.com/software).
