module.exports = {
  // how many messages should we buffer and send to AWS at once, do not change unless necessary
  batchSize: 50,

  // at what port should our server be listening
  serverPort: 8002,

  // your cloudwatch log group
  logGroup: "heroku",

  // prefix for all stream names (a random number will be appended)
  logStreamPrefix: "auth",

  // we strongly recommend using env variables for the credentials, however you can still add them here
  awsCredentials: {
    region: "us-east-1",
  },

  // access token, which will be sent from heroku on every request
  accessToken: process.env.HEROKU_TOKEN
};