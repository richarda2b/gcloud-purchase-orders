const Datastore = require('@google-cloud/datastore');

const datastore = Datastore();
const kind = 'User';

exports.insertEvent = (id, eventData) => {
  const key = datastore.key([kind, id]);
  const entity = {
    key: key,
    data: eventData
  };

  return datastore.insert(entity);
}
