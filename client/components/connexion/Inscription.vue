<template>
    <div class="contain">
        <div class="jumbotron jumb1 jumbotron-fluid">
            <div class="container">
                <h1 class="display-4">Inscription</h1>

                <p  class="error">{{error}}</p>

                <form @submit.prevent="inscription()">
                    <div class="anr">

                        <div class="form-content">
                        <div class="form-group">
                                <label for="exampleInputNom">Nom : </label>
                                <input required type="text" class="form-control" v-model="nom" id="exampleInputNom" aria-describedby="nomHelp" placeholder="Ex : Dupond">
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPrenom">Prenom :</label>
                                <input required type="text" class="form-control" v-model="prenom" id="exampleInputPrenom" placeholder="Ex : Adrien">
                            </div>
                            <div class="form-group">
                                <label for="exampleInputNaissance">Date de naissance :</label>
                                <input required type="date" class="form-control" v-model="naissance" id="exampleInputNaissance" placeholder="Ex : JJ/MM/AAAA">
                            </div>
                            <div class="form-group">
                                <label for="exampleInputTelephone">Numéro de téléphone : </label>
                                <input required type="tel" class="form-control" v-model="tel" id="exampleInputTelephone" placeholder="Ex : 0102030405">
                            </div>
                            <div class="form-group">
                                <label for="exampleInputEmail2">Adresse e-mail : </label>
                                <input required type="email" class="form-control" v-model="email" id="exampleInputEmail2" aria-describedby="emailHelp1" placeholder="Ex : adriendupond@gmail.com">
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword2">Mot de passe :</label>
                                <input required type="password" class="form-control" v-model="password" id="exampleInputPassword2" placeholder="Ex : AdrDp#156c8">
                            </div>
                        </div>
                        

                        <div class="jumbotron jumb2 jumbotron-fluid">
                            <div class="centrer">
                                <div class="circle">
                                    <div class="contents">
                                        <h4>Importez votre fichier (CNI/Passeport/Permis de conduire) </h4>
                                        <hr>
                                        <input required type="file" accept=".pdf" @change="getFile"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    


                    <div class="submit">
                        <button type="submit" class="btn">Créer mon compte</button>
                    </div>
                </form>
            </div>
        </div>
        
        
        
        
    </div>
</template>


<script>
module.exports = {
    props: {
        user: {type:Object},
        connect: { type: Boolean },
        error:{type:String}
    },

    mounted:function(){
        this.error = null
    },

    data () {
        return {
            nom:'',
            prenom:'',
            naissance:'',
            tel:'',
            email: '',
            password: '',
            fichier:''
        }
    },
    
    methods: {
        getFile(obj){
            var url = URL.createObjectURL(obj.target.files[0])
            this.fichier = url
        },

        async inscription() {
            this.$emit('inscription', {
                prenom: this.prenom,
                nom: this.nom,
                naissance : this.naissance,
                tel:this.tel,
                email: this.email,
                password: this.password,
                fichier: this.fichier
            })
        },
    }
}
</script>


<style scoped>
.error{
    color:red;
    font-size: large;
    text-align: center;
}

.router{
    color:blueviolet;
    font-size: large;
    text-align: center;
}

.contain{
    display: flex;
    flex-flow: row wrap;
    margin: 0;
    padding: auto;
    height: 100%;
    /*border: 1px solid black;*/
}
.jumbotron-fluid{
    margin: 0;
}
.display-4{
    font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    color: rgb(82, 82, 252);
    text-align: left;
    margin-left:10%;
    margin-bottom: 20px;
}
.btn{
    background-color:  rgb(82, 82, 252);
    color: white;
}

.jumb1{
    display: flex;
    /*justify-content:space-around;*/
    width: 100%;
    flex-direction: column;
}

.form-content{
    width: 50%;
}

.jumb2{
    display: flex;
    justify-content:space-around;
    width: 50%;
}
.centrer{
    display: flex;
    justify-content:space-around;
    margin: auto;
    width: 400px;
    height: 400px;
}
.circle{
    display: flex;
    justify-content:space-around;
    margin: auto;
    width: 80%;
    height: 80%;
    border-radius: 300px;
    box-shadow: 0px 0px 12px rgb(199, 155, 74);
    background-color: rgb(255, 230, 184);
}
.submit{
    margin-top: 30px;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
}
.newMember:hover{
    text-decoration: none;
}

.anr {
    display: flex;
}

form{
    margin:auto;
    /*max-width: 500px;*/
}

.anr div {
    flex-direction: column;
}
.container{
    margin: auto;
}
.créerAccount{
  color: white;
}
.créerAccount:hover{
  color: white;
  text-decoration: none;
}
.contents{
    margin: auto;
    margin-left: 20px;
    margin-right: 20px;
    text-align: center;
}
hr{
    width: 80%;
}
</style>