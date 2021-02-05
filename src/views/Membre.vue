<template>
    <div class="container" v-if="membre">
        <h1>{{membre.fullname}}</h1>
        <ul>
            <li>Email: {{membre.email}}</li>
            <li>Inscrit depuis le : {{membre.depuis}}</li>
        </ul>

        <h2>Messages: </h2>
        <div v-if="loading">
            Chargement en cours ...
        </div>
        <div v-else v-for="message in messagesTries">
            <Message :message="message"></Message>
        </div>
    </div>
</template>
<script>
    import Message from '@/components/Message.vue'
    export default {
        components : {Message},
        data(){
            return {
                membre : false,
                messages : [],
                loading : true
            }
        },
        computed :{
            messagesTries() {
                function compare(a, b){
                    if(a.created_at < b.created_at){
                        return 1;
                    }
                    if(a.created_at > b.created_at){
                        return -1;
                    }
                    return 0;
                }
                return this.messages.sort(compare).slice(0,10);
            }
        },
        mounted() {
            if(this.$route.params.membre_id){
                this.membre = this.$store.getters.getMembre(this.$route.params.membre_id);
                let d = new Date(this.membre.created_at)
                let options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
                this.membre.depuis = d.toLocaleDateString('fr-FR', options);

                let cpt =0;
                this.$store.state.conversations.forEach(conversation =>{
                    api.get('channels/'+conversation.id+'/posts').then(response => {
                        response.data.forEach(message => {
                            if(message.member_id == this.membre.id){
                                this.messages.push(message);
                            }
                        })
                        cpt++;
                        if(this.$store.state.conversations.length == cpt){
                            setTimeout(() => this.loading = false,2000);
                        }
                    });
                })
            }
        }
    }
</script>
<style>
div.container{
    padding-top: 5em;
}
</style>