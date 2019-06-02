const style = require('ansi-styles');
const express = require('express');
const app = express();
const port = 3000;

const DICE = [
  `
  -----
  |   |
  | o |
  |   |
  -----`,
  `
  -----
  |o  |
  |   |
  |  o|
  -----`,
  `
  -----
  |o  |
  | o |
  |  o|
  -----`,
  `
  -----
  |o o|
  |   |
  |o o|
  -----`,
  `
  -----
  |o o|
  | o |
  |o o|
  -----`,
  `
  -----
  |o o|
  |o o|
  |o o|
  -----`
];

const COLORS = ['red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white']

app.get('/', async (req, res, next) => {
  const userAgent = req.headers['user-agent'];
  const isCommandline = (userAgent.search(/curl|wget/i) !== -1);
  if (isCommandline) {
    const randomElementOfArray = (array) => array[Math.floor(Math.random() * (array.length))];
    const roll = randomElementOfArray(DICE);
    const color = randomElementOfArray(COLORS);
    await res.send(`${style[color].open}${roll}${style[color].close}`);
    return null;
  }

  return next();
});

app.use('/', express.static('static'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));