const User = require("../model/user");
const bcrypt = require("bcrypt")
const {response,request}= require("express");
const otherUser = require("../other/user");
const { token } = require("morgan");
const Midtoken = require("../middlewares/token");


const controllerUser = class{
   static inscription = (req=request,res=response)=>{return res.render("inscription",{"title":"inscription",})}
   static inscriptionPost = async(req=request,res=response)=>{
   try {
            const email = req.body.email
      const password = req.body.password
      const uniqueEmail = await otherUser.utilisateurParEmail(email)
      console.log("mon unique" ,uniqueEmail);
      if (uniqueEmail) {
      return res.render ("inscription",{message:"utilisateur existe deja"})
      }else{
         const hashepassword = await bcrypt.hash(password,10)
         const user = {
             name:req.body.name,
             email:req.body.email,
             password:hashepassword,
             statut:req.body.statut
         }
         const enregistrerUser =  await otherUser.inscription(user)
         
         res.redirect("/connexion")
         console.log("mon utilisateur",enregistrerUser);
        
         
        }
        
   } catch (error) {
            console.log("mon erreur niveau inscription",error);
         }
      
    }
    static connexion = (req=request,res=response)=>{return res.render("connexion",{"title":"connexion"})}
    static connexionPost = async(req=request,res=response)=>{
     const email = req.body.email
     const password = req.body.password
     const user = await otherUser.utilisateurParEmail(email)
     console.log('mon password', user);
     if (!user) {
        res.render("connexion",{"message":"email incorrect"})
     }
     const verifPassword = await bcrypt.compare(password,user.password)
     
     if(!verifPassword){
        res.render("connexion",{"message":"mots de pass incorrect"})
     }else if(verifPassword){
        const token = await Midtoken.creerToken(user._id)
        res.cookie("culture",token)
     }
     if(req.body.statut ==='A'){
        res.redirect("/admin")
     }
     return res.redirect("/index")
    }
   
}

module.exports = controllerUser