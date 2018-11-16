import PubSub from 'pubsub-js';
import Promise from 'bluebird';

export default (targetChannel, bot, eventData) => {
  const { users, chat } = bot;
  const { event: { item_user, item: { channel, ts: message_ts } } } = eventData;
  return Promise
    .props({
      user: users.info({ user: item_user }),
      message: chat.getPermalink({ channel, message_ts })
    })
    .then(({ user: { user: { name } }, message: { permalink } }) => chat.postMessage({
      channel: targetChannel,
      text: `@${name}: ${permalink}`,
      unfurl_links: true,
      parse: 'full' 
    }));
}
