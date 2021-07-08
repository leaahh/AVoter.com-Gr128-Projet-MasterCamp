<template>
    <div>
        <div class="jumbotron jumbotron-fluid">
            <div class="container">
                <h1 class="display-4">{{actualites[actuIndex].nom}}</h1>
            </div>
            <div class="contain">
                <div class="imgactu" :style="styleImg(actualites[actuIndex].image)">
                </div>
                <div class="contents">
                    <p class="lead">{{actualites[actuIndex].description}}</p>
                    <div class="url">
                        <p class="lead">Retrouvez plus d'informations sur :</p>
                        <a :href="actualites[actuIndex].url">{{actualites[actuIndex].url}}</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
module.exports = {
    props: {
        actualites: {type: Array, default: []},
        actuId: Number,
        actuIndex : Number
    },
    data(){
        return{}
    },
    methods:{
        styleImg(img){
            return ("backgroundImage: url(" + img + ")")
        }
    }
}
</script>

<style scoped>
.display-4{
    margin-bottom: 50px;
}
.contain{
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    max-width: 80%;
    min-height: 500px;
    margin: auto;
}
.imgactu{
    width: 50%;
    min-height: 100%;
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
.contents{
    display: flex;
    flex-flow: column wrap;
    justify-content: space-between;
    width: 45%;
}
</style>
