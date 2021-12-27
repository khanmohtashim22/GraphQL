import React from 'react'
import { graphql } from 'react-apollo'
import { Link } from 'react-router'
import gql from 'graphql-tag'
import fetchSongs from '../queries/fetchSongs'

const SongList = ({ data, mutate }) => {
  const { loading, songs, refetch } = data

  const onSongDelete = id => {
    mutate({
      variables: {
        id
      }
    }).then(() => refetch())
  }

  if (loading) {
    return <div>...loading</div>
  }

  return (
    <div>
      <ul className='collection'>
        {
          songs.map(({ id, title }) => (
            <li 
              key={id} 
              className='collection-item'
            >
              <Link to={`songs/${id}`}>{title}</Link>
              <i 
                className='material-icons' 
                onClick={() => onSongDelete(id)}
              >delete</i>
            </li>
          ))
        }
      </ul>
      <Link to="/songs/new" className='btn-floating btn-large red right'>
        <i className='material-icons'>add</i>
      </Link>
    </div>
  )
}

const mutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
      title
    }
  }
` 

// **** NOTE query is not RETURNED instead a data object is returned.

// Also component will rerender twice. Once with no songs and it will make the request
// then component will rerender again finally with songs on object

// loading is from data object
export default graphql(mutation)(
  graphql(fetchSongs)(SongList)
)
