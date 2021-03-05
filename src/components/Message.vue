<<<<<<< HEAD
<template>
    <main>
        <img :src="avatar">
        <div class="message">
            <header>
                <div>
                    <b>{{membre.fullname}}</b> <time>{{dateMessage}}</time>
                    <span v-if="message.member_id == this.$store.state.membre.id">
                        <li class="dropdown">
                            <a class="dropbtn" v-on:click.prevent="showDropDown=!showDropDown">...</a>
                            <div v-if="showDropDown" class="dropdown-content">
                                <a @click='modif=!modif'>Modifier</a>
                                <a @click='supprimerMessage'>Supprimer</a>
                            </div>
                        </li>
                    </span>
                </div>
            </header>

            <form v-if="modif" @submit.prevent="modifierMessage">
                <div class ="row">
                    <div class="column">
                        <input v-model="messageContent" required type="text" placeholder="Modification message ..."/>
                    </div>
                </div>
                <button class="button button-small">Enregistrer</button>
            </form>

            <span v-else>{{message.message}}</span>
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
            modifierMessage()
            {
                api.put(`channels/${this.message.channel_id}/posts/${this.message.id}`,{message:this.
                messageContent}).then(response =>{
                    this.message.message = response.data.message;
                    this.modif=false;
                })
            },
            supprimerMessage(){
                if(confirm('Voulez vous vraiment supprimer ce message ?')){
                    api.delete(`channels/${this.message.channel_id}/posts/${this.message.id}`).then(response =>{
                        location.reload();
                    })
                }
            }
        },
        props: ['message','conversation'],
        computed: {
            membre(){
                return this.$store.getters.getMembre(this.message.member_id);
            },
            dateMessage(){
                let options = {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'};
                return new Date(this.message.created_at).toLocaleDateString('fr-FR', options);
            },
            avatar(){
                return 'https://robohash.org/'+md5(this.membre.email)+'?set=set4&bgset=&size=400x400'
            }
        }
    }
</script>
<style lang="scss">
    .message{
        background: rgb(238, 238, 238);
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
    }

    li a:hover, .dropdown:hover .dropbtn {
    background-color: lightgray;
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

    .dropdown-content a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    text-align: center;
    }

    .dropdown-content a:hover {background-color: #f1f1f1;}

    .dropdown:hover .dropdown-content {
    display: block;
    }
=======
<template>
    <main>
        <img :src="avatar">
        <div class="message">
            <header>
                <div>
                <b>{{membre.fullname}}</b> <time>{{dateMessage}}</time>
                </div>
            </header>
            {{message.message}}
            <div class="conversation" v-if="message.conversation">
                Présent dans <b><router-link :to="{name:'Conversation',params:{id:message.conversation.id}}">{{message.conversation.topic}}</router-link></b>
            </div>
        </div>
    </main>
</template>
<script>
    export default {
        props: ['message','conversation'],
        computed: {
            membre(){
                return this.$store.getters.getMembre(this.message.member_id);
            },
            dateMessage(){
                let options = {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'};
                return new Date(this.message.created_at).toLocaleDateString('fr-FR', options);
            },
            avatar(){
                return 'https://robohash.org/'+md5(this.membre.email)+'?set=set4&bgset=&size=400x400'
            }
        }
    }
</script>
<style lang="scss">
    .message{
        background: rgb(238, 238, 238);
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
    .conversation{
        font-size: 60%;

    }
    img{
        width: 64px;
        height: 64px;
        border-radius: 50%;
        display:inline-block;
    }
>>>>>>> fb8c99a78b02d1e9acc9329f0c35a21f87698fec
</style>