<template>
    <form action="">
        <div class="modal-card" style="width: auto">
            <header class="modal-card-head">
                <p class="modal-card-title">Login</p>
                <button
                    type="button"
                    class="delete"
                    @click="$emit('close')"/>
            </header>
            <section class="modal-card-body">
                <b-field label="email *">
                    <b-input
                        type="string"
                        v-model="email"
                        placeholder="email"
                        required>
                    </b-input>
                </b-field>
                <b-field label="password *">
                    <b-input
                        type="string"
                        v-model="password"
                        placeholder="password"
                        required>
                    </b-input>
                </b-field>    
                <b-button type="is-success" expanded @click="login">Login</b-button>
            </section>
        </div>
    </form>
</template>
<script>
export default {
    props:{
        
    },
    data(){
        return{
           email:null,
           password:null,
        }
    },
    methods:{
        login(){
            if(this.email && this.password){
                this.$store.dispatch("login", {email:this.email, password:this.password});
            }
        }
    },
    computed:{
        isAuthenticated(){
            return this.$store.getters.isAuthenticated || false;
        }
    },
    watch:{
        isAuthenticated(newVal){
            if(newVal){
                this.$emit('close');
            }
        }
    }
}
</script>
