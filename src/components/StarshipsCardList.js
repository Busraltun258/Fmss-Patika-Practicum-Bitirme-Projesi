import {useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import starshipImages from '../assets/data/image.json';
import '../style/index.css'
import {IoSearch} from "react-icons/io5";
import InfiniteScroll from "react-infinite-scroll-component";
import StarshipsCard from "./StarshipsCard";

const BASE_URL = "https://swapi.dev/api/starships/";
// Burda page ve isSearched statleri degiştiğinde useEffect hookunun içindeki fonksiyon çalışır.
// isSearched, arama yapılıp yapılmadığını belirleyen bir boolean değişkenidir.
// Eğer arama yapılmadıysa (yani isSearched = false),
// ilk 10 uzay gemisi sonucunu getiren bir GET isteği yapılır.
// Arama yapıldığında (isSearched = true) ise, arama sorgusunu (searchQuery) ve sayfa numarasını (page) kullanarak bir GET isteği daha yapılır.
// Eğer sayfa numarası 1 değilse, results state'ine yeni gelen veriler eklenir. Bu şekilde sayfalama sağlanır.
// finally bloğu, isteğin tamamlanmasını bekleyen işlemleri içerir. setLoading(true) ile yükleniyor ekranı aktif hale getirilir,
// setLoading(false) ile yükleniyor ekranı pasif hale getirilir.
export const StarshipsCardList = () => {
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
            if (page !== 1) {
                try {
                    axios.get(`${BASE_URL}?search=${searchQuery}&page=${page}`)
                        .then(
                            (response) => {
                                setResults([...results, ...response.data.results]);
                                setTotalShips(response.data.count)
                            }
                        );

                } catch (error) {
                    console.error(error);
                } finally {
                    setLoading(false);
                }
            }
        }

    }, [page, isSearched]);
//Bu kod, kullanıcının "Load Starships" butonuna tıklaması durumunda sayfada görüntülenen uzay gemilerinin sayfasını bir artırır ve
// bir sonraki sayfayı yükler.
    const handleLoadMore = () => {
        setPage(page + 1)
    };

    // İlk önce, eğer arama sorgusu varsa, kullanıcının arama yaptığını belirlemek için isSearched durumunu true olarak ayarlar ve
    // önceki arama sonuçlarını temizlemek için results durumunu boş bir dizi olarak ayarlar.
    // Gelen yanıtı aldıktan sonra, setResults() ve setTotalShips() fonksiyonlarını kullanarak yanıtın sonuçlarını ve toplam sayısını günceller.
    // En sonunda, setLoading(false) kullanarak yükleniyor durumunu false olarak ayarlar ve
    // arama sonuçlarını görüntülemek için starshipsCardList bileşenini tekrar render eder.
    const handleSearch = async (e) => {
        if (searchQuery) {
            setIsSearched(true)
            setResults([])
        } else {
            setIsSearched(false)
        }
        setPage(1)
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.get(`${BASE_URL}?search=${searchQuery}`);
            setResults(response.data.results);
            setTotalShips(response.data.count)
        } catch (error) {
            console.error(error);
        } finally {

            setLoading(false);


        }


    };

    return (
        <>
            <div className="home">
                <p>Total Starships: {totalShips}</p>

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

                        <button className="button-icon" onClick={handleSearch}>
                            <IoSearch/>
                        </button>

                    </form>


                </div>

                <div className="content">
                    {/*<InfiniteScroll*/}
                    {/*    dataLength={results.length}*/}
                    {/*    next={handleLoadMore}*/}
                    {/*    hasMore={hasMore}*/}
                    {/*    loader={<h4>Yükleniyor...</h4>}*/}
                    {/*>*/}
                    {/*    <div className="card-container">*/}
                    {/*        {results.map((item) => (*/}
                    {/*            <div*/}
                    {/*                className="card"*/}
                    {/*                key={item.name}*/}
                    {/*                onClick={() => navigate(`/${item.url.slice(item.url.indexOf('starships/') + 'starships/'.length, -1)}`)}*/}
                    {/*            >*/}
                    {/*                <motion.img*/}
                    {/*                    whileHover={{ scale: 1.2 }}*/}
                    {/*                    src={*/}
                    {/*                        starshipImages.find((image) => image.id === item.url.slice(item.url.indexOf('starships/') + 'starships/'.length, -1))?.image ||*/}
                    {/*                        'https://static.wikia.nocookie.net/starwars/images/2/24/TantiveIV-TSWB.png/revision/latest?cb=20221006055135'*/}
                    {/*                    }*/}
                    {/*                    alt=""*/}
                    {/*                />*/}
                    {/*                <div className="title">*/}
                    {/*                    <h3 className="titleName">{item.name}</h3>*/}
                    {/*                    <h3>{item.model}</h3>*/}
                    {/*                    <h3 className="titleRating">{item.hyperdrive_rating}</h3>*/}
                    {/*                </div>*/}
                    {/*            </div>*/}
                    {/*        ))}*/}
                    {/*    </div>*/}
                    {/*</InfiniteScroll>*/}
                    {results.map((item) => (

                        <StarshipsCard
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






