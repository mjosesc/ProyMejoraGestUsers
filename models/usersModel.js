let conn = require('../connections/mysqlconnection');
let hash = require('bcrypt-nodejs');
let Users={};


Users.register = (usuario,cb)=>{
    let comprobacion = [1,2,3];
    if (!conn) return cb("No se ha podido crear la conexion");
    conn.query("SELECT * FROM cliente WHERE usuario=?",usuario.usuario,function (err1,res1) {
        if (err1) return cb(err1);
        if (res1 != ''){
            return cb(null,comprobacion[0]);
        } else {
            conn.query('SELECT * FROM cliente where email=?',usuario.email,function (err2,res2) {
                if (err2) return cb(err2);
                if (res2 != '' ){
                    return cb(null,comprobacion[1]);
                }else {
                    conn.query('INSERT INTO cliente SET ?',usuario,function (err3,res3) {
                        if(err3) return cb(err3);
                        return cb(null,comprobacion[2]);
                    })
                }
            })
        }
    })
};

Users.login = (usuario,cb)=>{
    let comprobacion = [1,2,3];
    if (!conn) return cb("No se ha podido crear la conexion")
    conn.query('SELECT * FROM cliente WHERE usuario=?',[usuario.usuario],function (err,rows) {
        if (err) return cb(error);
        if (rows == ''){
            return cb(null,comprobacion[0]);
        } else {
            hash.compare(usuario.password, rows[0].hash, function(err, coincide) {
                console.log(coincide);
                if (!coincide){
                    return cb(null,comprobacion[1]);
                }else{
                    return cb(null,comprobacion[2],rows[0]);
                }
            });
        }
    })
};

module.exports = Users;