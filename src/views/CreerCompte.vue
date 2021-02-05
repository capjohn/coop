<template>
    <div class="container">
        <h1>Créer un compte </h1>
        <form v-on:submit.prevent="creerCompte">
            <div>
                <label>Nom et Prénom</label>
                <input v-model="fullname" required type="text" placeholder="Nom">
            </div>
            <div>
                <label>Adresse mail</label>
                <input v-model="email" type="email" required placeholder="Email">
            </div>
            <div>
                <label>Mot de passe</label>
                <input v-model="password" type="password" required placeholder="Mot de passe">
            </div>
            <div>
                <button class="button">Créer mon compte</button>
            </div>
        </form>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                fullname : '',
                email : '',
                password : ''
            }
        },
        methods : {
            creerCompte(){
                api.post('members',{
                    fullname:this.fullname,
                    email:this.email,
                    password:this.password,
                }).then(response =>{
                    alert('Compte crée, vous pouvez vous connecter à coop.');
                    this.$router.push('/se-connecter');
                }).catch(error=> 
                {
                    alert(error.response.data.message);
                })
            }
        }
    }
</script>