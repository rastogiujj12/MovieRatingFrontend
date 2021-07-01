<template>
    <div id="main-div">
        <div class="background-variant">
            <p> Movie Rating </p>
            <table class="table">
                <thead>
                    <tr>
                        <th class=""><div class="th-wrap">Name</div></th>
                        <th class=""><div class="th-wrap">Director</div></th>
                        <th class=""><div class="th-wrap">IMDb</div></th>
                        <th class=""><div class="th-wrap">99Popularity</div></th>
                        <th class=""><div class="th-wrap">genre</div></th>
                        <th class=""><div class="th-wrap">Action</div></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="row in tableData" :key="row._id" draggable="false" class="" >
                        <td>{{row.name}}</td>
                        <td>{{row.director.name}}</td>
                        <td>{{row.imdbScore}}</td>
                        <td>{{row.popularity99}}</td>
                        <td>{{formatGenre(row.genre)}}</td>
                        <td class="action-button">
                            <b-button icon-pack="fa" type="is-danger" icon-left="trash" @click="deleteBtnClick(row._id)"/>
                            <b-button icon-pack="fa" type="is-info"   icon-left="edit"  @click="editBtnClick(row)"/>
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>
        <div class="add-btn">
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

export default {
    data(){
        return{
            tableData: [
                {
                    "genre": [
                        {
                            "_id": "60dcccf5f7cc7c501fea6373",
                            "name": "Adventure",
                            "__v": 0
                        },
                        {
                            "_id": "60dcccf5f7cc7c501fea6383",
                            "name": " Mystery",
                            "__v": 0
                        },
                        {
                            "_id": "60dcccf5f7cc7c501fea637b",
                            "name": " Sci-Fi",
                            "__v": 0
                        }
                    ],
                    "_id": "60dcccf5f7cc7c501fea6396",
                    "name": "2001 : A Space Odyssey",
                    "imdbScore": "8.4",
                    "popularity99": "84",
                    "director": {
                        "_id": "60dcccf5f7cc7c501fea6395",
                        "name": "Stanley Kubrick",
                        "__v": 0
                    },
                    "createdBy": {
                        "_id": "60dccce8f7cc7c501fea6372",
                        "name": "test user",
                        "email": "test@mail.com",
                        "password": "$2b$10$eZV0aXclEM4e9ZLCjm8.eeSvRppwipCoSFOayd6nyByxEKvrACMv.",
                        "__v": 0
                    },
                    "__v": 0
                },
                {
                    "genre": [
                        {
                            "_id": "60dcccf6f7cc7c501fea63d4",
                            "name": "Short",
                            "__v": 0
                        }
                    ],
                    "_id": "60dcccf6f7cc7c501fea649a",
                    "name": "21-87",
                    "imdbScore": "7.5",
                    "popularity99": "75",
                    "director": {
                        "_id": "60dcccf6f7cc7c501fea6499",
                        "name": "Arthur Lipsett",
                        "__v": 0
                    },
                    "createdBy": {
                        "_id": "60dccce8f7cc7c501fea6372",
                        "name": "test user",
                        "email": "test@mail.com",
                        "password": "$2b$10$eZV0aXclEM4e9ZLCjm8.eeSvRppwipCoSFOayd6nyByxEKvrACMv.",
                        "__v": 0
                    },
                    "__v": 0
                },
                {
                    "genre": [
                        {
                            "_id": "60dcccf5f7cc7c501fea638e",
                            "name": "Drama",
                            "__v": 0
                        },
                        {
                            "_id": "60dcccf6f7cc7c501fea6407",
                            "name": " Crime",
                            "__v": 0
                        },
                        {
                            "_id": "60dcccf5f7cc7c501fea639e",
                            "name": " Film-Noir",
                            "__v": 0
                        }
                    ],
                    "_id": "60dcccf6f7cc7c501fea6468",
                    "name": "5 Against the House",
                    "imdbScore": "6",
                    "popularity99": "60",
                    "director": {
                        "_id": "60dcccf6f7cc7c501fea6467",
                        "name": "Phil Karlson",
                        "__v": 0
                    },
                    "createdBy": {
                        "_id": "60dccce8f7cc7c501fea6372",
                        "name": "test user",
                        "email": "test@mail.com",
                        "password": "$2b$10$eZV0aXclEM4e9ZLCjm8.eeSvRppwipCoSFOayd6nyByxEKvrACMv.",
                        "__v": 0
                    },
                    "__v": 0
                },
                {
                    "genre": [
                        {
                            "_id": "60dcccf7f7cc7c501fea64b5",
                            "name": "Documentary",
                            "__v": 0
                        },
                        {
                            "_id": "60dcccf7f7cc7c501fea64b6",
                            "name": " News",
                            "__v": 0
                        }
                    ],
                    "_id": "60dcccf7f7cc7c501fea64b8",
                    "name": "60 Minutes",
                    "imdbScore": "6.4",
                    "popularity99": "64",
                    "director": {
                        "_id": "60dcccf7f7cc7c501fea64b7",
                        "name": "Rob Klug",
                        "__v": 0
                    },
                    "createdBy": {
                        "_id": "60dccce8f7cc7c501fea6372",
                        "name": "test user",
                        "email": "test@mail.com",
                        "password": "$2b$10$eZV0aXclEM4e9ZLCjm8.eeSvRppwipCoSFOayd6nyByxEKvrACMv.",
                        "__v": 0
                    },
                    "__v": 0
                },
                {
                    "genre": [
                        {
                            "_id": "60dcccf5f7cc7c501fea638e",
                            "name": "Drama",
                            "__v": 0
                        },
                        {
                            "_id": "60dcccf5f7cc7c501fea6375",
                            "name": " Fantasy",
                            "__v": 0
                        }
                    ],
                    "_id": "60dcccf6f7cc7c501fea648b",
                    "name": "8xe5",
                    "imdbScore": "8.2",
                    "popularity99": "82",
                    "director": {
                        "_id": "60dcccf6f7cc7c501fea63f0",
                        "name": "Federico Fellini",
                        "__v": 0
                    },
                    "createdBy": {
                        "_id": "60dccce8f7cc7c501fea6372",
                        "name": "test user",
                        "email": "test@mail.com",
                        "password": "$2b$10$eZV0aXclEM4e9ZLCjm8.eeSvRppwipCoSFOayd6nyByxEKvrACMv.",
                        "__v": 0
                    },
                    "__v": 0
                },
                {
                    "genre": [
                        {
                            "_id": "60dcccf5f7cc7c501fea6397",
                            "name": "Crime",
                            "__v": 0
                        },
                        {
                            "_id": "60dcccf5f7cc7c501fea637e",
                            "name": " Drama",
                            "__v": 0
                        },
                        {
                            "_id": "60dcccf5f7cc7c501fea637b",
                            "name": " Sci-Fi",
                            "__v": 0
                        }
                    ],
                    "_id": "60dcccf5f7cc7c501fea63c2",
                    "name": "A Clockwork Orange",
                    "imdbScore": "8.5",
                    "popularity99": "85",
                    "director": {
                        "_id": "60dcccf5f7cc7c501fea6395",
                        "name": "Stanley Kubrick",
                        "__v": 0
                    },
                    "createdBy": {
                        "_id": "60dccce8f7cc7c501fea6372",
                        "name": "test user",
                        "email": "test@mail.com",
                        "password": "$2b$10$eZV0aXclEM4e9ZLCjm8.eeSvRppwipCoSFOayd6nyByxEKvrACMv.",
                        "__v": 0
                    },
                    "__v": 0
                },
                {
                    "genre": [
                        {
                            "_id": "60dcccf5f7cc7c501fea6382",
                            "name": "Horror",
                            "__v": 0
                        },
                        {
                            "_id": "60dcccf5f7cc7c501fea6383",
                            "name": " Mystery",
                            "__v": 0
                        }
                    ],
                    "_id": "60dcccf6f7cc7c501fea6446",
                    "name": "A Nightmare on Elm Street",
                    "imdbScore": "7.4",
                    "popularity99": "74",
                    "director": {
                        "_id": "60dcccf6f7cc7c501fea6445",
                        "name": "Wes Craven",
                        "__v": 0
                    },
                    "createdBy": {
                        "_id": "60dccce8f7cc7c501fea6372",
                        "name": "test user",
                        "email": "test@mail.com",
                        "password": "$2b$10$eZV0aXclEM4e9ZLCjm8.eeSvRppwipCoSFOayd6nyByxEKvrACMv.",
                        "__v": 0
                    },
                    "__v": 0
                },
                {
                    "genre": [
                        {
                            "_id": "60dcccf5f7cc7c501fea638e",
                            "name": "Drama",
                            "__v": 0
                        },
                        {
                            "_id": "60dcccf5f7cc7c501fea638f",
                            "name": " Romance",
                            "__v": 0
                        }
                    ],
                    "_id": "60dcccf7f7cc7c501fea64ed",
                    "name": "A Place in the Sun",
                    "imdbScore": "7.8",
                    "popularity99": "78",
                    "director": {
                        "_id": "60dcccf7f7cc7c501fea64a0",
                        "name": "George Stevens",
                        "__v": 0
                    },
                    "createdBy": {
                        "_id": "60dccce8f7cc7c501fea6372",
                        "name": "test user",
                        "email": "test@mail.com",
                        "password": "$2b$10$eZV0aXclEM4e9ZLCjm8.eeSvRppwipCoSFOayd6nyByxEKvrACMv.",
                        "__v": 0
                    },
                    "__v": 0
                },
                {
                    "genre": [
                        {
                            "_id": "60dcccf5f7cc7c501fea638e",
                            "name": "Drama",
                            "__v": 0
                        },
                        {
                            "_id": "60dcccf5f7cc7c501fea6383",
                            "name": " Mystery",
                            "__v": 0
                        },
                        {
                            "_id": "60dcccf5f7cc7c501fea638f",
                            "name": " Romance",
                            "__v": 0
                        }
                    ],
                    "_id": "60dcccf6f7cc7c501fea642f",
                    "name": "Algiers",
                    "imdbScore": "7",
                    "popularity99": "70",
                    "director": {
                        "_id": "60dcccf6f7cc7c501fea642e",
                        "name": "John Cromwell",
                        "__v": 0
                    },
                    "createdBy": {
                        "_id": "60dccce8f7cc7c501fea6372",
                        "name": "test user",
                        "email": "test@mail.com",
                        "password": "$2b$10$eZV0aXclEM4e9ZLCjm8.eeSvRppwipCoSFOayd6nyByxEKvrACMv.",
                        "__v": 0
                    },
                    "__v": 0
                },
                {
                    "genre": [
                        {
                            "_id": "60dcccf5f7cc7c501fea6373",
                            "name": "Adventure",
                            "__v": 0
                        },
                        {
                            "_id": "60dcccf5f7cc7c501fea6387",
                            "name": " Horror",
                            "__v": 0
                        },
                        {
                            "_id": "60dcccf5f7cc7c501fea637b",
                            "name": " Sci-Fi",
                            "__v": 0
                        },
                        {
                            "_id": "60dcccf5f7cc7c501fea6384",
                            "name": " Thriller",
                            "__v": 0
                        }
                    ],
                    "_id": "60dcccf6f7cc7c501fea63f3",
                    "name": "Alien",
                    "imdbScore": "8.5",
                    "popularity99": "85",
                    "director": {
                        "_id": "60dcccf6f7cc7c501fea63f2",
                        "name": "Ridley Scott",
                        "__v": 0
                    },
                    "createdBy": {
                        "_id": "60dccce8f7cc7c501fea6372",
                        "name": "test user",
                        "email": "test@mail.com",
                        "password": "$2b$10$eZV0aXclEM4e9ZLCjm8.eeSvRppwipCoSFOayd6nyByxEKvrACMv.",
                        "__v": 0
                    },
                    "__v": 0
                }
            ],
        }
    },
    methods:{
        formatGenre(arr){
            let genreArr = [];
            arr.forEach(el=>{
                genreArr.push(el.name)
            })
            return genreArr;
        },
        editBtnClick(row){
            //TODO
        },
        deleteBtnClick(id){
            // TODO
        },
        addMovie(){
            // TODO
        },
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
</style>
