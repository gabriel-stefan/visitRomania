if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const path = require('path');
const bcrypt = require('bcrypt');
const passport = require('passport');
const initializePassport = require('./js/passport-config');
const flash = require('express-flash');
const session = require('express-session');

const users = [];

initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
);

app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/poze', express.static(path.join(__dirname, 'poze')));
app.use('/html', express.static(path.join(__dirname, 'html')));
app.use('/vreme', express.static(path.join(__dirname, 'vreme')));

app.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) { return next(err); }
    if (!user) {
      req.flash('error', info.message);
      return res.redirect('/login');
    }
    req.logIn(user, (err) => {
      if (err) { return next(err); }
      return res.redirect('/index');
    });
  })(req, res, next);
});

app.post('/register', async (req, res) => {
  try {
    const existingUser = users.find(user => user.email === req.body.email);
    if (existingUser) {
      req.flash('error', 'Email is already registered');
      return res.redirect('/register');
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    //console.log(users);
    res.redirect('/login');
  } catch (e) {
    console.log(e);
    res.redirect('/register');
  }
});

app.post('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', { user: req.user });
});

app.get('/login', (req, res) => {
  const messages = req.flash('error');
  res.render('login', { errorMessages: messages, user: req.user });
});

app.get('/register', (req, res) => {
  const messages = req.flash('error');
  res.render('register', { errorMessages: messages, user: req.user });
});

app.get('/index', (req, res) => {
  res.render('index', { user: req.user });
});

const checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('error', 'You need to log in first');
  res.redirect('/login');
};

app.get('/geografie', (req, res) => {
  res.sendFile(path.join(__dirname, 'html', 'geografie.html'));
});

app.get('/general', (req, res) => {
  res.sendFile(path.join(__dirname, 'html', 'general.html'));
});

app.get('/weather', checkAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, 'html', 'weather.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'html', 'contact.html'));
});

app.get('/other', (req, res) => {
  res.sendFile(path.join(__dirname, 'html', 'other.html'));
});

app.get('/visa', (req, res) => {
  res.sendFile(path.join(__dirname, 'html', 'visa.html'));
});

app.use((req, res, next) => {
  res.status(404).render('404');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
