<template>
    <div id="main-div">
        <div class="background-variant">
            <p> Movie Rating </p>
            <div class="signin-btn">
                <b-button v-if="!isAuthenticated" type="is-primary" @click="login">Sign In</b-button>
                <b-button v-else                  type="is-danger"  @click="logout">Sign Out</b-button>
            </div>
            <div class="search">
                <b-field>
                    <b-input type="string" v-model="search" placeholder="Search movie or director" expanded></b-input>
                    <b-taginput
                        v-model="genre"
                        :data="filteredTags"
                        autocomplete
                        :allow-new="true"
                        :open-on-focus="true"
                        field="name"
                        icon="label"
                        placeholder="Genre"
                        @typing="getFilteredTags">
                    </b-taginput>
                    <b-button icon-pack="fa" type="is-info" icon-left="search" @click="editBtnClick(row)"/>
                </b-field>
            </div>
            <table class="table">
                <thead>
                    <tr>
                        <th class=""><div class="th-wrap">Name</div></th>
                        <th class=""><div class="th-wrap">Director</div></th>
                        <th class=""><div class="th-wrap">IMDb</div></th>
                        <th class=""><div class="th-wrap">99Popularity</div></th>
                        <th class=""><div class="th-wrap">genre</div></th>
                        <th v-if="isAuthenticated" class=""><div class="th-wrap">Action</div></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="row in tableData" :key="row._id" draggable="false" class="" >
                        <td>{{row.name}}</td>
                        <td>{{row.director.name}}</td>
                        <td>{{row.imdbScore}}</td>
                        <td>{{row.popularity99}}</td>
                        <td>{{formatGenre(row.genre)}}</td>
                        <td v-if="isAuthenticated" class="action-button">
                            <b-button icon-pack="fa" type="is-danger" icon-left="trash" @click="deleteBtnClick(row._id)"/>
                            <b-button icon-pack="fa" type="is-info"   icon-left="edit"  @click="editBtnClick(row)"/>
                        </td>
                    </tr>
                </tbody>
            </table>
            <b-pagination
                :total="totalCount"
                :per-page="pageSize"
                v-model="page"
                :range-before="1"
                :range-after="3"
                order="is-centered"
                :rounded="false"
                aria-next-label="Next page"
                aria-previous-label="Previous page"
                aria-page-label="Page"
                aria-current-label="Current page">
            </b-pagination>
            <!-- <div class="pagination-section">
                <paginate
                    :page-count="20"
                    :click-handler="paginationHandler"
                    :prev-text="'Prev'"
                    :next-text="'Next'"
                    :containerClass="'pagination'">
                </paginate>
            </div> -->
        </div>
        <div v-if="isAuthenticated" class="add-btn">
            <b-button
                icon-pack="fas" 
                size="is-medium"
                icon-right="plus-circle"
                @click = "addMovie"
                >
                Add
            </b-button>
        </div>
    </div>
</template>
<script>
import AddMovie  from '../AddMovie.vue'
import EditMovie from '../EditMovie.vue'
import Login from '../Login.vue'


export default {
    data(){
        return{
            id:"asdasd",
            search:null,
            filteredTags:this.genreList,
            genre:[],
            pageSize : 10,
            page:1,
        }
    },
    mounted(){
        this.init();
    },
    methods:{
        init(){
            this.$store.dispatch("getMovies")
            this.$store.dispatch("getGenre")
        },
        formatGenre(arr){
            let genreArr = [];
            arr.forEach(el=>{
                genreArr.push(el.name)
            })
            genreArr = genreArr.join(", ");
            return genreArr;
        },
        editBtnClick(row){
           this.$buefy.modal.open({
                parent:this,
                component: EditMovie,
                hasModalCard: true,
                trapFocus: true,
                canCancel: false,
                props:{
                    movieData:row
                }
                
            })
        },
        deleteBtnClick(id){
           swal("Are you sure you want to delete this video?", {
                buttons: {
                    cancel: "Cancel",
                    confirm: true,
                },
            })
            .then(async (value) => {
                if(value){
                    console.log("confirm delete", id)
                    this.$store.dispatch("deleteMovie", {"_id":id})
                }
            });
        },
        addMovie(){
            this.$buefy.modal.open({
                parent:this,
                component: AddMovie,
                hasModalCard: true,
                trapFocus: true,
                canCancel: false,
            })
        },
        login(){
            this.$buefy.modal.open({
                parent:this,
                component: Login,
                hasModalCard: true,
                trapFocus: true,
                canCancel: false,
            })
        },
        logout(){
            this.$store.dispatch("logout");
        },
        getFilteredTags(text) {
            this.filteredTags = this.genreList.filter((option) => {
                return option.name
                    .toString()
                    .toLowerCase()
                    .indexOf(text.toLowerCase()) >= 0
            })
        },
        paginationHandler(page){
            console.log("pagination handler called", page)
        }
    },
    computed:{
        tableData(){
            return this.$store.getters.getMovies || [];
        },
        isAuthenticated(){
            return this.$store.getters.isAuthenticated || false;
        },
        genreList(){
            return this.$store.getters.getGenre || [];
        },
        totalCount(){
            return this.$store.getters.getMovieCount || 0;
        }
    }
}
</script>
<style scoped>
#scroll-table{
    overflow-y:scroll;
    overflow-x: hidden;
    background: white;
}
.background-variant p{
    font-size: x-large;
    color:#f1f1f1;
    text-align: center;
}
table {
    width: -webkit-fill-available;
}
.add-btn{
    position: fixed;
    right: 50px;
    bottom: 50px;
}
.background-variant p{
    font-size: x-large;
    color:black;
    text-align: center;
}
.search{
    padding: 0 20px 0 20px;
    margin:30px 0;
}
.signin-btn{
    position: absolute;
    top:10px;
    right:20px;
}
.pagination-section{
    display: block;
    margin: 50px 0;
}
.pagination{
    display: flex;
    flex-direction: row;
    align-content: center;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
}
.pagination .li{
    border: 2px black solid;
}
</style>
