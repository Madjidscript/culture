const jwt = require('jsonwebtoken')


const Midtoken = class {
    static creerToken = async(id)=>{
        try {
            let  data = {id}
        console.log("mon id",data.id);
        const token = await jwt.sign(data,"maclée",{expiresIn:"5h"})
        return token
        } catch (error) {
            console.log("mon erreur lors de la creation du token", error)
        }
         
    }
    static verifyToken = async (token)=>{
        try {
            const decodToken = await jwt.verify(token,"maclée")
            return decodToken
        } catch (error) {
            console.log("mon erreur lors de la verifiction du token", error);
        }
    }

    static authToken = async (req,res,next)=>{
        const token =  req.cookies.culture
        if (token) {
        const bonToken =  await  jwt.verify(token,"maclée")
          if (bonToken) {
            next()
          }else{
            res.redirect("/connexion")
          }
        }else{
            res.redirect("/connexion")
          }
    }
}
module.exports= Midtoken