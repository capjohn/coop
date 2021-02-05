<template>
  <div>
    <div class="container" id="down">
      <h1>Liste des conversations</h1>
      <CreerConversation/>
      <div>
        <template v-for="conversation in $store.state.conversations">
          <Conversation :conversation="conversation"/>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  import CreerConversation from '@/components/CreerConversation.vue';
  import Conversation from '@/components/Conversation.vue';
  export default {
    components: {
      CreerConversation,
      Conversation
    }
  }
</script>
<style>
#down{
    padding-top:5em;
}
</style>