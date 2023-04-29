import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom";
import axios from "axios";
import '../style/index.css'
import starshipImages from '../assets/data/image.json';

import {useNavigate} from 'react-router-dom';
//.
const BASE_URL = "https://swapi.dev/api/starships/";

export const Starships = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const [starship, setStarship] = useState(null);

    useEffect(() => {
        axios.get(`${BASE_URL}/${id}`)

            .then(response => {
                const {
                    name,
                    model,
                    hyperdrive_rating,
                    max_atmosphering_speed,
                    passengers,
                    manufacturer,
                    cargo_capacity,
                    crew
                } = response.data;
                setStarship({
                    name,
                    model,
                    hyperdrive_rating,
                    max_atmosphering_speed,
                    passengers,
                    manufacturer,
                    cargo_capacity,
                    crew
                });
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const handleGoBack = () => {
        navigate('/');
    }

    if (!starship) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <div className="bg-color">
                <button className="button-size" onClick={handleGoBack}>Go Back</button>
                <div className="box-content">
                    <div className="right-box">
                        <img
                            src={starshipImages.find(image => image.id === id)?.image}
                            alt=""
                        />
                    </div>
                    <div className="card-detail">
                        <div className="left-box">
                            <div className="info">
                                <p>Name:</p>
                                <p>{starship.name}</p>
                            </div>
                            <div className="info">
                                <p>Model:</p>
                                <p>{starship.model}</p>
                            </div>
                            <div className="info">
                                <p>Hyperdrive Rating:</p>
                                <p>{starship.hyperdrive_rating}</p>
                            </div>
                            <div className="info">
                                <p>Max Atmosphering Speed:</p>
                                <p>{starship.max_atmosphering_speed}</p>
                            </div>
                            <div className="info">
                                <p>Passengers:</p>
                                <p>{starship.passengers}</p>
                            </div>
                            <div className="info">
                                <p>Manufacturer:</p>
                                <p>{starship.manufacturer}</p>
                            </div>
                            <div className="info">
                                <p>Cargo Capacity:</p>
                                <p>{starship.cargo_capacity}</p>
                            </div>
                            <div className="info">
                                <p>Crew:</p>
                                <p>{starship.crew}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>


    );
}


export default Starships;
