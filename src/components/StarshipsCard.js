import {motion} from 'framer-motion';
// Bu componenet yıldız gemilerinin kartlarının oluşturulması için bir bileşendir.
// Bu yıldız gemilerinin listesini görmek için bir dizi yıldız gemisi kartı bileşenini içeren
//StarshipsCardList componenti içine dahil ettim.
const StarshipCard = ({item, starshipImages, navigate}) => {
    return (
        <div
            className="card"
            key={item.id}
            onClick={() =>
                navigate(`/${item.url.slice(item.url.indexOf('starships/') + 'starships/'.length, -1)}`)
            }
        >
            <motion.img
                whileHover={{scale: 1.2}}
                src={
                    starshipImages.find(
                        (image) => image.id === item.url.slice(item.url.indexOf('starships/') + 'starships/'.length, -1)
                    )?.image
                }
                alt=""
            />
            <div className="title">
                <h3 className="titleName">{item.name}</h3>
                <h3>{item.model}</h3>
                <h3 className="titleRating">{item.hyperdrive_rating}</h3>
            </div>
        </div>
    );
};

export default StarshipCard;
