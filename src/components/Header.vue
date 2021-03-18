<template>
  <!-- Si l'utilisateur est authentifié (possède un token) alors le header apparait -->
  <header class="header" v-if="$store.state.token">
    <router-link to="/"><a class="logo">Co'op</a></router-link>
    <input class="menu-btn" type="checkbox" id="menu-btn" />
    <label class="menu-icon" for="menu-btn"><span class="navicon"></span></label>
    <ul class="menu">
      <!-- routes vers les vues conversations ou membres ainsi que bouton de déconnexion -->
      <li><router-link to="/" id="header-white">Conversations</router-link></li>
      <li><router-link to="/membres" id="header-white">Membres</router-link></li>
      <li><button @click="seDeconnecter" id="deconnect">Se Déconnecter</button></li>
    </ul>
  </header>
</template>
<script>
export default {
    methods:{
        seDeconnecter()
        {
          // Déconnecte l'utilisateur et redirige vers page de connexion
            this.$store.commit('seDeconnecter');
            this.$router.push('/se-connecter');
        }
    }
}
</script>
<style>
body {
  margin: 0;
  font-family: Helvetica, sans-serif;
  background-color: aliceblue;
}
a.logo{
  color: white;
}

/* header */

.header {
  background-color: rgb(39, 39, 39);
  box-shadow: 1px 1px 4px 0 rgba(0,0,0,.1);
  position: fixed;
  width: 100%;
  z-index: 3;
}

.header ul {
  margin: 0;
  padding: 0;
  list-style: none;
  overflow: hidden;
  background-color: #fff;
}

.header li a {
  display: block;
  padding: 20px 20px;
  text-decoration: none;
}

.header li a:hover,
.header .menu-btn:hover {
  background-color: rgb(71, 71, 71);
}

.header .logo {
  display: block;
  float: left;
  font-size: 2em;
  padding: 10px 20px;
  text-decoration: none;
}

/* menu */

.header .menu {
  clear: both;
  transition: 0 .2s ease-out;
  background-color:  rgb(39, 39, 39);
}

/* menu icon */

.header .menu-icon {
  cursor: pointer;
  display: inline-block;
  float: right;
  padding: 28px 20px;
  position: relative;
  user-select: none;
}

.header .menu-icon .navicon {
  background: #333;
  display: block;
  height: 2px;
  position: relative;
  transition: background .2s ease-out;
  width: 18px;
}

.header .menu-icon .navicon:before,
.header .menu-icon .navicon:after {
  background: #333;
  content: '';
  display: block;
  height: 100%;
  position: absolute;
  transition: all .2s ease-out;
  width: 100%;
}

.header .menu-icon .navicon:before {
  top: 5px;
}

.header .menu-icon .navicon:after {
  top: -5px;
}

/* menu btn */

.header .menu-btn {
  display: none;
}

.header .menu-btn:checked ~ .menu {
  max-height: 240px;
}

.header .menu-btn:checked ~ .menu-icon .navicon {
  background: transparent;
}

.header .menu-btn:checked ~ .menu-icon .navicon:before {
  transform: rotate(-45deg);
}

.header .menu-btn:checked ~ .menu-icon .navicon:after {
  transform: rotate(45deg);
}

.header .menu-btn:checked ~ .menu-icon:not(.steps) .navicon:before,
.header .menu-btn:checked ~ .menu-icon:not(.steps) .navicon:after {
  top: 0;
}

/* 48em = 768px */

@media (min-width: 48em) {
  .header li {
    float: left;
  }
  .header li a {
    padding: 20px 30px;
  }
  .header .menu {
    clear: none;
    float: right;
    max-height: none;
  }
  .header .menu-icon {
    display: none;
  }
}

#deconnect{
  margin-top: 1.2em;
  background: #BFB32B;
  border: none;
  margin-right: 1em;
}
#deconnect:hover{
  background: #606c76;
}

#header-white{
  color: white;
}
#header-white.router-link-exact-active{
  color: #BFB32B;
}
</style>
