<template>
    <div>
        <div class="first_elem">
            <div class="jumbotron jumb1 jumbotron-fluid">
                <div class="container1">
                    <h1 class="display-3">
                        <strong class="titre">À Voter :</strong> 
                        <strong>site numéro 1 des votes sécurisés</strong>
                    </h1>
                </div>
            </div>
            <div class="jumbotron jumb2 jumbotron-fluid">
                <div class="container2">
                    <div class="info">
                        <h3 class="h3css">Découvrez les actualités politiques et les élections à venir dans votre région :</h3>
                        <div class="carouss">
                            <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                                <ol class="carousel-indicators">
                                    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                                </ol>
                                <div class="carousel-inner">
                                    <div class="carousel-item active" @click="gotoActu(actualites[0].id_actualite)">
                                        <h5>{{actualites[0].nom}}</h5>
                                        <div class="test" :style="fond(actualites[0].image)"></div>
                                    </div>
                                    <div class="carousel-item" @click="gotoActu(actualites[1].id_actualite)">
                                        <h5>{{actualites[1].nom}}</h5>
                                        <div class="test" :style="fond(actualites[1].image)"></div>
                                    </div>
                                    <div class="carousel-item" @click="gotoActu(actualites[2].id_actualite)">
                                        <h5>{{actualites[2].nom}}</h5>
                                        <div class="test" :style="fond(actualites[2].image)"></div>
                                    </div>
                                </div>
                                <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="sr-only">Previous</span>
                                </a>
                                <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="sr-only">Next</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="second_elem">
            <div class="jumbotron jumb3 jumbotron-fluid">
                <div class="container3">
                    <h3 class="para">
                        Les 3 étapes à suivre pour voter :
                    </h3>
                </div>
                <div class="etapes">
                    <div class="etape1">
                        <div class="number">
                            <p>1</p>
                        </div>
                        <div class="text">
                            <p><strong>Connectez-vous</strong></p>
                        </div>
                    </div>
                    <div class="etape2">
                        <div class="number">
                            <p>2</p>
                        </div>
                        <div class="text">
                            <p><strong>Visitez la page description des candidats</strong></p>
                        </div>
                    </div>
                    <div class="etape3">
                        <div class="number">
                            <p>3</p>
                        </div>
                        <div class="text">
                            <p><strong>Votez !</strong></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <footer>
            <div class="jumbotron jumb4 jumbotron-fluid">
            <div class="container">
                <h1 class="display-5"><strong>Tous les votes à portée de main avec À Voter</strong></h1>
                <p class="lead">Retrouvez les actualités et les descriptions des candidats</p>

                <a href="mailto:avoter.gouv@gmail.com?subject=Changements - informations - Avoter.com">
                    Pour plus d'informations, contactez-nous !
                </a>
            </div>
            </div>
        </footer>
    </div>
</template>

<script>
module.exports = {
    props: {
        actualites: {type: Array, default: []},
    },
    data(){
        return{

        }
    },
    methods:{
        gotoActu(id){
            this.$emit('go-to-actu',id)
        },
        fond(image){
            return ("backgroundImage : url(" + image + ")")
        }
    }
}
</script>

<style scoped>
.first_elem{
    display: flex;
    flex-flow: row wrap;
}
.container1{
    margin-left: 20px;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
}
.jumbotron-fluid{
    margin: 0;
}
.container2{
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
}
.container3{
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
}
.para{
    margin: auto;
}
.d-block{
    margin: 0;
}
.etapes{
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
    margin: auto;
    margin-top: 50px;
    max-width: 800px;
}
.etape1{
    display: flex;
    flex-flow: column wrap;
    background-color: rgb(153, 223, 223);
    width: 150px;
    height: 180px;
    border-radius: 20px;
}
.etape2{
    display: flex;
    flex-flow: column wrap;
    padding-top: 14px;
    background-color: rgb(253, 220, 225);
    width: 150px;
    height: 180px;
    border-radius: 20px;
}
.etape3{
    display: flex;
    flex-flow: column wrap;
    background-color: rgb(247, 247, 202);
    width: 150px;
    height: 180px;
    border-radius: 20px;
}
.number{
    width: 50px;
    height: 50px;
    margin: auto;
    color: white;
    text-align: center;
    font-size: 28px;
    background-color: black;
    border-radius: 30px;
}
.text{
    margin: auto;
    text-align: center;
}
.display-3{
    font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    margin: auto;
}
.carouss{
    margin: 50px;
}
.jumbotron-fluid{
    margin: none;
    padding: none;
}
.jumb1{
    display: flex;
    flex-flow: row wrap;
    text-align: start;
    width: 50%;
    
}
.jumb2{
    display: flex;
    flex-flow: column wrap;
    text-align: center;
    justify-content: space-around;
    width: 50%;
    padding-bottom: 10px;
}
.jumb3{
    padding-top: 0;
}
.jumb4{
    display: flex;
    flex-flow: column wrap;
    text-align: center;
    justify-content: space-around;
    background-color: rgb(247, 247, 202);
}
.h3css{
    color: rgb(2, 2, 175);
    font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
.carousel-item{
    height: 250px;
}
.carousel{
    margin-left: 20px;
    margin-right: 20px;
}
h2{
    padding-top: 20px;
    padding-bottom: 20px;
    margin-left: 20px;
}
.info{
    margin: auto;
    margin-top: 20px;
}
.titre{
    color: blueviolet;
}
h5{
    position: absolute;
    color: black;
}
.test{
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    margin: 0;
    opacity: 0.5;
}
.carousel-item:hover{
    cursor: pointer;
}
</style>