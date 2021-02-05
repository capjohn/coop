<template>
    <div class="container" id="down" v-if="conversation">
        <h1>{{conversation.topic}}</h1>
        <h4>{{conversation.label}}</h4>
        <div class="messages">
            <template v-for="message in messages">
                <blockquote>
                    {{message.message}}
                </blockquote>
            </template>
        </div>
        <div ref="bottom">
            <form @submit.prevent="posterMessage">
                    <div class ="row">
                        <div class="column column-90">
                            <input v-model="message" required type="text" placeholder="Rédiger un message ...">
                        </div>
                        <button>Envoyer</button>
                    </div>
                </form>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            conversation:false,
            message : '',
            messages : []
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
</style>