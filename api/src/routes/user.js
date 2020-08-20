const server = require('express').Router();
const { User, order_line, Product, Order } = require('../db.js');
const { Sequelize } = require('sequelize');

//crear un usuario
server.post('/',(req,res,next)=>{
    //en caso de que falte algun campo devolver un error
    const {nombre, apellido, email, hashedPassword} = req.body;
    if (!nombre || !apellido || !email || !hashedPassword){
        return res.status(404).send("Falta algun campo");
    } else {
        //se crea el usuario
        User.create({
            nombre,
            apellido,
            email,
            hashedPassword
        })
        .then(user=>{
            return res.status(201).send("Usuario creado");
        })
    }
});

//se trae todos los usuarios
server.get('/',(req,res,next)=>{
    User.findAll()
    .then(user=>{
        res.status(200).send(user);
    })
})

//modifica un usuario
server.put('/:id',(req,res,next)=>{
    const {nombre, apellido, email, hashedPassword} = req.body;
    //devuelve error en el caso que falte algun campo
    if (!nombre || !apellido || !email || !hashedPassword){
        return res.status(404).send("Falto un campo");
    }else {
    User.findByPk(req.params.id)
        .then(user=>{
            if (!user){
                //sino encuentra el usuario devuelve un error
                return res.status(404).send("No se encontro el usurio")
            } else {
            // =actualiza un usuario
            user.nombre = nombre;
            user.apellido = apellido;
            user.email = email;
            user.hashedPassword = hashedPassword;
            user.save();
            res.status(200).send("Usuario modificado")
            return;
            }

        })
    }
})

//borra un usuario
server.delete('/:id',(req,res,next)=>{
    User.findByPk(req.params.id)
    .then(user=>{
        if (!user){
            //sino lo encuentra devuelve un error
            return res.status(400).send("Usuario inexistente");
        } else {
            //borra usuario
            user.destroy();
            return res.status(200).send("Usuario eliminado")
        }
    })
})

server.post('/:id/cart',(req,res,next) =>{
  var order;
  const productId = req.body;
  const userId = req.params.id;
  Order.findOrCreate({
    where:{
      userId: userId,
      estado: 'pending'
    }
  }) //findOrCreate devuelve un array
   .then(orders => {
     order = orders[0]; //Solo hay un carrito por usuario con estado pending
     order_line.findOne({
       where: {
         idOrder: order.idOrder,
         idProduct: productId
       }
     })
     .then(res => { //si existe el producto entonces aumento en uno la cantidad
       if(res !== null){
         res.update({
           cantidad: res.cantidad + 1
         },
         { where: {
             idOrder: order.idOrder,
             idProduct: productId
           }
         }
        )
       } else { //si no existe, creo una nueva fila en la tabla
         order_line.add({
           cantidad: 1,
           idProduct: productId,
           idOrder: order.idOrder
         })
       }
     })
   })
})


module.exports = server;
