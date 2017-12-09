const Datastore = require('@google-cloud/datastore');
const uuid = require('uuid/v1');

const datastore = Datastore();
const kind = 'Order';

exports.putOrder = function putOrder (req, res) {
  // The value contains a JSON document representing the entity we want to save
  if (!req.body.value) {
    throw new Error('Value not provided. Make sure you have a "value" property in your request');
  }

  const key = generateKey(req.body);
  const created = new Date().toISOString();
  const entity = {
    key: key,
    data: {
      type: "OrderCreated",
      data: req.body.value,
      created
    }
  };

  return datastore.save(entity)
    .then(() => res.status(200).send(`Event ${key.path.join('/')} saved.`))
    .catch((err) => {
      console.error(err);
      res.status(500).send(err);
      return Promise.reject(err);
    });
};

function generateKey (requestData) {
  return datastore.key([kind, uuid()]);
}
