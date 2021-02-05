<template>
    <div class="container" v-if="membre">
        <img class="avatar" :src="avatar">
        <ul>
            <h1>{{membre.fullname}}</h1>
            <li>Email: {{membre.email}}</li>
            <li>Inscrit depuis le : {{membre.depuis}}</li>
        </ul>

        <h2>Messages: </h2>
        <div class="loader" v-if="loading">
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
            },
            avatar(){
                return 'https://robohash.org/'+md5(this.membre.email)+'?set=set4&bgset=&size=400x400'
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
                                message.conversation = conversation;
                                this.messages.push(message);
                            }
                        });
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
<style lang="scss">
div.container{
    padding-top: 5em;
}
.loader{
	background: url('../assets/loading.gif') 100% 100% no-repeat;
	cursor: wait;
	height: 100%;
	position: fixed;
	width: 100%;
	z-index: 9999;
    right: 43%;
    bottom: 25%;
}
.loader h1{
	background: none;
	border: none;
	color: #458976;
	font-size: 22px;
	font-family: "Open Sans",sans-serif;
	font-variant: small-caps;
	font-weight: 700;
	height: 700px;
	line-height: 700px;
	margin: 0 0 10px;
	padding: 0;
	text-align: center;
}
.avatar{
    width: 200px;
    height: 200px;
    border-radius: unset;
    display:inline-block;
}
ul{
    display: inline-block;
    li{
        list-style: none;
    }
}
</style>