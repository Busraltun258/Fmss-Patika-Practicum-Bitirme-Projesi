import {useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import starshipImages from '../assets/data/image.json';
import '../style/index.css'
import {IoSearch} from "react-icons/io5";
import StarshipsCard from "./StarshipsCard";
import background_image from "../assets/image/home-page-background-image.jpeg";

const BASE_URL = "https://swapi.dev/api/starships/";
export const Home = () => {
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [totalShips, setTotalShips] = useState(0)
    const [isSearched, setIsSearched] = useState(false)
    let navigate = useNavigate();
    useEffect(() => {
        setLoading(true);
        if (!isSearched) {

            axios.get(`${BASE_URL}?page=${page}`)

                .then((response) => {
                    setResults([...results, ...response.data.results]);
                    setTotalShips(response.data.count)
                })
                .catch((error) => {
                    console.error(error);
                })
                .finally(() => {
                    setLoading(false);

                });
        } else {
            axios.get(`${BASE_URL}?search=${searchQuery}&page=${page}`)
                .then(
                    (response) => {
                        setResults([...results, ...response.data.results]);
                        setTotalShips(response.data.count)
                    }

                )

                .catch((error) => {
                    console.error(error);
                })
                .finally(() => {
                    setLoading(false);

                });

        }

    }, [page, isSearched]);

    const handleLoadMore = () => {
        setPage(page + 1)
    };
    const handleSearch = async (e) => {
        e.preventDefault();
        setResults([])
        if (searchQuery) {
            setIsSearched(true)

        } else {
            setIsSearched(false)
        }
        setPage(1)
        setLoading(true);

        axios.get(`${BASE_URL}?search=${searchQuery}`)
            .then(response => {
                setResults(response.data.results);
                setTotalShips(response.data.count);
            })
            .catch(error => {
                console.error(error);
            })
            .finally(() => {
                setLoading(false);

            });


    };

    return (
        <>
            <div className="bg">
                <img src={background_image} />
            </div>

            <div className="home">

                <div className="search-bar">

                    <form onSubmit={handleSearch}>

                        <input
                            type="search"
                            placeholder="Search Starships"
                            className="search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={(e) => e.target.placeholder = ''}
                            onBlur={(e) => e.target.placeholder = 'Search Starships'}
                        />

                        <button className="button-icon">
                            <IoSearch/>
                        </button>

                    </form>


                </div>

                <div className="content">
                    {results.map((item, index) => (

                        <StarshipsCard
                            key={index}
                            item={item}
                            starshipImages={starshipImages}
                            navigate={navigate}
                        />

                    ))}

                </div>

                <div className="message">
                    {!loading && results.length === 0 && (
                        <p>No starships found.</p>
                    )}
                </div>

                <div className="loadButton">
                    <p> Starships Count: {results.length}</p>

                    {loading && <p>Loading...</p>}
                    {!loading && results.length < totalShips &&

                        <button className="button-size" onClick={handleLoadMore}>

                            Load Starships
                        </button>


                    }
                </div>
            </div>
        </>
    );
};






