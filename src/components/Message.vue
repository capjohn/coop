<template>
    <div class="message">
        <header>
            <b>{{membre.fullname}}</b> <time> le {{dateMessage}}</time>
        </header>
        {{message.message}}
    </div>
</template>
<script>
    export default {
        props: ['message','conversation'],
        computed: {
            membre(){
                return this.$store.getters.getMembre(this.message.member_id);
            },
            dateMessage(){
                let options = {year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'};
                return new Date(this.message.created_at).toLocaleDateString('fr-FR', options);
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
        header{
            font-size: 80%;
            border-bottom: 1px solid grey;
        }
    }
</style>