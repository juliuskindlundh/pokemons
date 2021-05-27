import React, {useEffect,useState } from 'react';

const PokemonImg =(props) =>{
    const [src,setSrc] = useState("");

    useEffect(()=>{
        fetch(props.url).then(data=>data.json()).then(data => setSrc(data.sprites.back_default));
    })

    return(
        <img src={src} alt="pokemon"/>
    )
}

export default PokemonImg;