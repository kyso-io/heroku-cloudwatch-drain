"use strict";

function getLogGroup(cloudwatchlogs, name) {
	return cloudwatchlogs
		.describeLogGroups({
			logGroupNamePrefix: name,
		})
		.promise()
		.then(info => {
			return info.logGroups.find(logGroup => logGroup.logGroupName === name);
		});
}

function createLogGroup(cloudwatchlogs, name) {
	return cloudwatchlogs
		.createLogGroup({
			logGroupName: name,
		})
		.promise();
}

function createLogStream(cloudwatchlogs, group, stream) {
	return cloudwatchlogs
		.createLogStream({
			logGroupName: group,
			logStreamName: stream,
		})
		.promise();
}

function setup(cloudwatchlogs, groupName, streamName) {
	return getLogGroup(cloudwatchlogs, groupName)
		.then(logGroup => {
			if (!logGroup) {
				return createLogGroup(cloudwatchlogs, groupName);
			}
		})
		.then(() => {
			return createLogStream(cloudwatchlogs, groupName, streamName)
				.then(() => '')
				.catch((err) => {
					console.log(`Log stream ${streamName} already exists, using it`)
					return ''
				})
		});
}

module.exports = setup;
module.exports.getLogGroup = getLogGroup;
module.exports.createLogGroup = createLogGroup;
module.exports.createLogStream = createLogStream;
