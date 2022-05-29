import React from 'react'

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
        </div>
    )
}

export default Results;
