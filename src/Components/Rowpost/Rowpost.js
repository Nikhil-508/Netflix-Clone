import React,{useEffect,useState} from 'react'
import YouTube from 'react-youtube'
import './Rowpost.css'
import axios from '../../axios'
import { imageUrl,API_KEY } from '../../constants/constants'

function Rowpost(props) {
  const [movies, setMovies] = useState([])
  const [id,setId] = useState('')
  const [urlId,setUrlId] = useState('')
  useEffect(() => {
    axios.get(props.url).then((res)=>{
      console.log(res.data)
      setMovies(res.data.results)
    }).catch(err=>{
      // alert('Network error')
    })
   
  }, [])

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  const handleMovie = (id) =>{
    console.log(id)
    axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then(res=>{
      if(res.data.results.length !== 0){
        setUrlId(res.data.results[0])
      }else{
        console.log('Array empty')
      }
      console.log(res.data)
    })
  }
  return (
    <div className='row'>
        <h2> {props.title} </h2>
        <div className='posters'>
          {movies.map((object)=>
            <img onClick={()=>handleMovie(object.id)} className={ props.isSmall ? 'smallPoster': 'poster'} src={`${imageUrl+object.backdrop_path}`} alt="img" />

          )}
        </div>
        { urlId && <YouTube opts={opts} videoId={urlId.key}/> }
    </div>
  )
}

export default Rowpost