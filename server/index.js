const {GraphQLServer} = require('graphql-yoga')
const axios = require('axios')

let films = []
favorites = []

axios.get('https://api.themoviedb.org/3/movie/popular?api_key=8c396574e42b768698c3c9e595c87cd2&language=en-US&page=1').then(results => {
    films = results.data.results
})

const resolvers = {
    Query: {
        films: async (root, args) => {
            if(args.query) {
                let filmsSearch = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=8c396574e42b768698c3c9e595c87cd2&language=en-US&query=${args.query}&page=1&include_adult=false`)
                films = filmsSearch.data.results
                return films
            } else {
                let filmsData = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=8c396574e42b768698c3c9e595c87cd2&language=en-US&page=1')
                films = filmsData.data.results
                return films
            }
        },
        favorites: () => {
            return favorites
        },
    },

    Mutation: {
        addToFavorites: (root, args) => {
            if(favorites.findIndex(f => f.id === args.id) === -1){
                favorites.push(args)
            }
            return args
        },
        deleteFavorite: (root, args) => {
            let index = favorites.findIndex(f => f.id === args.id)
            if(index !== -1) {
                return favorites.splice(index, 1)[0]
            }
            return null
        }
    }
}

const server = new GraphQLServer({
    typeDefs: './server/scheme.graphql',
    resolvers
})

server.start(() => console.log(`Server is runing on http://localhost:4000`))