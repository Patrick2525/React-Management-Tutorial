import React from 'react'

function Customer(props) {

    return (
        <div>
            <CustomerProfile id={props.id} image={props.image}/>
            <CustomerInfo name={props.name} birthday={props.birthday} gender={props.gender} job={props.job}/>
        </div>
    )
}

function CustomerProfile(props) {
    return (
        <div>
            <img src={props.image} alt='profile'/>
            <h2>{props.id}</h2>
        </div>
    )
}

function CustomerInfo(props) {
    return (
        <div>
            <h2>{props.name}</h2>
            <p>{props.birthday}</p>
            <p>{props.gender}</p>
            <p>{props.job}</p>
        </div>
    )
}

export default Customer