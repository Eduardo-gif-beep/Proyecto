const express = require("express");
const routes = express.Router();

var studentRegister = [];

var st1 = {
    name:"Alexis",
    last_name: "Torres",
    age: "26"
}

var st2 = {
    name:"Christopher",
    last_name: "Gonzalez",
    age: "20"
}

var st3 = {
    name:"Guillermo",
    last_name: "Contreras",
    age: "19"
}

studentRegister.push(st1);
studentRegister.push(st2);
studentRegister.push(st3);

routes.get("/",(req,res,next) => {
    res.status(200).json({
        studentRegister
    });
});

routes.get("/id/:idStudent",(req,res,next) =>{
    if (parseInt(req.params.idStudent) > 0 && parseInt(req.params.idStudent) < studentRegister.length){
        res.status(200).json(studentRegister[parseInt(req.params.idStudent)-1]);
    }else{
        res.status(404).json({
            message:"El valor ingresado no es correcto, favor de verificar"
        });
    }
});

routes.get("/name/:nameStudent",(req,res,next) =>{
    var i = 0;
    var bandera = false;
    var index = 0;
    for(i; i<studentRegister.length; i++){
        console.log(req.params.nameStudent.toLowerCase())
        console.log(studentRegister[i].name.toLowerCase());
        if ((req.params.nameStudent.toLowerCase() === studentRegister[i].name.toLowerCase())){
            bandera = true;
            index = i;
            i = studentRegister.length;
        }
    }
    
    if (bandera){
        res.status(200).json(
            studentRegister[index]
        );
    }else{
            res.status(404).json({
                message:"El nombre ingresado no es correcto, favor de verificar"
        });
    }
});

routes.post("/",(req,res,next)=>{
    
    if (req.body.name !== "" && req.body.last_name !== "" && req.body.age !== ""){

    

    var aux = {
        name:req.body.name,
        last_name:req.body.last_name,
        age:req.body.age
    }

    studentRegister.push(aux);

    res.status(200).json({
    message:"The record was succesfully saved"
   });

}else{
    res.status(404).json({
        message:"The record can't be added, try again"
    });

}

});

module.exports =routes;