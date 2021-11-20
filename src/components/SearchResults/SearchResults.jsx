import Search from '@mui/icons-material/Search';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

function SearchResults() {
    const [results, setResults] = useState([]);

    const getSearchResults = async () => {
        await axios.get(``)
        .then((res) => {
            setResults(res.data);
            console.log(res.data);
        });
    }

    useEffect(()=> getSearchResults(),[results]);

    return(
        <div>
            <Search/>
        </div>
    )
} 

export default SearchResults;