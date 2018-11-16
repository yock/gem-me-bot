import PubSub from 'pubsub-js';
import Promise from 'bluebird';

export default (eventData) => {
  const eventType = eventData.event.type;
  const result = PubSub.publish(eventType, eventData);
  return result ? Promise.resolve(eventData) : Promise.reject(`Failed to publish event ${eventType}`);
}
