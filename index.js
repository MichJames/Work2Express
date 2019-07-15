express = require('express')
app = express()
metrics = require('./metrics.js')

app.set('port', 1337)

app.listen(
  app.get('port'),
  () => console.log(`server listening on ${app.get('port')}`)
)

app.set('views', __dirname + "/views")
app.set('view engine', 'ejs');


app.get('/',
(req,res) => res.render('intro.ejs', {name: req.params.name}))


app.get('/hello/Team7',
(req,res) =>res.render('helloT7.ejs', {name: req.params.name}))


app.get('/hello/:name',
(req,res) => res.send("Hello " + req.params.name))

app.get('/hello',
(req,res) => res.render('hello.ejs', {name: req.params.name}))

app.use(function(err, req, res, next) {
    res.status(404).send('Sorry cant find that!');
  });

path = require('path')
app.use(express.static(path.join(__dirname, 'public')))

app.get('/metrics.json', (req, res) => {
  metrics.get((err, data) => {
    if(err) throw err
    res.status(200).json(data)
  })
})
