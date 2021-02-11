const updateNotifier = require('update-notifier');
const pkg = require('./package.json');

// Checks for available update and returns an instance
const notifier = updateNotifier({
  packageName: pkg.name,
  packageVersion: pkg.version,
  updateCheckInterval: 1000 * 60 * 60 * 24, // 1 day * 7, // 1 week
});

// Notify using the built-in convenience method
// notifier.notify();

// `notifier.update` contains some useful info about the update
// console.log(notifier.update);
/*
{
	latest: '1.0.1',
	current: '1.0.0',
	type: 'patch', // possible values: latest, major, minor, patch, prerelease, build
	name: 'pageres'
}
*/

// custom message
// console.log(`Update available: ${notifier.update.latest}`);
