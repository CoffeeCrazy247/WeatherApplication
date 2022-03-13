<template>
  <div id="app">
    <div id="nav">
      <div>
        <b-navbar toggleable="lg" type="dark" variant="dark">
          <b-navbar-brand href="#">NavBar</b-navbar-brand>
          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav class="addtl-nav-format">

              <router-link to="/">Home</router-link> |
              <router-link to="/weather">Weather</router-link> |
              <router-link to="/3dfuntest">Threejs Test</router-link> |
              <router-link to="/matrix">Matrix</router-link>

            </b-navbar-nav>
            <b-navbar-nav class="ml-auto">
              <b-nav-form>
                <b-form-input
                  size="sm"
                  class="mr-sm-2"
                  placeholder="Search"
                ></b-form-input>
                <b-button size="sm" class="my-2 my-sm-0" type="submit"
                  >Search</b-button
                >
              </b-nav-form>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
        <router-view class="background-fun" />
      </div>
    </div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #4b4b4b;
}

#nav {
  height: 5vh;
}

#nav a {
  font-weight: bold;
  color: #ffffff;
}

#nav a.router-link-exact-active {
  color: #00e1ff;
}
.addtl-nav-format{
  color: #00e1ff;
}
.background-fun{
  background: linear-gradient(90deg, rgb(0, 0, 0) 0%, rgba(9, 71, 121, 0.6) 45%, rgba(151,7,150,.6) 55%, rgb(0, 0, 0) 100%);
  min-height: 94vh;
}
</style>
