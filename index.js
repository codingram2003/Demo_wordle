const express= require('express');
const app= express();
const mysql= require('mysql');
const bodyparser= require('body-parser')
const cors=require('cors')

const db=mysql.createPool({
    host: 'www.remotemysql.com',
    user:'Tjs20LIHEk',
    password:'w9HfjhciP1',
    database: 'Tjs20LIHEk',
});
app.use(cors());
app.use(bodyparser.urlencoded({extended:'true'}));

app.use(express.json());

app.post('/api/register', (req,res) => {

    const userName=req.body.userName;
    const password=req.body.password;
    const A_1='0';
    const A_2='0';

    const sqlregister="INSERT INTO logins(userName, password, A_1, A_2) VALUES (?,?,?,?);";

    db.query(sqlregister, [userName, password, A_1, A_2], (err, result)=>{
        if(err){
            res.send({err:err})
        } else {
            res.send({message: "You've successfully registered"})
        }
    });
    
}); 

app.post('/api/login', (req,res) => {

    const userName=req.body.luserName;
    const password=req.body.lpassword;

    db.query("SELECT * FROM logins WHERE userName = ? AND password = ? ", 
    [userName, password],
    (err, result)=>{
        if (err){
            res.send({err:err});
            console.log(err);
        }
        if (result.length > 0){
            res.send(result);
            console.log(result);
        } else {
            res.send({message: "username/password is incorrect"})
        }
    });
    
});

app.post('/api/commit', (req,res) => {

    const A_1=req.body.A_1;
    const A_2=req.body.A_2;
    const userName=req.body.userName;

    const sqlcommit="UPDATE logins SET A_1= ?, A_2= ? WHERE userName= ?";

    db.query(sqlcommit, [ A_1,A_2, userName], (err, result)=>{
        console.log(err)
    });
    
}); 

app.post('/api/commit0', (req,res) => {

    const A_1=req.body.A_1;
    const A_2=req.body.A_2;
    const userName=req.body.userName;

    const sqlcommit="UPDATE logins SET A_1= ?, A_2= ? WHERE userName= ?";

    db.query(sqlcommit, [ A_1,A_2, userName], (err, result)=>{
        console.log(err)
    });
    
});

app.get('/api/scores', (req, res)=>{
    db.query("SELECT userName, A_1, A_2 FROM logins",(err, result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }

        
    })
})

app.listen('3000', () => {
    console.log("running on port ${PORT}")
}
);
