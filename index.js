const express = require('express')
const { create } = require('express-handlebars')  // Atualizado para usar o método create
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')
const conn = require('./db/conn')
const Tought = require('./models/Tought')
const User = require('./models/User')

const app = express()

// Configuração do handlebars com o método create
const hbs = create({
  extname: '.handlebars', // Extensão dos arquivos de template
  defaultLayout: 'main',  // Layout padrão
})

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.use(
  express.urlencoded({
    extended: true,
  })
)

app.use(express.json())

// Middleware de sessão
app.use(
  session({
    name: 'session',
    secret: 'nosso_secret',
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
      logFn: function () {},
      path: require('path').join(require('os').tmpdir(), 'sessions'),
    }),
    cookie: {
      secure: false,
      maxAge: 360000,
      expires: new Date(Date.now() + 360000),
      httpOnly: true,
    },
  })
)

// Flash messages
app.use(flash())

// Caminho público
app.use(express.static('public'))

// Setar sessão no response
app.use((req, res, next) => {
  if (req.session.userid) {
    res.locals.session = req.session
  }

  next()
})

conn
  .sync()
  .then(() => {
    app.listen(3000)
  })
  .catch((e) => console.log(e))
