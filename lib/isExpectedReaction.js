import Promise from 'bluebird';

export default (emojiName, eventData) => {
  const { event: { reaction } } = eventData;
  return reaction ===  emojiName;
}
