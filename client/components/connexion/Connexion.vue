<template>
    <div class="contain">
        <div class="jumbotron jumb1 jumbotron-fluid">
            <div class="container">
                <h1 class="display-4">Connexion</h1>

                <p  class="error">{{error}}</p>

                <form @submit.prevent="connexion()">
                    <div class="form-group">
                        <label for="exampleInputEmail1">Adresse e-mail : </label>
                        <input required type="email" class="form-control" v-model="email" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Ex : adriendupond@gmail.com">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Mot de passe</label>
                        <input required type="password" class="form-control" v-model="password" id="exampleInputPassword1" placeholder="Ex : AdrDp#156c8">
                    </div>
                    <div class="submit">
                        <button type="submit" class="btn">Connexion</button>
                    </div>
                </form>
            </div>
        </div>
        <div class="jumbotron jumb2 jumbotron-fluid">
            <div class="centrer">
                <div class="circle">
                    <div class="contents">
                        <h4>Si vous n'avez pas encore de compte</h4>
                        <hr>
                        <button class="btn btn-primary">
                        <router-link class="créerAccount" to='/inscription'>Créer un compte</router-link>
                        </button>
                    </div>
                </div>
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

    data(){
        return{
            email: '',
            password: '',
        }
    },

    methods: {
        async connexion() {
            this.$emit('connexion', {
                email: this.email,
                password: this.password
            })
        }
    }
}
</script>


<style scoped>
.error{
    color:red;
    font-size: large;
    text-align: center;
}
.contain{
    display: flex;
    flex-flow: row wrap;
    margin: 0;
    padding: auto;
    height: 100%;
}
.jumbotron-fluid{
    margin: 0;
}
.display-4{
    font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    color: rgb(82, 82, 252);
    text-align: center;
    margin-bottom: 20px;
}
.btn{
    background-color:  rgb(82, 82, 252);
    color: white;
}
.jumb1{
    display: flex;
    justify-content:space-around;
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
form{
    margin:auto;
    max-width: 500px;
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