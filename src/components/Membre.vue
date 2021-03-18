<template>
    <!-- Affichage du membre avec nom email -->
    <div class="row">
        <div class="column">
            <h4>{{membre.fullname}}</h4>
            <a :href="'mailto:'+membre.email">{{membre.email}}</a>
        </div>
        <div class="column">
            <!-- Route de redirection vers la page de profil de la personne sélectionné -->
            <router-link :to="{name:'Membre',params : {membre_id:membre.id}}" class="button" title="Profil">Voir Profil</router-link> 
            &nbsp;
            <!-- Bouton suppression de l'utilisateur, désactivé pour utilisateur actuellement connecté -->
            <button :disabled="membreConnecte" class="button button-outline" @click="effacerMembre" title="Effacer" id="yellow">X</button>
        </div>
    </div>
</template>

<script>
    export default {
        props : ['membre'],
        computed : {
            membreConnecte() {
                // Récupère l'id de l'utilisateur actuellement connecté
                return this.$store.state.membre.id == this.membre.id
            }
        },
        methods : {
            effacerMembre(){
                // Supprime membre après confirmation de l'utilisateur et affichage d'une alerte après supprimé 
                if(confirm('Voulez vous supprimer le membre '+this.membre.fullname+' ?'))
                {
                    api.delete('members/'+this.membre.id).then(response => {
                        this.$bus.$emit('charger-membres');
                        if(response.data.message)
                        {
                            alert(response.data.message);
                        }
                    }).catch(error => {
                        console.log(error.response.data);
                    });
                }
            }
        }
    }
</script>
<style>
.container{
    padding-top:5em;
}
#yellow{
  color: #D8D076;
}
</style>