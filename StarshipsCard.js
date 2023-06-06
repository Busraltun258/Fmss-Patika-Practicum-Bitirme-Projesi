import {motion} from 'framer-motion';
const StarshipCard = ({item, starshipImages, navigate}) => {
    return (
        <div
            className="card"
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
