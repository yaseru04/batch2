const express = require('express')
const path = require('path');
const app = express()
const bodyParser = require('body-parser');
const mysql =require('mysql');

const port = 3008

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'produk'

});

connection.connect(function(error){
    if(error) console.log(error);
    else console.log('connectDB');
});

app.use(bodyParser.urlencoded({extended: false}));
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


// app.get('/', (req, res) => {
//     res.send('Hello World!')
//   })

app.get('/', (req, res) => { //request menangkap request dari luar , res merespons request ke luar
    // res.send('CRUD Operation using NodeJS / ExpressJS / MySQL');
    let sql = 
    "SELECT user.ID, user.username, orders.nama_order FROM user inner join orders on user.orders = orders.order_ID"
    ; //menampilkan data users
    let query = connection.query(sql, (err, rows) => {
        if (err){
             throw err;
        } else {//error handling
        res.render('user_index', {
            title: 'CRUD Operation using NodeJS / ExpressJS / MySQL',
            user: rows
        });
    }
    });
});

app.get('/add', (req, res) => {
    res.render('user_add', {
        title: ' Operation using NodeJS / ExpressJS / MySQL'
    });
});

app.post('/save',(req, res)=> {
    let data = {nama:req.body.nama, email:req.body.email, telp:req.body.telp};
    let sql = "INSERT INTO user SET ?";
    let query = connection.query(sql, data,(err, result)=>{
        if(err) throw err;
        res.redirect('/');
    });
});

app.get('/edit/:userId',(req,res)=>{
    const userId= req.params.userId;
    let sql = `select * from user where id= '${userId}'`
    let query = connection.query(sql,(err, result)=>{
        if(err) throw err;
        res.render('user_edit',{
            user :result[0]
        })
    })
})

app.post('/update',(req,res)=>{
    const userId= req.body.id;
    let sql = `update user set nama ='${req.body.nama}', email='${req.body.email}', telp=${req.body.telp} where id=${userId}`;
    let query = connection.query(sql, (err, result)=>{
        if(err) throw err;
        res.redirect('/');
    });
});

app.get('/delete/:userId',(req,res)=>{
    const userId = req.params.userId;
    let sql = `DELETE from user where id = '${userId}'`;
    let query = connection.query(sql,(err, result)=>{
        if(err) throw err;
        res.redirect('/');
    });
});