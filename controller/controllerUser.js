const User = require("../model/user");
const bcrypt = require("bcrypt")
const {response,request}= require("express");
const otherUser = require("../other/user");
const { token } = require("morgan");
const Midtoken = require("../middlewares/token");


const controllerUser = class{
   static inscription = (req=request,res=response)=>{
      const token = req.cookies.culture
      if (token) {
         res.redirect("/index2")
      } else {
         return res.render("inscription")
      }
   }
   static inscriptionPost = async(req=request,res=response)=>{
   
      const email = req.body.email
      const password = req.body.password
      const uniqueEmail = await otherUser.utilisateurParEmail(email)
      console.log("mon unique" ,uniqueEmail);
      if (uniqueEmail) {
         
       res.render("inscription",{vv:"l'utilisateur existe deja"})
       console.log("mon message1",'utilisateur existe deja');
      }else {
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
        
  
      
    }
    static connexion = (req=request,res=response)=>{
      const token = req.cookies.culture
      if (token) {
         res.redirect("/index2")
      } else {
         return res.render("connexion",{"title":"connexion"})}
      }
      
    static connexionPost = async(req=request,res=response)=>{
     const email = req.body.email
     const password = req.body.password
     const user = await otherUser.utilisateurParEmail(email)
     console.log('mon password', user);
     if (!user) {
      
      return res.render("connexion",{message1:"email incorrect"})
     }
     const verifPassword = await bcrypt.compare(password,user.password)
     
     if(!verifPassword){
     
        res.render("connexion",{message2:"mot de pass incorrect"})
     }else if(verifPassword){
        const token = await Midtoken.creerToken(user._id)
        res.cookie("culture",token)
     }
     if(req.body.statut ==='A'){
       return res.redirect("/admin")
     }
     return res.redirect("/index2")
      
    }
    static deconnexion =async(req=request,res=response)=>{
      res.clearCookie("culture")
      res.redirect("/connexion")
      console.log("ma deconnexion a ete bien effectuer");
    }
    static index2 = async (req=request,res=response)=>{
      const token = await req.cookies.culture
      console.log('mon cookie1er' ,token);
      const verif = await Midtoken.verifyToken(token)
      console.log("ma verification",verif);
      const id= verif.id
      console.log("mon id",id);
      const user = await otherUser.utilisarteuParID(id)
      console.log("mon utilisateur par id",user);
       res.render("index2",{"users":user})
       console.log("mon non",user.name);
   }
   
}

module.exports = controllerUser