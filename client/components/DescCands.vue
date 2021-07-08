<template>
    <div>
        <div class="jumbotron entete jumbotron-fluid">
            <div class="imgcand">
                <img class="img" :src="candidats[candIndex].Image" alt="">
            </div>
            <div class="name">
                <h1 class="nomprenom">{{candidats[candIndex].Prenom}} {{candidats[candIndex].Nom}}</h1>
            </div>
        </div>
        <div class="jumbotron jumbotron-fluid">
            <div class="container">
                <h1 class="display-4">Date de Naissance</h1>
                <p class="lead">{{candidats[candIndex].Date_naissance}}</p>
            </div>
            <div class="container">
                <h1 class="display-4">Parti</h1>
                <p class="lead">{{candidats[candIndex].Parti}}</p>
            </div>
            <div class="container">
                <h1 class="display-4">Description</h1>
                <p class="lead">{{candidats[candIndex].Description}}</p>
            </div>
        </div>
    </div>
</template>

<script>
module.exports = {
    props:{
        candidats: { type: Array, default: []},
        candId: Number,
        nameCand: String,
        candIndex: Number
    },
    data(){
        return{
        }
    },
    methods:{
    }
} 
</script>

<style scoped>
.entete{
    display: flex;
    flex-flow: column wrap;
    justify-content: space-around;
    margin: 0;
    background-image: url('../images/pagedefond.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
.imgcand{
    width: 200px;
    height: 200px;
    border-radius: 100px;
    margin: auto;
}
.name{
    margin: auto;
}
.nomprenom{
    color: rgb(255, 255, 255);
}
.container{
    padding-bottom: 50px;
}
.img{
    width: 100%;
    height: 100%;
    border-radius: 100px;
    box-shadow: 0px 0px 100px white;
    border: 5px solid white;
}
</style>