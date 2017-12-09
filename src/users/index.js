const UserService  = require('./UserService');

exports.putUser = function putOrder (req, res) {

  const eventData = {
    username: getUsername(req.body),
    name: getName(req.body),
    created: new Date().toISOString()
  }

  return UserService.insertEvent(eventData.username, eventData)
    .then(() => res.status(200).send(`Event for ${eventData.username} submitted successfully.`))
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error processing request");
      return Promise.reject(err);
    });
};

function getName (requestData) {
  if (!requestData.name) {
    throw new Error(`Error extracting "name" from request: ${requestData}`);
  }
  return requestData.name;
}

function getUsername (requestData) {
  if (!requestData.username) {
    throw new Error(`Error extracting "username" from request ${requestData}`);
  }
  return requestData.username;
}
