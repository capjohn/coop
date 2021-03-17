<template>
    <div class="container" id="down" v-if="conversation">
        <div class="action">            
            <a @click="editerConversation" class="button button-outline" id='yellow'>Modifier </a>
            <a @click="supprimerConversation" class="button button-outline" id='yellow'> 🗑 </a>
        </div>

        <div id="creer-conversation" v-if="afficher">
            <section>
                <button class="close" @click="annulerModif">X</button>
                <h3>Modifier une conversation</h3>
                <form class="modifConversation" @submit.prevent="modifierConversation">
                    <fieldset>
                        <label>Sujet</label>
                        <input v-model="c.topic" required type="text" placeholder="De quoi voulez vous discuter ?"/>
                        <label>Tags</label>       
                        <input v-model="c.label" required type="text" placeholder="Quels sont les concepts abordés ?"/>
                        <button class="button">Modifier la conversation</button>
                        <button @click="annulerModif" class="button button-clear"  id='yellow'>Annuler</button>

                    </fieldset>
                </form> 
            </section>
        </div>
        <template v-else>
            <h1>{{c.topic}}</h1>
            <h4>{{c.label}}</h4>
        </template>
        <div class="messages">
            <template v-for="message in messages">
                <Message :message="message"></Message> 
            </template>
        </div>
        <div ref="bottom" v-if="!afficher">
            <form @submit.prevent="posterMessage" class="centered">
                <div class ="row">
                    <div class="column column-60">
                        <input v-model="message" required type="text" placeholder="Rédiger un message ...">
                    </div>
                    <button>Envoyer</button>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import Message from '@/components/Message.vue';
export default {
    components : {Message},
    data(){
        return{
            conversation:false,
            message : '',
            c:{topic: '', label: ''},
            messages : [],
            afficher : false
        }
    },
    mounted(){
        if(this.$route.params.id){
            api.get('channels/'+this.$route.params.id).then(response=>{
                this.conversation = response.data;
                this.clonerConversation();
                this.chargerMessages();
            })
        }
    },
    methods :{
        clonerConversation(){
           this.c.id = this.conversation.id;
           this.c.topic = this.conversation.topic;
           this.c.label = this.conversation.label;
        },
        editerConversation(){
            this.afficher = true;
            this.clonerConversation();
        },
        modifierConversation(){
            api.put('channels/'+this.c.id, this.c).then(response => {
                this.conversation = response.data;
                this.afficher = false;
                this.clonerConversation();
            })
        },
        supprimerConversation(){
            if(confirm('Voulez vous vraiment supprimer la conversation ?')){
                api.delete('channels/'+this.conversation.id).then(response =>{
                    this.$bus.$emit('charger-conversations');
                    this.$router.push({name:'Home'});
                })
            }
        },
        chargerMessages(){
            api.get('channels/'+this.conversation.id+'/posts').then(
                response => {
                    let messagesliste = response.data.reverse();
                    this.messages = messagesliste;
                })
        },
        posterMessage() {
            api.post('channels/'+this.conversation.id+'/posts',{
                message : this.message
            }).then(response =>{
                setTimeout(() =>{
                    this.$refs['bottom'].scrollIntoView();
                },500);
                this.message = '';
                this.chargerMessages();
            })
        },
        annulerModif()
        {
            this.clonerConversation();
            this.afficher = false;
        }
    }
}
</script>
<style scoped lang="scss">
.messages{
    padding-bottom: 1em;
}
form.centered{
    background:aliceblue;
    position: fixed;
    bottom: 0;
    left: 1em;
    width: 100%;
    margin: 0;
    left: unset;
}
blockquote{
    border-left: 0.3rem solid #BDB76B;
}    
.message{
    background: rgb(238, 238, 238);
    padding: 1em;
    margin: 1em 0;
    border-radius: 15px;
    max-width: max-content;
}
.action{
    float: right;
    a{
        font-size: medium;
    }
}
#creer-conversation{
    position: fixed;
    top: 0;
    left:0;
    width: 100%;
    height:100%;
    background : rgba(0,0,0,0.5);
    & > section {
        .close {
            position : absolute;
            top: -1em;
            right : -1em;
            width : 3em;
            height : 3em;
            line-height : 3em;
            margin : 0;
            padding : 0;
            border-radius : 50%;
        }
        position : absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 1em;
        border-radius:1em;
    }
}
#yellow{
  color: #D8D076;
}
</style>