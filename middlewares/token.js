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
        } catch (error) {
            console.log("mon erreur lors de la verifiction du token", error);
        }
    }

    static authToken = async (req,res,next)=>{
        const token = req.cookie.culture
        if (token) {
            jwt.verify(token,"maclée",async(error,succes))
            if (error) {
                res.redirect("/connexion")
            }
            else{
                if(req.url==="indexs1"){
                    res.redirect("/index2")
                     }
                   else if (req.url==="/deconnection") {
                     res.redirect("/connexion")
                    }
                 else{
                     next()
                 }
            }
        }else{
            res.redirect('/connexion')
        }
    }
}
module.exports= Midtoken