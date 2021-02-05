<template>
  <div v-if="apiOk">
    <Header/>
    <router-view/>
  </div>
  <div v-else>
    Impossible de joindre l'API
    </div>
</template>
<script>
import Header from '@/components/Header.vue';
export default {
  methods: {
  },
  components: {
    Header
  },

  data(){
    return{
      apiOk: false
    }
  },
  mounted(){
    console.log("L'app est démarée");
    api.get('ping').then(reponse=>
    {
      this.apiOk = true;
      console.log("l'api est fonctionelle");

      this.chargerMembres();
      this.$bus.$on('charger-membres', this.chargerMembres);

      this.chargerConversations();
      this.$bus.$on('charger-conversations', this.chargerConversations);

      if(!this.$store.state.membre)
      {
        if(this.$route.path != "/se-connecter" && this.$route.path !="creer-compte")
          this.$router.push('/se-connecter');
      } else {
        api.get('members/'+this.$store.state.membre.id+'/signedin').catch(error => {
          this.$store.commit('seDeconnecter');
          this.$store.commit('/se-connecter');
        });
      }
    }).catch(error=>{
      console.log("l'api ne marche pas");
    })
  },
  methods : {
    chargerConversations(){
      api.get('channels').then(response => {
        this.$store.commit('setConversations',response.data);
      });
    },
    chargerMembres(){
      api.get('members').then(response => {
        this.$store.commit('setMembres',response.data);
      });
    }
  }
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
button {
    background-color:#D8D076;
}
a {
    color: #D8D076;
}
.button{
  color: #D8D076;
  border: .1rem solid #D8D076;
}
</style>
