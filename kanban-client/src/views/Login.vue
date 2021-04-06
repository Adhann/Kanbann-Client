<template>
  <div class="min-w-screen min-h-screen bg-gray-900 flex items-center justify-center px-5 py-5">
    <div class="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden max-w-xl">
      <div class="md:flex w-full">
        
        <div class="w-full md:w-full py-10 px-5 md:px-10">
          <div class="text-center mb-10">
            <h1 class="font-bold text-3xl text-gray-900">LOGIN</h1>             
          </div>
          <div>
            <form action="#" @submit.prevent="doLogin"> 
              <div class="flex -mx-3">
                <div class="w-full px-3 mb-5">
                  <label for="" class="text-xs font-semibold px-1">Email</label>
                  <div class="flex">
                    <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i class="far fa-envelope text-gray-400 text-lg"></i></div>
                    <input type="email" v-model="login_email"  class="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-none bg-gray-100 outline-none focus:border-green-500" placeholder="example@mail.com">
                  </div>
                </div>
              </div>
              <div class="flex -mx-3">
                <div class="w-full px-3 mb-12">
                  <label for="" class="text-xs font-semibold px-1">Password</label>
                  <div class="flex">
                    <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i class="fas fa-lock text-gray-400 text-lg"></i></div>
                    <input type="password" v-model="login_password" class="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-green-500" placeholder="******">
                  </div>
                </div>
              </div>
              <div class="flex -mx-3">
                <div class="w-full px-3 mb-5">
                  <button type="submit" class="block w-full max-w-xs mx-auto bg-green-600 text-white rounded-lg px-3 py-3 font-semibold">LOGIN</button>
                </div>
              
              </div>
                <GoogleLogin class="mx-auto" :params="params" :renderParams="renderParams" :onSuccess="onSuccess" :onFailure="onFailure" ></GoogleLogin>
              <hr class="mt-5">
              <p class="mt-5 text-xs text-center font-light text-gray-500"> Don't have an account?
                <a href="#" @click.prevent="registerPage" class="text-black font-medium font-semibold" >
                Create Account
                </a>
              </p>
            </form>
            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GoogleLogin from "vue-google-login";

export default {
  components: {
    GoogleLogin
  },
  data() {
    return {
      login_email: '',
      login_password: '',
      params: {
        client_id: '154480493926-hn4kt3oduk8equqrnrbdasilc87vh9k2.apps.googleusercontent.com'
      },
      renderParams: {
        width: 250,
        height: 50,
        longtitle: true,
      },
    }
  },
  methods: {
    doLogin() {
      this.$emit('login',this.login_email, this.login_password)
    },
    registerPage() {
      this.$emit('changePage', 'register');
    },
    onSuccess(googleUser) {
      console.log(googleUser), '<<<';
      this.$emit('dataGoogleUser', googleUser);
    },
    onFailure(err) {
      console.log(err);
    }
  }
}
</script>

<style>

</style>