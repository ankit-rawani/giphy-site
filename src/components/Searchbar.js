import React from 'react'
import search from "../img/icons/search.png"

function Searchbar(props) {
    return (
        <div>
            <div className="search-div">
                <img src={search} alt="search icon" height="16" width="16" />
                <input className="search-input" type="text" name="query" value={props.query} onChange={(e) => props.setquery(e.target.value)} placeholder="Article name or keywords..." />
            </div>
        </div>
    )
}

export default Searchbar
