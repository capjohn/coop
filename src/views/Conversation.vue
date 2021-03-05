<template>
    <div class="container" id="down" v-if="conversation">
        <div class="action">            
            <a @click="editerConversation">Modifier </a>
            <a @click="supprimerConversation"> Supprimer </a>
        </div>

        <form v-if="editer" class="modifConver" @submit.prevent="modifierConversation">
            <fieldset>
                <label>Sujet</label>
                <input v-model="conversation.topic" required type="text" placeholder="De quoi voulez vous discuter ?"/>
                <label>Tags</label>       
                <input v-model="conversation.label" required type="text" placeholder="Quels sont les concepts abordés ?"/>
                <button class="button button-clear">Modifier la conversation</button>
            </fieldset>
        </form> 
        <template v-else>
            <h1>{{conversation.topic}}</h1>
            <h4>{{conversation.label}}</h4>
        </template>
        <div class="messages">
            <template v-for="message in messages">
                <Message :message="message"></Message> 
            </template>
        </div>
        <div ref="bottom">
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
            messages : [],
            editer : false
        }
    },
    mounted(){
        if(this.$route.params.id){
            api.get('channels/'+this.$route.params.id).then(response=>{
                this.conversation = response.data;
                this.chargerMessages();
            })
        }
    },
    methods :{
        editerConversation(){
            this.editer = !this.editer;
        },
        modifierConversation(){
            api.put('channels/'+this.conversation.id, this.conversation).then(response => {
                this.conversation = response.data;
                this.editer = false;
            })
        },
        supprimerConversation(){
            if(confirm('Voulez vous vraiment supprimer la conversation ?')){
                api.delete('channels/'+this.conversation.id).then(response =>{
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
        }
    }
}
</script>
<style scoped lang="scss">
.messages{
    padding-bottom: 1em;
}
form{
    background:aliceblue;
    position: fixed;
    bottom: 0;
    left: 1em;
    width: 100%;
    margin: 0;
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
.centered{
    left: unset;
}
.action{
    float: right;
    a{
        font-size: medium;
    }
}
.modifConver{
    background: transparent;
    padding-bottom: 24em;
    padding-right: inherit;
    fieldset{
        float:inline-end;
        width:auto;
    }
}
</style>