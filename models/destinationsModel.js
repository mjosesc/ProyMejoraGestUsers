let conn = require('../connections/mysqlconnection');
let destinations = {};

destinations.getAllDestinations = (cb)=>{
    if (!conn) return cb("No se ha podido crear la conexion");
    conn.query('SELECT destinos.*,viajes.* FROM destinos INNER JOIN viajes ON destinos.id=viajes.id',function (err,rows) {
        if (err) return cb(err);
        // console.log(rows);
        return cb(err,rows);
    })
};

destinations.createDestination = (destino,viaje,cb)=>{
    if (!conn) return cb("No se ha podido crear la conexion");
    conn.query('INSERT INTO destinos SET ?',destino,function (err,resultado) {
        if (err) return cb(err);
        conn.query('INSERT INTO viajes SET ?',viaje,function (err2,resultado2) {
            if (err2) return cb(err2);
            return cb(null,resultado2);
        })
    })
};

destinations.deleteDestination = (id,cb)=>{
    if (!conn) return cb("No se ha podido crear la conexion");
    conn.query('DELETE FROM destinos WHERE id=?',id,(err,resultado)=>{
        if (err) return cb(err);
        conn.query('DELETE FROM viajes WHERE id=?',id,(err2,resultado2)=>{
            if (err2) return cb(err2);
            return cb(null,resultado2);
        })
    })
};

destinations.updateActive= (id,cb)=>{
    if (!conn) return cb("No se ha podido crear la conexion");
    conn.query('SELECT * FROM destinos WHERE id=?',id,(err,resultado)=>{
        if (err) return cb(err);
        let activo = 0;
        if(resultado[0].activo) {
            activo = 0;
        } else {
            activo = 1;
        }
        conn.query('UPDATE destinos SET activo='+activo+' WHERE id=?',id,(err2,resultado2)=>{
            if (err2) return cb(err2);
            return cb(null,resultado2);
        })
    })
};

module.exports = destinations;