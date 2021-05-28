import React,{useState,useEffect} from 'react';
import getPokemons from '../service/getPokemons';
import PokemonImg from './PokemonImg';

const pokemonUrl = "https://pokeapi.co/api/v2/pokemon?limit=100&offset=200";

function PokemonList(){
  const [pokemons,setPokemons] = useState([]);
  const [showImg,setShowImg] = useState([]);
  const [showList,setShowList] = useState(true);
  const [pokemonInfo,setPokemonInfo] = useState([]);
  const [target,setTarget] = useState(0);
  const [imgUrls,setImgUrls] = useState([]);
  const [targetIndex,setTargetIndex] = useState();

  useEffect(()=>{
     getPokemons(pokemonUrl).then(result => {
      setPokemons(result);
      if(showImg.length == 0){
        let arr = [];
      result.forEach(element => {
        arr.push(false);
      });
      setShowImg(arr);
      setImgUrls(arr.map((row)=>{
        return "ph"
      }));
      }
     });
  },[])

  const handleOnClick = (e) =>{
    const index = e.target.id;
    setTarget(index);
    setTargetIndex(index);
    const arr = [...showImg];
    arr[index]= true;
    setShowImg(arr);
    setShowList(false);
   
    fetch(pokemons[index].url).then(data=>data.json()).then(data=>data.abilities).then(abilities=>{
      let arr=[];
      for (let index = 0; index < abilities.length; index++) {
       arr.push(abilities[index].ability.name);      
      }
     setPokemonInfo(arr);
    });  
  }

  const handleReturnClick = (e) =>{
    setShowList(true);
  }

  return(
    <div>
    {showList ? 
        <div id="list">
        {
          pokemons.map((row,index)=>{
            if(index !== 0){
                if(showImg[index]){
                  return (<div key={index}>
                    <div className="imgAndName">
                    <PokemonImg url={row.url} setImgUrls={setImgUrls} imgUrls={imgUrls} index={index}/>  
                    <h3 className="name1" id={index} onClick={handleOnClick}>{row.name}</h3>
                    </div>
                  </div>)
                }
                else{
                  return (<div key={index}>
                    <h3 className="name" id={index} onClick={handleOnClick}>{row.name}</h3>
                  </div>)
                }
              }
            return (<h1 key={index}>Pokemons</h1>)
          })
        }
      </div>
      :
      <div>
        <PokemonImg url={pokemons[target].url} setImgUrls={setImgUrls} imgUrls={imgUrls} index={targetIndex}/> 
        <h3>Name: {pokemons[target].name}</h3>
        <h3>Abilities</h3>
        {pokemonInfo.map((row,index)=>{
          return <h4 key={index}>-{row}</h4>
        })}
        <input type="button" value="Return" onClick ={handleReturnClick}/>
      </div>
      }
  </div >
  )
}

export default PokemonList;

