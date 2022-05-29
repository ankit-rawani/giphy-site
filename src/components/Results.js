import React from 'react'
import Pagination from './Pagination';

function Results(props) {
    if(!props.isLoaded) return <div>Loading...</div>

    return (
        <div>
            <div className="card-layout">
                { 
                    props.data.map(item => {
                        return (
                            <div className="card" key={item.id}>
                                <img src={item.images.original.webp} alt={item.title} />
                                <h2>{item.title}</h2>
                                <p>@{item.username}</p>
                            </div>);
                    }) 
                }
            </div>
            
            <Pagination onPageChange={props.setPage} totalCount={props.total} siblingCount={1} currentPage={props.currentPage} pageSize={6} />
        </div>
    )
}

export default Results;
