<template>
    <div class="content-account">
      <br>
      <h2>Informations personnelles</h2>
      <h3>Bienvenue {{user.prenom}} {{user.nom}}</h3>

      <div id="input-account">
        <p>Email   
          <input type="text" v-model="user.email" disabled/>
        </p>
        
        <p>Numéro de téléphone  
          <input type="text" v-model="user.tel" disabled/>
        </p>
      </div>
      
      <a href="mailto:avoter.gouv@gmail.com?subject=Changements - informations - Avoter.com">
        Vous voulez changer une information ? Contacter-nous
      </a>
      
      <br><br>
        <button class="btn-deco" @click="deco">Deconnexion</button>
      <br>
    </div>
</template>

<script>
module.exports = {
  props: {
    user: {type:Object},
    connect: { type: Boolean }
  },
  data () {
    return {
      
    }
  },
  methods: {
    //deconnexion
    deco(){
      console.log(this.user.email)
      this.$emit('deco',{email:this.user.email})
    },
  }
}
</script>

<style scoped>

.content-account{
  width: 60%;
  margin: auto;
  display: flex;
  flex-direction: column;
}

h2{
  font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  color: rgb(82, 82, 252);
  text-align: left;
  margin-left:10%;
  margin-bottom: 20px;
}

h3{
  padding: 20px;
  font-size: x-large;
}

p{
  text-align: right;
}

.content-account a{
  text-align: center;
  margin: 30px;
}

#input-account{
  margin: auto;
  width: 55%;
}

.article-img div {
  width: 100px;
  height: 100px;
  background-size: cover;
}

.btn-deco{
  margin: auto;
  border :none;
  background-color: rgb(140, 140, 165);
  color: white;
}

</style>