import { curry } from 'lodash';
import Slack from 'slack';
import PubSub from 'pubsub-js';
import env from 'node-env-file';
import exists from 'node-file-exists';
import express from 'express';
import { json } from 'body-parser';
import slackChallengeResponder from './slackChallengeResponder';
import postEvent from './postEvent';
import isExpectedReaction from './isExpectedReaction';
import pubSubEventReceiver from './pubSubEventReceiver';

if (exists('./.env')) {
  env('./.env');
}

const port = process.env.PORT || 3000;
const token = process.env.BOT_TOKEN;

const bot = new Slack({ token });
const app = express();

app.use(json());
app.use(slackChallengeResponder);

app.post('/events', (req, res) => {
  return pubSubEventReceiver(req.body)
    .catch((error) => { console.log(error); })
    .finally(() => res.status(200).send()); // Slack need not know about our problems
});

app.listen(port)


bot.rtm.start()
  .then(() => {
    PubSub.subscribe('reaction_added', (msg, data) => {
      if(isExpectedReaction('gem', data)) {
        return postEvent('gems', bot, data);
      }
    });
  })
  .catch(console.log);

