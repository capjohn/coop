<template>
    <li>
        <router-link :to="{name:'Conversation',params:{id : conversation.id}}" class="span">
            <h4>Sujet</h4>
            <h3><b>{{conversation.topic}}</b></h3>
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
        height: 240px;
        text-align: center;
        text-shadow: 2px 2px 0px rgba(0, 0, 0, 0.05);
        background: #D8D076;
        border-radius: 15px;
    }
    .span:hover {
        background: rgb(94, 94, 94);
    }
}
</style>