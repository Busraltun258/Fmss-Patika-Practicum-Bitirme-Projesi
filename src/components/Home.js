import background_image from '../assets/image/home-page-background-image.jpeg'
import '../style/index.css'
import {StarshipsCardList} from "./StarshipsCardList";

export const Home = () => {
//StarshipsCardList componenti her bir uzay gemisi bilgilerini alır
// ve her bir uzay gemisi için bir kart olsuşturur ardından kartları anasayfada gösterir.

    return (
        <>

            <div className="bg">
                <img src={background_image} alt=""/>
            </div>


            <StarshipsCardList/>


        </>
    )
}
