<template>
    <div class="jumbotron principal jumbotron-fluid">
        <div class="container">
            <h1 class="display-4">Liste des candidats</h1>
            <p class="lead">Description des candidats suivant leur parti, leurs idées, leurs projets.</p>
        </div>
        <div v-if="typeof(actualNumElec) == 'number'" class="jumbotron candidat jumbotron-fluid">
            <div class="jumbotron jumb1" v-for="candidat in candidats" :key= candidat.ID_candidat>
                <div class="divimg">
                    <img class="img" :src="candidat.Image" alt="">
                </div>
                <div class="descand">
                    <div class="infos">
                        <h3>{{candidat.Prenom}} {{candidat.Nom}}</h3>
                        <p>{{candidat.Parti}}</p>
                    </div>
                    <div class="divbutton">
                        <button class="esp" @click="gotoDesc(candidat.ID_candidat)">en savoir plus</button>
                    </div>
                </div>
            </div>
        </div>


        <div class="jumbotron principal jumbotron-fluid" v-else>
            <h4>Aucune éléction n'a lieu actuellement. Veuillez revenir plus tard.</h4>
            <div class="imgfdv">
            </div>
        </div>
    </div>
</template>

<script>
module.exports = {
    props:{
        candidats: { type: Array, default: []},
        actualNumTour: '',
        actualNumElec: '',
    },
    data(){
        return{

        }
    },
    methods:{
        gotoDesc(candId){
            this.$emit('go-to-desc', candId)
        }
    }
} 
</script>

<style scoped>
h4{
    text-align:center;
}
.principal{
    display: flex;
    flex-flow: column wrap;
}
.container{
    margin-bottom: 30px;
}
.candidat{
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
    margin: auto;
    padding-top: 0;
    width: 90%;
}
.jumb1{
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
    width: 40%;
    border-radius: 20px;
    box-shadow: 0px 0px 12px grey;
}
.imgcand{
    display: flex;
    flex-flow: row wrap;
    justify-content: start;
    margin: none;
    width: 40%;
}
.descand{
    display: flex;
    flex-flow: column wrap;
    min-width: 50%;
    max-width: 60%;
    justify-content: space-between;
}
.infos{
    display: flex;
    flex-flow: column wrap;
}
button{
    font-size: 15px;
    max-width: 140px;
}
.display-4{
    font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    color: blueviolet;
}
.divcand{
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    border-radius: 20px;
    margin-bottom: 10px;
    background-color: rgb(209, 209, 209);
}
.divimg{
    width: 150px;
    height: 150px;
    border-radius: 20px;
    margin: auto;
}
.img{
    width: 100%;
    height: 100%;
    border-radius: 20px;
}
.name{
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    width: 70%;
    height: 100%;
}
.divbutton{
    display: flex;
    justify-content: left;
}
.esp{
    color: cadetblue;
    border: none;
}
.esp:hover{
    color: rgb(77, 136, 138);
    cursor: pointer;
    border: none;
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
</style>
