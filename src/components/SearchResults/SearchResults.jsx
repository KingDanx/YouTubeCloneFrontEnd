import React, { useState, useEffect } from 'react';

function SearchResults({results}) {
    // const [results, setResults] = useState([]);

    // const getSearchResults = async () => {
    //     await axios.get(``)
    //     .then((res) => {
    //         setResults(res.data);
    //         console.log(res.data);
    //     });
    // }

    // useEffect(()=> getSearchResults(),[results]);

    return(
        <div>
            {results.map((vid, i) => <div>
                <p key={i}>{vid.snippet.title}</p>
                <img src={vid.snippet.thumbnails.medium.url}/> 
                </div>)}
        </div>
    )
} 

export default SearchResults;