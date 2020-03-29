import * as express from 'express';
import * as morgan from 'morgan';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';
import * as expressSession from 'express-session';
import * as dotenv from 'dotenv';
import * as passport from 'passport';
import * as hpp from 'hpp';
import * as helmet from 'helmet';

dotenv.config();

const prod = process.env.NODE_ENV === 'production';

const app = express();

app.use('/', express.static('uploads'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(expressSession({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET!,
  cookie: {
    httpOnly: true,
    secure: false, // https를 쓸 때 true
    domain: prod ? '.nodebird.com' : undefined,
  },
  name: 'rnbck',
}));
app.use(passport.initialize());
app.use(passport.session());

app.set('port', prod ? process.env.PORT : 3065);
app.get('/', (req, res) => {
    res.send('react nodebird 백엔드 정상 동작!');
  });

//   app.listen(prod ? process.env.PORT : 3065, () => {
    app.listen(app.get('port'), () => {
    console.log(`server is running on ${app.get('port')}`);
  });