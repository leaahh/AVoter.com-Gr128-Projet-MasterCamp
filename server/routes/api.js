const express = require('express')
const router = express.Router()
const {con} = require('../../mysql-test/mysql.js')

const bcrypt = require('bcrypt')

//connection mysql
con.connect(function(err){
    if (!!err){
        console.log('Erreur')
    }
    else{
        console.log('Connecté')
    }
})

router.post('/inscription', (req, res) => {
    const prenom = req.body.prenom
    const nom = req.body.nom
    const naissance = req.body.naissance
    const tel = req.body.tel
    const email = req.body.email
    const password = req.body.password
    const fichier = req.body.fichier
  
    const split_date = naissance.split('-')
    for (var i=0; i<split_date.length; i++){
      split_date[i] = parseInt(split_date[i])
    }
  
    const annee = split_date[0]
    const mois = split_date[1]
    const jour = split_date[2]
  
    var d = new Date(annee, mois-1, jour)
    var date_naissance = new Date(d.getFullYear(), d.getMonth(), d.getDate())
    date_naissance.setHours(2,0,0)
  
    var actuel = Date.now()
    var date_actuel = new Date(actuel)
    date_actuel = new Date(date_actuel.getFullYear(), date_actuel.getMonth(), date_actuel.getDate()-1)
    date_actuel.setHours(2,0,0)
  
    var diff = date_actuel.getTime() - date_naissance.getTime()
    var age = new Date(diff)
    age = Math.abs(age.getUTCFullYear()-1970)
  
    if(age<18){
      res.json({message:"La date saisie indique que vous n'êtes pas majeur."})
    } else{
      if(prenom=="" || nom=="" || naissance==null || tel=="" || email=="" || password=="" || fichier==""){
        res.json({message : "Informations incomplètes, veuillez réessayer."})
      }
  
      con.query('SELECT count(*) as count FROM votant where email=?', [email], async function (error, result, fields) {
        result = JSON.parse(JSON.stringify(result))
        
        if(result[0].count !== 0){
          res.json({message:"Cet email est déjà enregistré. Vous pouvez accéder à la page de connexion."})
        } else {
            con.query('SELECT count(*) as count FROM votant where tel=?', [tel], async function (error, result, fields) {
                if(result[0].count !== 0){
                    res.json({message:"Un compte a déjà été enregistré avec ce numéro. S'il ne s'agit pas de vous, merci de nous contacter au plus vite."})
                } else {
                    const mdp_hash = await bcrypt.hash(password, 10)
         
                    con.query('insert into votant(prenom, nom, naissance, tel, email, mdp, fichier) values (?, ?, ?, ?, ?, ?, ?)',
                    [prenom,nom,naissance,tel, email,mdp_hash, fichier], function(error,result,fields){
                        if (error) throw error
                        con.query('UPDATE votant SET statut = 1 WHERE email=?',[email], function(error,result){
                            if (error) throw error
                            con.query('select * from votant where email=?',[email], function(error,result){
                                res.status(200).json({message:"L'utilisateur a bien été enregistré", user: result[0]})
                            })
                        })
                    })
                }
            })  
        }
      })
    }
})
  
router.post('/connexion',(req,res)=>{
    const email = req.body.email
    const password = req.body.password
  
    con.query('select * from votant where email=?', [email], async function(error, result, fields){
      if(error) throw error
      result = JSON.parse(JSON.stringify(result))
      console.log(result)
      
      if(result.length===0){
        //res.status(400).json({message:"Utilisateur introuvable dans la base de données"})
        res.json({message:"Cet e-mail n'est pas enregistré sur notre site. Veuillez vérifier votre adresse mail ou créer un compte."})
      } else {
        if (await bcrypt.compare(password, result[0].mdp)) {

            con.query('select statut from votant where email=?',[email], function (error, result){
                if (result[0].statut === 1){
                    res.json({ message: 'Vous êtes déjà connecté !' })
                    return 
                } else {
                    con.query('UPDATE votant SET statut = 1 WHERE email=?',[email], function (error, result){
                        if (error) throw error
                        con.query('select * from votant where email=?',[email], function (error, result){
                            res.status(200).json({message : 'Utilisateur connecté.e', user: result[0]})
                        })
                    })
                }
            })

            /*
            if(req.session.userId == result[0].id_votant){
                //res.status(401).json({ message: 'Vous êtes déjà connecté !' })
                res.json({ message: 'Vous êtes déjà connecté !' })
                return 
            } else{
                req.session.userId = result[0].id_votant
                res.status(200).json({message : 'Utilisateur connecté.e', user: result[0]})
            }*/

        } else {
          res.json({ message: 'Votre mot de passe est incorrect, veuillez rééssayer.' })
        }
      }
    })
})
  
router.get('/me/:email?',(req,res)=>{
    const email = req.query.email
   
    if(typeof(email) === 'undefined'){
        res.status(401).json({ message: "Pas connecté.e" })
        return
    } else { 
        con.query('select statut from votant where email=?',[email], function(error, result){   
            if(result[0].statut===0){
                res.status(401).json({ message: "Pas connecté.e" })
                return
            } else{
                con.query('select * from votant where email=?',[email], async function(error, result){
                    //console.log(result[0])
                    res.json(result[0])
                })
            }
        })
        
    }

    /*
    if(typeof req.session.userId === 'undefined'){
      res.status(401).json({ message: "Pas connecté.e" })
      return
    } else {
      con.query('select * from votant where id_votant=?',[req.session.userId], async function(error, result){
        console.log(result[0])
        res.json(result[0])
      })
    }
    */
})
  
