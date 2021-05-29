import React, {useEffect,useState } from 'react';

const PokemonImg =(props) =>{
    const [src,setSrc] = useState("");

    //if the url in imgUrls equals "ph" (placeholder) fetch the url to the img and set "src" else set "src" to the existing url
    useEffect(()=>{
        if(String(props.imgUrls[props.index]) == "ph"){
            fetch(props.url).then(data=>data.json()).then(data => {
                const url = data.sprites.back_default;
                setSrc(url);
                let arr = [...props.imgUrls];
                arr[props.index] = url;
                props.setImgUrls(arr);
            });
        }
        else{
            setSrc(props.imgUrls[props.index]);
        }
    },[])

    return(
        <img src={src} alt="pokemon"/>
    )
}

export default PokemonImg;