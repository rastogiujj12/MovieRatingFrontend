<template>
    <form action="">
        <div class="modal-card" style="width: auto">
            <header class="modal-card-head">
                <p class="modal-card-title">Create new movie</p>
                <button
                    type="button"
                    class="delete"
                    @click="$emit('close')"/>
            </header>
            <section class="modal-card-body">
                <b-field label="Name *">
                    <b-input
                        type="string"
                        v-model="name"
                        placeholder="Name"
                        required>
                    </b-input>
                </b-field>
                <b-field grouped>
                    <b-field label="IMDb Score *">
                        <b-input
                            type="number"
                            step=".1"
                            min="0"
                            max="10"
                            v-model="imdbScore"
                            placeholder="IMDb Score"
                            required>
                        </b-input>
                    </b-field>

                    <b-field label="99Popularity *">
                        <b-input
                            type="number"
                            step="1"
                            min="0"
                            max="100"
                            v-model="popularity99"
                            placeholder="99Popularity"
                            required>
                        </b-input>
                    </b-field>
                </b-field>

                <b-field label="Director Name *">
                    <b-taginput
                        v-model="director"
                        :data="filteredDirectors"
                        autocomplete
                        :allow-new="true"
                        :open-on-focus="true"
                        field="name"
                        :before-adding="beforeAddingDirectors"
                        @typing="getFilteredDirectors">
                    </b-taginput>
                </b-field>
                <b-field label="Genre *">
                    <b-taginput
                        v-model="genre"
                        :data="filteredTags"
                        autocomplete
                        :allow-new="true"
                        :open-on-focus="true"
                        field="name"
                        icon="label"
                        placeholder="Add genre"
                        @typing="getFilteredTags">
                    </b-taginput>
                </b-field>
    
                <b-button type="is-success" expanded @click="save">Save</b-button>
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
            filteredTags:this.genreList,
            filteredDirectors:this.directors,
            name:null,
            imdbScore:null,
            popularity99:null,
            genre:[],
            director:[]
        }
    },
    mounted(){
        this.init();
    },
    methods:{
        init(){
            this.$store.dispatch("getMovies");
            this.$store.dispatch("getGenre");
            this.$store.dispatch("getDirectors")
        },
        getFilteredTags(text) {
            this.filteredTags = this.genreList.filter((option) => {
                return option.name
                    .toString()
                    .toLowerCase()
                    .indexOf(text.toLowerCase()) >= 0
            })
        },
        getFilteredDirectors(text){
            this.filteredDirectors = this.directorList.filter((option) => {
                return option.name
                    .toString()
                    .toLowerCase()
                    .indexOf(text.toLowerCase()) >= 0
            })
        },
        beforeAddingDirectors(){
            console.log(">>>", this.director.length)
            return !this.director.length
        },
        save(){
            if(!this.director.length || !this.genre.length){
                this.$buefy.toast.open({
                    duration: 2000,
                    message:"please enter all the fields",
                    position: "is-top",
                    type: "is-danger",
                });
            }
            else{
                let directorObj = this.director[0]
                if (typeof directorObj === 'string' || directorObj instanceof String) directorObj = {name:directorObj}
                
                console.log("director Obj", directorObj);
                this.$store.dispatch("addMovie", {
                    name:this.name, 
                    imdbScore:this.imdbScore,
                    popularity99: this.popularity99,
                    genre:this.genre,
                    director: directorObj
                });
                this.$emit('close');
            }
        }
    },
    computed:{
        genreList(){
            return this.$store.getters.getGenre || [];
        },
        directorList(){
            return this.$store.getters.getDirectors || [];
        }
    }
}
</script>
