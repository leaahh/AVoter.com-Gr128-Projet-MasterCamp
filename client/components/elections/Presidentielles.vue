<template>
    <div>
        <div class="container">
            <h1 class="display-4">Elections Présidentielles</h1>
        </div>
        
        <div v-if="actualNumElec == 1">
            <div class="jumbotron principal jumbotron-fluid" v-if="actualNumTour == 1">
                <div class="jumbotron candidat" v-if="submitted != true">
                    <p class="lead">Elections du premier tour (1 vote seulement) : </p>
                    <div class="votecand" v-for="candidat in candidats" :key="candidat.ID_candidat">
                        <h3>{{candidat.Prenom}} {{candidat.Nom}}</h3>
                        <div class="btn_v">
                            <button class="btn line btn-lg active" @click="gotoDesc(candidat.ID_candidat)" role="button" aria-pressed="true">Informations</button>
                            <button :disabled='vote' @click="voter(candidat.ID_candidat)" class="btn line btn-lg active" role="button" aria-pressed="true">Voter</button>
                        </div>
                    </div>
                    <div v-if="vote" class="vavp">
                        <p>Vous avez voté pour le candidat : </p>
                        <p><strong>{{candidats[actualIndex].Prenom}} {{candidats[actualIndex].Nom}}</strong></p>
                        <p>Souhaitez vous soumettre votre choix ?</p>
                    </div>
                    <div class="soumettre">
                        <button :disabled='!vote' @click="submit()" class="btn btnline btn-lg active" role="button" aria-pressed="true">Soumettre</button>
                        <button :disabled='!vote' @click="annuler()" class="btn line btn-lg active" role="button" aria-pressed="true">Annuler</button>
                    </div>
                </div>
                <div class="jumbotron" v-else>
                    <h4>Merci d'avoir voté. Plus qu'à voter pour le second tour. </h4>
                    <div class="imgfdv">
                    </div>
                </div>
            </div>
            <div class="jumbotron principal jumbotron-fluid" v-else>
                <div class="jumbotron candidat" v-if="submitted != true">
                    <p class="lead">Elections du second tour (1 vote seulement)</p>
                    <div class="votecand" v-for="candidat in candidats" :key="candidat.ID_candidat">
                        <h3>{{candidat.Prenom}} {{candidat.Nom}}</h3>
                        <div class="btn_v">
                            <button class="btn line btn-lg active" @click="gotoDesc(candidat.ID_candidat)" role="button" aria-pressed="true">Informations</button>
                            <button :disabled='vote' @click="voter(candidat.ID_candidat)" class="btn line btn-lg active" role="button" aria-pressed="true">Voter</button>
                        </div>
                    </div>
                    <div v-if="vote" class="vavp">
                        <p>Vous avez voté pour le candidat : </p>
                        <p><strong>{{candidats[actualIndex].Prenom}} {{candidats[actualIndex].Nom}}</strong></p>
                        <p>Souhaitez vous soumettre votre choix ?</p>
                    </div>
                    <div class="soumettre">
                        <button :disabled='!vote' @click="submit()" class="btn btnline btn-lg active" role="button" aria-pressed="true">Soumettre</button>
                        <button :disabled='!vote' @click="annuler()" class="btn line btn-lg active" role="button" aria-pressed="true">Annuler</button>
                    </div>
                </div>
                <div class="jumbotron" v-else>
                    <h4>Merci d'avoir voté.</h4>
                    <div class="imgfdv">
                    </div>
                </div>
            </div>
        </div>
        <div class="jumbotron principal jumbotron-fluid" v-else>
            <h4>Les élections présidentielles ne sont pas d'actualités. Veuillez revenir plus tard.</h4>
            <div class="imgfdv">
            </div>
        </div>
    </div>
</template>

<script>
//const ConnexionVue=require("../connexion/Connexion.vue")

module.exports = {
    props: {
        candidats: { type: Array, default: []},
        votants: { type: Array, default: []},
        submitted: Boolean,
        actualNumTour: Number,
        actualNumElec: Number,
        connect: { type: Boolean },
    },
    data(){
        return{
            vote: false,
            actualCand: '',
            actualIndex: ''
        }
    },
    methods:{
        voter(candId){
            if (this.connect != false){
                this.vote = true
                this.actualCand = candId
                this.actualIndex = this.candidats.findIndex(a => a.ID_candidat === candId)
            }
            else{
                alert("Vous devez d'abord vous connecter à une session")
                router.push({path: '/connexion'})
            }
        },
        submit(){
            console.log('presidentielles vue debut')
            this.$emit('submit', this.actualCand)
            console.log('presidentielles vue fin')

        },
        annuler(){
            this.vote = false
            this.actualCand = ''
        },
        gotoDesc(candId){
            this.$emit('go-to-desc', candId)
        }
    }
}
</script>


<style scoped>
.principal{
    display: flex;
    flex-flow: column wrap;
}
.vavp{
    display: flex;
    flex-flow: column wrap;
    margin: auto;
    text-align: center;
}
.display-4{
    font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    color:  rgb(82, 82, 252);
    margin-bottom: 20px;
}
.btn{
    color: white;
}
h3{
    margin-left: 20px;
}
h4{
    text-align: center;
}
.candidat{
    display: flex;
    flex-flow: row wrap;
    margin: auto;
    padding: none;
    justify-content: space-between;
    padding-bottom: 30px;
    width: 80%;
}
.votecand{
    display:flex;
    flex-flow: row wrap;
    justify-content: space-between;
    padding-top: 20px;
    padding-bottom: 20px;
    margin-bottom: 30px;
    width: 100%;
    background-color:	#eee;
    border-radius: 20px;
    border: 1px solid rgb(189, 189, 189);
    padding-right: 20px;
}
.votecand:hover{
    box-shadow: 0px 0px 6px grey;
}
button{
    font-size: 15px;
}
.soumettre{
    margin-top: 50px;
    width: 100%;
    text-align: center;
}
.imgfdv{
    display: flex;
    flex-flow: column wrap;
    justify-content: space-around;
    width: 200px;
    height: 200px;
    margin: auto;
    margin-top: 50px;
    background-image: url('../../images/imagevote.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
.container{
    margin-top: 50px;
    margin-bottom: 50px;
}
</style>