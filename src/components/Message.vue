<template>
    <main>
        <!-- Affichage de l'avatar et du nom avec lien de l'utilisateur et date du message -->
        <img :src="avatar">
        <div class="message">
            <header>
                <div>
                    <router-link :to="{name:'Membre',params : {membre_id:membre.id}}">
                        {{membre.fullname}}
                    </router-link>
                     <time>{{dateMessage}}</time>

    <!-- Si l'utilisateur actuel est l'auteur du message et clic sur "..." affichage d'un menu déroulant avec Modifier ou Supprimer le message -->
                    <span v-if="message.member_id == this.$store.state.membre.id">
                        <li class="dropdown">
                            <a class="dropbtn" v-on:click.prevent="showDropDown=!showDropDown">...</a>
                            <div v-if="showDropDown" class="dropdown-content">
                                <a @click='modif=!modif' id='blak'>Modifier</a>
                                <a @click='supprimerMessage' id='blak'>Supprimer</a>
                            </div>
                        </li>
                    </span>
                </div>
            </header>
            <!-- Si Modifier a été actionné, affichage du bandeau de modification message -->
            <form v-if="modif" @submit.prevent="modifierMessage">
                <div class ="row">
                    <div class="column">
                        <input v-model="messageContent" required type="text" placeholder="Modification message ..."/>
                    </div>
                </div>
                <button class="button button-small">Enregistrer</button>
                <button type="button" @click="this.modif=false;" class="button button-clear" id='yellow'>Annuler</button>
            </form>

            <!-- Sinon Affichage du message  -->
            <span v-else>{{message.message}}</span>
            <!-- Si l'utilisateur se trouve sur la page de profil d'un utilisateur avec sa liste d'ancien message, lien vers la conversation d'origine -->
            <div class="conversation" v-if="message.conversation">
                Présent dans <b><router-link :to="{name:'Conversation',params:{id:message.conversation.id}}">{{message.conversation.topic}}</router-link></b>
            </div>
        </div>
    </main>
</template>
<script>
    export default {
        data(){
            return{
                conversation:false,
                showDropDown: false,
                message : '',
                messages : [],
                modif : false,
                messageContent : ''
            }
        },
        mounted(){
            this.messageContent = this.message.message;
        },
        methods : {
            // Modification du message dans l'API et remplace le contenu de l'actuel message affiché, fermeture du bandeau modifier
            modifierMessage()
            {
                api.put(`channels/${this.message.channel_id}/posts/${this.message.id}`,{message:this.
                messageContent}).then(response =>{
                    this.message.message = response.data.message;
                    this.modif=false;
                })
            },
            // Supression du message dans l'API après confirmation puis rechargement des messages
            supprimerMessage(){
                if(confirm('Voulez vous vraiment supprimer ce message ?')){
                    api.delete(`channels/${this.message.channel_id}/posts/${this.message.id}`).then(response =>{
                        this.$bus.$emit('charger-messages');
                    })
                }
            }
        },
        props: ['message','conversation'],
        computed: {
            membre(){
                return this.$store.getters.getMembre(this.message.member_id);
            },
            // Changement du format de la date
            dateMessage(){
                let options = {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'};
                return new Date(this.message.created_at).toLocaleDateString('fr-FR', options);
            },
            // Permet de récupérer un avatar a partir du site robohash ainsi qu'en utilisant un hachage md5 sur l'email du membre
            avatar(){
                return 'https://robohash.org/'+md5(this.membre.email)+'?set=set4&bgset=&size=400x400'
            }
        }
    }
</script>
<style lang="scss">
    .message{
        background: #e7e5da;
        padding: 1em;
        margin: 1em 0;
        border-radius: 15px;
        max-width: max-content;
        display :inline-block;
        header{
            font-size: 80%;
            border-bottom: 1px solid grey;
        }
    }
    .messages{
        margin-bottom: 3em;
    }
    .conversation{
        font-size: 60%;

    }
    img{
        width: 64px;
        height: 64px;
        border-radius: 50%;
        display:inline-block;
    }
    .menu{
        list-style: none;
    }
    .button-small {
    font-size: .8rem;
    height: 2.8rem;
    line-height: 2.8rem;
    padding: 0 1.5rem;
    }
    li a, .dropbtn {
    display: inline-block;
    text-align: center;
    padding: 2px 16px;
    text-decoration: none;
    border-radius: 15px;
    color: black;
    font-size: 1.1em;
    }

    li a:hover, .dropdown:hover .dropbtn {
    background-color: #dfdabf;
    }

    li.dropdown {
    display: inline-block;
    }

    .dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
    border-radius: 15px;

    }

    #blak{
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    text-align: center;
    }

    .blak:hover {background-color: #dfdabf;}

    .dropdown:hover .dropdown-content {
    display: block;
    }
    #yellow{
          color: #D8D076;
    }
</style>