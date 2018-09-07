import React, {Component} from 'react'
import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import {graphql} from 'react-apollo'

const DELETE_FAVORITE_MUTATION = gql`
mutation DeleteFavorite($id: ID!) {
    deleteFavorite(id: $id) {
        id,
    }
}
`


class Favorites extends Component {
    componentDidMount() {
        this.props.data.refetch()
    }

    handleButton = (deleteFav) => {
        deleteFav()
        this.props.data.refetch()
    }

    render() {
        const { favorites, loading, error } = this.props.data
        return (
            <div>
                {!favorites && loading && <div>Fetching</div>}
                {!favorites && error && <div>Error</div>}
                {
                    favorites && favorites.length
                    ? 
                    favorites.map(film => {
                        const {id, title, poster_path, overview} = film

                        return (
                            <div className='film-card' key={id}>
                                <img src={`https://image.tmdb.org/t/p/w200/${poster_path}`} alt={title} />
                                <div>
                                    <h1>{title}</h1>
                                    <p>{overview}</p>    
                                    <Mutation mutation={DELETE_FAVORITE_MUTATION} variables={{id: film.id}}>
                                        {deleteFavoriteMutation => <button className='delete-button' onClick={() => this.handleButton(deleteFavoriteMutation)}><i class="far fa-trash-alt"></i></button> }
                                    </Mutation>
                                </div>
                            </div>
                        )
                })
            :
            (
                <div className='no-favs'>
                    You have no favorite films :'(
                </div>
            )
            }
            </div>
        )
    }
}

export default graphql(gql`
{
    favorites {
        id,
        title,
        poster_path,
        overview
    }
}
`)(Favorites)