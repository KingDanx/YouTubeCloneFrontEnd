import React, { useState, useEffect } from 'react';

function SearchResults({image, title, results}) {
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
            {results.map((vid, i) => <p key={i}>{vid.snippet.title}</p>)}
        </div>
    )
} 

export default SearchResults;