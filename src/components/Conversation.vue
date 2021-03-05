<<<<<<< HEAD
<template>
    <li>
        <router-link :to="{name:'Conversation',params:{id : conversation.id}}" class="span">
            <h2>Sujet</h2>
            <h2><b>{{conversation.topic}}</b></h2>
            <h4>Tag</h4>
            <h4><b>{{conversation.label}}</b></h4>
        </router-link>
    </li>
</template>
<script>
export default {
    props: ['conversation']
}
</script>
<style scoped lang="scss">
    li{
    float: left;
    margin:7px;	

    .span{
        display: block;
        text-decoration: none;
        color: white;
        font-weight: normal;
        font-size: 150%;
        width: 10em;
        height: 255px;
        text-align: center;
        text-shadow: 2px 2px 0px rgba(0, 0, 0, 0.05);
        background: #D8D076;
        border-radius: 15px;
    }
    .span:hover {
        background: rgb(94, 94, 94);
    }
}
=======
<template>
    <div class="row">
        <div class="column">
            <h3>{{conversation.topic}}</h3>
             {{conversation.label}}
        </div>
        <div class="column actions">
            <router-link :to="{name:'Conversation',params:{id : conversation.id}}" class="button">Voir</router-link>
        </div>
    </div>
</template>
<script>
export default {
    props: ['conversation']
}
</script>
<style scoped lang="scss">
    .row{
        .column {
            h3 {
                margin : 0;
                display: inline-block;
            }
            padding-bottom: 1em;
            border-bottom: 1px solid #ccc;
        }
        margin-bottom: 1em;
        .actions{
            max-width: 15%;
        }
    }
>>>>>>> fb8c99a78b02d1e9acc9329f0c35a21f87698fec
</style>