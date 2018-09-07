import React, {Component} from 'react'
import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import {graphql} from 'react-apollo'

// const FILMS_QUERY = gql`
// query Films($query: String){
//   films(query: $query) {
//     id,
//     title,
//     poster_path,
//     overview
//   }
// }
//   `
const ADD_FAVORITE_MUTATION = gql`
mutation AddFavoriteMutation($id: ID!, $title: String!, $poster_path: String!, $overview: String!) {
    addToFavorites(id: $id, title: $title, poster_path: $poster_path, overview: $overview) {
        id,
        title,
        poster_path,
        overview
    }
}
`

class FilmList extends Component {
    state={
        input: ''
    }

    handleInput = (e) => {
        this.setState({input: e.target.value})
    }

    searchButton = (e) => {
        e.preventDefault()
        this.props.data.refetch({query: this.state.input})
    }

    render() {
        let { input } = this.state
        const { films, loading, error } = this.props.data

        console.log(this.props)
        return (
            <div>
                <form className='search' onSubmit={this.searchButton}>
                    <input placeholder="Search for a movie" onChange={this.handleInput} value={input}/>
                    <button>Search</button> 
                </form>
                {loading && <div className='popup-outer'>
                        <div className='popup-inner'>
                            Fetching
                        </div>
                    </div>}
                {error && <div className='popup-outer'>
                        <div className='popup-inner'>
                            Error
                        </div>
                    </div>}
                {
                    films && films.map(film => {
                        const {id, title, poster_path, overview} = film
                            return (
                                <div className='film-card' key={id}>
                                    <img src={`https://image.tmdb.org/t/p/w200/${poster_path}`} alt={title} />
                                    <div>
                                        <h1>{title}</h1>
                                        <p>{overview}</p>
                                        <Mutation mutation={ADD_FAVORITE_MUTATION} variables={film}>
                                            {addFavoriteMutation => <button className='like-button' onClick={addFavoriteMutation}><i class="far fa-thumbs-up"></i></button> }
                                        </Mutation>
                                    </div>
                                </div>
                            )
                        })
                    }
            </div>
        )
    }
}

export default graphql(gql`
query Films($query: String){
  films(query: $query) {
    id,
    title,
    poster_path,
    overview
  }
}
`)(FilmList)