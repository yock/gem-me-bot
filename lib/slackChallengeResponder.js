export default (req, res, next) => {
  if(req.body.challenge) {
    console.log('Challenge received!');
    return res.status(200).send(req.body.challenge);
  }
  return next();
}
