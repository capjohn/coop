<template>
<div class="log">
    <h1>Se Connecter</h1>
    <form @submit.prevent="connexion">
    <fieldset>
        <div>
            <label>Email</label>
            <input v-model="email" required type="email" placeholder="email" id="yellowChange">
        </div>
        <div>
            <label>Mot de passe</label>
            <input v-model="password" required type="password" placeholder="Mot de passe" id="yellowChange">
        </div>
        <button>Se connecter</button>
        <p><router-link to="/creer-compte">Créer un compte</router-link></p>   
    </fieldset> 
    </form>
</div>
</template>

<script>
export default {
    data(){
        return{
            email: '',
            password: ''
        }
    },
    methods:
    {
        connexion()
        {
            api.post('members/signin',
            {
                email: this.email,
                password: this.password
            }).then(response =>
            {
                this.$store.commit('setMembre',response.data.member);
                this.$store.commit('setToken',response.data.token);
                alert('Vous êtes maintenant connecté');
                console.log(response.data); //contenu des data
                this.$router.push('/');
            }).catch(error=>
            {
                alert(error.response.data.message); //Contenu de de l'erreur
            })
        }
    }
}
</script>
<style>
button {
    background-color:#D8D076;
}
a {
    color: #D8D076;
}
.log{
      position: relative;
  margin: 30px auto;
  padding: 20px 20px 20px;
  width: 340px;
  background: white;
  border-radius: 3px;
  -webkit-box-shadow: 0 0 200px rgba(255, 255, 255, 0.5), 0 1px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0 0 200px rgba(255, 255, 255, 0.5), 0 1px 2px rgba(0, 0, 0, 0.3);
}
#yellowChange:focus{
    border-color: #D8D076;
}
</style>