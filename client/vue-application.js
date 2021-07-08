const Home = window.httpVueLoader('./components/Home.vue')
const Candidats = window.httpVueLoader('./components/Candidats.vue')
const Connexion = window.httpVueLoader('./components/connexion/Connexion.vue')
const Inscription = window.httpVueLoader('./components/connexion/Inscription.vue')
const DescCand = window.httpVueLoader('./components/DescCands.vue')
const Actualités = window.httpVueLoader('./components/actus/Actualite.vue')
const Presid = window.httpVueLoader('./components/elections/Presidentielles.vue')
const Region = window.httpVueLoader('./components/elections/Regionales.vue')
const MonCompte = window.httpVueLoader('./components/connexion/MonCompte.vue')

const routes = [
  { path: '/', component: Home },
  { path: '/candidats', component: Candidats },
  { path: '/elections/presidentielles', component: Presid },
  { path: '/elections/regionales', component: Region },
  { path: '/me', component: MonCompte },
  { path: '/connexion', component: Connexion },
  { path: '/inscription', component: Inscription },
  { path: '/candidats/:nameCand', component: DescCand },
  { path: '/actualites/:id', component: Actualités }
]

const router = new VueRouter({
  routes
})

var app = new Vue({
  router,
  el: '#app',
  data: {
    dates_elecs: [],
    candidats: [],
    membres: [],
    actualites: [],
    tours: [],
    votants: [],

    actualIndex: '',
    candId: '',
    nameCand: '',
    candIndex: '',

    actuId: '',
    actuIndex: '',
    
    actualNumTour: '',
    actualNumElec: '',
    actualIdTour : '',

    submitted: false,

    error:'',
    user:{
      id_votant:{type:Number},
      prenom:'', nom:'', tel:'', email:'', 
      naissance:{type:Date}, /*fichier:'',*/ statut:{type:Boolean}, A_vote:{type:Boolean}
    },
    connect:false
  },

  async mounted (){
    const res = await axios.get('/api/tours')
    this.tours = res.data

    var date = new Date()

    for (i=0; i<this.tours.length;i++){
      début_tour = new Date(this.tours[i].début_tour)
      if (début_tour <= date && this.tours[i].termine == 0){
        this.actualNumTour = this.tours[i].Num_tour
        this.actualNumElec = this.tours[i].ID_election
        this.actualIdTour = this.tours[i].ID_tour    
        break
      }
    }

    const res1 = await axios.get('/api/candidats', { params: { 
      numelec: this.actualNumElec, numtour: this.actualNumTour 
    } })
    this.candidats = res1.data

    const res3 = await axios.get('/api/actualites')
    this.actualites = res3.data

    const res4 = await axios.get('/api/votants')
    this.votants = res4.data
    
    for (i=0;i<this.votants.length;i++){
      if (this.votants[i].Statut == 1){
        this.user.id_votant = this.votants[i].ID_votant
        this.connect = true
        this.actualIndex = this.votants.findIndex(a => a.ID_votant === this.user.id_votant)
        if (this.votants[i].A_vote == 1){
          this.submitted = true
        }
      }
    }
    
    const res8 = await axios.get('/api/votant', { params: { statut : 1 } })
    this.user = res8.data

    i=0
    if (router.currentRoute.params.nameCand != null){
      this.nameCand = router.currentRoute.params.nameCand
      while (this.candidats[i].Nom != this.nameCand){
        i++;
      }
      this.candId = this.candidats[i].ID_candidat
      this.candIndex = this.candidats.findIndex(a => a.ID_candidat === this.candId)
    }

    i=0
    if (router.currentRoute.params.id != null){
      this.actuId = parseInt(router.currentRoute.params.id)
      while (this.actualites[i].id_actualite != this.actuId){
        i++;
      }
      this.actuIndex = this.actualites.findIndex(a => a.id_actualite == this.actuId)
    }

    for (i=0; i<this.tours.length;i++){
      fin_tour = new Date(this.tours[i].fin_tour)
      if (date >= fin_tour && this.tours[i].termine == 0 && this.tours[i].Num_tour == 1){
        i=0
        while (i < 2){
          const reponse = await axios.get('api/max_id')
          const max_id = reponse.data
          await axios.post('/api/second_tour', {id: max_id[0].ID_candidat})
          await axios.post('/api/setvote', {id: max_id[0].ID_candidat})
          i++
        }
        await axios.post('/api/decompte_tour', {id_tour: this.actualIdTour})
        const res6 = await axios.get('/api/tours')
        this.tours = res6.data
        await axios.post('/api/raz')
        await axios.post('/api/reset_vote')
        this.actualNumTour = ''
        this.actualNumElec = ''
        break
      }
      else if (date >= fin_tour && this.tours[i].termine == 0 && this.tours[i].Num_tour == 2){
        i=0
        while (i < 1){
          const reponse = await axios.get('api/max_id')
          const max_id = reponse.data
          await axios.post('/api/gagnant', {id: max_id[0].ID_candidat, numel: this.actualNumElec})
          i++
        }
        await axios.post('/api/decompte_tour', {id_tour: this.actualIdTour})
        const res6 = await axios.get('/api/tours')
        this.tours = res6.data
        await axios.post('/api/raz')
        await axios.post('/api/reset_vote')
        this.actualNumTour = ''
        this.actualNumElec = ''
        break
      }
    }

    try{
      const res7 = await axios.get('/api/me',{ params: { email: this.user.email} })
      this.user = res7.data
      this.connect = true
    }
    catch(err){
      if(err.response?.status === 401 || err.response?.status === 400){
        this.connect=false
      } else{
        console.log('error', err)
      }
    }
  },

  methods: {
    alert_conn(){ alert("Vous devez vous connecter pour accéder à cette page.") },

    async inscription(user){
      const res = await axios.post('/api/inscription',user) 

      if(res.data.message != "L'utilisateur a bien été enregistré"){
        this.error = res.data.message
        return
      }
      
      this.user.id_votant = res.data.user.id_votant
      this.user.prenom = res.data.user.prenom
      this.user.nom = res.data.user.nom
      this.user.tel = res.data.user.tel
      this.user.email = res.data.user.email
      this.user.naissance = res.data.user.naissance
      
      this.$router.push('/')
      
      this.connect = true
      this.error = null

      window.location.reload()
    }, 

    async connexion(user){
      const res = await axios.post('/api/connexion',user)

      if(res.data.message != 'Utilisateur connecté.e'){
        this.error = res.data.message
        return
      } 

      this.user.id_votant = res.data.user.id_votant
      this.user.nom = res.data.user.nom
      this.user.prenom = res.data.user.prenom
      this.user.tel = res.data.user.tel
      this.user.email = res.data.user.email
      this.user.naissance = res.data.user.naissance

      this.$router.push('/')

      this.connect = true
      this.error = null

      window.location.reload()
    },

    async deco(email){
      const res = await axios.post("/api/me",email)
      this.connect = false
      this.$router.push('/')
    },

    gotoDesc(candId){
      this.candId = candId
      this.candIndex = this.candidats.findIndex(a => a.ID_candidat === candId)
      this.nameCand = this.candidats[this.candIndex].Nom
      router.push('/candidats/' + this.nameCand)
    },

    gotoActu(id){
      this.actuId = id
      this.actuIndex = this.actualites.findIndex(a => a.id_actualite == id)
      router.push('/actualites/' + id)
    },

    async submit(actualCand){
      this.candId = actualCand

      this.candIndex = this.candidats.findIndex(a => a.ID_candidat === actualCand)
      
      await axios.post('/api/vote', {id: actualCand})
      const res = await axios.post('/api/recup_vote', {id: actualCand})
      this.candidats[this.candIndex].votes = res.data
      
      await axios.post('/api/a_vote', {id: this.user.id_votant})
      const res2 = await axios.post('/api/recup_a_vote', {id: this.user.id_votant})
      this.votants[this.actualIndex].A_vote = res2.data
      
      if(this.votants[this.actualIndex].A_vote == 1){
        this.submitted = true
      }
      
      window.location.reload()
    },
  }
})
