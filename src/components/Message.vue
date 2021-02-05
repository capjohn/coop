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
</style>