//DECONNEXION
router.post('/me',(req,res)=>{
    const email = req.body.email
   
    if(typeof(email) === 'undefined'){
        res.status(401).json({ message: "Pas connecté.e" })
        return
    } else { 
        con.query('UPDATE votant SET statut=0 where email=?',[email], function(error, result){   
            res.status(200).json({ message: "Deconnecté.e"})
        })
    }
    /*
    if(typeof req.session.userId === 'undefined'){
      res.status(401).json({ message: "Pas connecté.e" })
      return
    } else {
      req.session.userId = undefined
      res.status(200).json({ message: "Deconnecté.e"})
    }*/
})

router.get('/candidats/:numelec?/:numtour?', async(req,res) => {
    const numelec = req.query.numelec
    const numtour = req.query.numtour

    var cand = con.query('SELECT * FROM candidat where ID_election=? AND ID_tour=?', [numelec,numtour], function(err,rows) {
        if (err){
            console.log('Erreur', err.message)
            return err
        }
        else{
            res.json(rows)
        }
    })
})

router.get('/tours', async(req,res) => {
    var tours = await con.query('SELECT * FROM tour', function(err,rows) {
        if (!!err){
            console.log('Erreur')
            return err
        } else{
            console.log('Success !!\n\n')
            res.send(rows)
        }
    })
    res.json(tours)
})

router.get('/actualites', async(req,res) => {
    var actus = await con.query('SELECT * FROM actualites', function(err,rows) {
        if (!!err){
            console.log('Erreur')
            return err
        } else{
            console.log('Success !!\n\n')
            res.send(rows)
        }
    })
    res.json(actus)
})

router.get('/votants', async(req,res) => {
    var votant = await con.query('SELECT * FROM votant', function(err,rows) {
        if (!!err){
            console.log('Erreur')
            return err
        }
        else{
            console.log('Success !!\n\n')
            res.send(rows)
        }
    })
    res.json(votant)
})

router.get('/votant/:statut?', (req,res) => {
    var statut = req.query.statut
    con.query('select * from votant where statut=?', [statut], function(error, result){
        if (error) throw error
        res.json(result[0])
    })
})

router.post('/vote', async(req,res) => {
    const id = req.body.id
    await con.query('UPDATE candidat SET Votes=Votes+1 WHERE ID_candidat=?', [id], function(err,rows) {
        if (!!err){
            console.log('Erreur')
            return err
        }else{
            console.log('Success !!\n\n')
            console.log(rows)
            res.json("Changements effectués !")
        }
    })
})

router.post('/a_vote', async(req,res) => {
    const id = req.body.id
    await con.query('UPDATE votant SET A_vote=1 WHERE ID_votant=?', [id], function(err,rows) {
        if (!!err){
            console.log('Erreur')
            return err
        }else{
            console.log('Success !!\n\n')
            console.log(rows)
            res.json("Changements effectués !")
        }
    })
})

router.post('/recup_vote', async(req,res) => {
    const id = req.body.id
    var vote = await con.query('SELECT Votes FROM candidat WHERE ID_candidat=?', [id], function(err,rows) {
        if (!!err){
            console.log('Erreur')
            return err
        } else{
            console.log('Success !!\n\n')
            console.log(rows)
            res.send(rows)
        }
    })
    res.json(vote)
})

router.post('/recup_a_vote', async(req,res) => {
    const id = req.body.id
    var a_vote = await con.query('SELECT A_vote FROM votant WHERE ID_votant=?', [id], function(err,rows) {
        if (!!err){
            console.log('Erreur')
            return err
        }else{
            console.log('Success !!\n\n')
            console.log(rows)
            res.send(rows)
        }
    })
    res.json(a_vote)
})

router.post('/decompte_tour', async(req,res) => {
    const id = req.body.id_tour
    await con.query('UPDATE tour SET termine = 1 WHERE ID_tour = ?', [id], function(err,rows) {
        if (!!err){
            console.log('Erreur')
            return err
        } else{
            res.json("Changements effectués !")
        }
    })
})

router.get('/max_id', async(req,res) => {
    var candId = await con.query('SELECT ID_candidat FROM candidat WHERE Votes in (SELECT MAX(Votes) FROM candidat)', function(err,rows) {
        if (!!err){
            console.log('Erreur')
            return err
        } else{
            res.send(rows)
        }
    })
    res.json(candId)
})

router.post('/second_tour', async(req,res) => {
    const candId = req.body.id
    await con.query('UPDATE candidat SET ID_tour = 2 WHERE ID_candidat = ?', [candId], function(err,rows) {
        if (!!err){
            console.log('Erreur')
            return err
        } else{
            res.json("Changements effectués !")
        }
    })
})

router.post('/gagnant', async(req,res) => {
    const candId = req.body.id
    const numel = req.body.numel
    await con.query('UPDATE election SET ID_gagnant = ? WHERE ID_election = ?', [candId,numel], function(err,rows) {
        if (!!err){
            console.log('Erreur')
            return err
        } else{
            res.json("Changements effectués !")
        }
    })
})

router.post('/setvote', async(req,res) => {
    const candId = req.body.id
    await con.query('UPDATE candidat SET Votes = 0 WHERE ID_candidat = ?', [candId], function(err,rows) {
        if (!!err){
            console.log('Erreur')
            return err
        } else{
            res.json("Changements effectués !")
        }
    })
})

router.post('/reset_vote', async(req,res) => {
    await con.query('UPDATE votant SET A_vote = 0', function(err,rows) {
        if (!!err){
            console.log('Erreur')
            return err
        } else{
            res.json("Remise à 0 des votes !")
        }
    })
})

router.post('/raz', async(req,res) => {
    await con.query('UPDATE candidat SET Votes = 0', function(err,rows) {
        if (!!err){
            console.log('Erreur')
            return err
        } else{
            res.json("Remise à 0 des votes !")
        }
    })
})
    
module.exports = router