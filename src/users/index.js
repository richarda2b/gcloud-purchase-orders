const Datastore = require('@google-cloud/datastore');

const datastore = Datastore();
const kind = 'User';

exports.putUser = function putOrder (req, res) {

  const username = getUsername(req.body);
  const name = getName(req.body);
  const key = datastore.key([kind, username]);
  const registered = new Date().toISOString();

  const entity = {
    key: key,
    data: {
      username: username,
      name: name,
      registered: registered
    }
  };

  return datastore.save(entity)
    .then(() => res.status(200).send(`User ${username} registered successfully.`))
    .catch((err) => {
      console.error(err);
      res.status(500).send(err);
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
