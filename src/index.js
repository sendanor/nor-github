/** GitHub API actions as promise returning functions */

var mod = module.exports = {};
var debug = require('nor-debug');
var is = require('nor-is');
var request = require('nor-rest').request;
var ref = require('nor-ref');

/** Create an issue
 * See https://developer.github.com/v3/issues/#create-an-issue
 * @param opts.auth_token {string} Required. The authorization token
 * @param opts.repository {string} Required. The repository where to create the issue, including the owner (like `sendanor/foo`)
 * @param opts.user_agent {string} The user agent header. Use your GitHub username or application name. Defaults as `opts.repository`.
 * @param opts.title {string} Required. The title of the issue.
 * @param opts.body {string} The body of the issue.
 * @param opts.assignee {string} The assignee
 * @param opts.milestone {number} The milestone to associate this issue.
 * @param opts.labels {array of strings} Labels for the issue.
 */
mod.create_issue = function(opts) {
	opts = opts || {};
	debug.assert(opts).is('object');

	// Check parameters
	debug.assert(opts.repository).is('string');
	debug.assert(opts.auth_token).is('string');

	debug.assert(opts.user_agent).ignore(undefined).is('string');
	if(opts.user_agent === undefined) {
		opts.user_agent = opts.repository;
	}

	debug.assert(opts.title).is('string');
	debug.assert(opts.body).ignore(undefined).is('string');
	debug.assert(opts.assignee).ignore(undefined).is('string');
	debug.assert(opts.milestone).ignore(undefined).is('number');
	debug.assert(opts.labels).ignore(undefined).is('array');

	if(!opts.auth_token) {
		throw new TypeError("opts.auth_token required!");
	}

	if(!opts.title) {
		throw new TypeError("Missing required opts.title");
	}

	debug.log('opts = ', opts);

	// Build body
	var data = {};
	data.title = opts.title;

	if(is.defined(opts.body)) {
		data.body = opts.body;
	}

	if(is.defined(opts.milestone)) {
		data.milestone = opts.milestone;
	}

	if(is.defined(opts.labels)) {
		data.labels = opts.labels;
	}

	// Create request
	var url = 'https://api.github.com/repos/' + opts.repository + '/issues';
	debug.log('POSTing to '+url+'...');
	return request.json(url, {
		'method': 'POST',
		'headers': {
			'User-Agent': opts.user_agent,
			'Accept': 'application/vnd.github.v3+json',
			'Content-Type': 'application/json;charset=utf8',
			'Authorization': 'token '+opts.auth_token
		},
		'body': data
	});
	
};

/* EOF */
