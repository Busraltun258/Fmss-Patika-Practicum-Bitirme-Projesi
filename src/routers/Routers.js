import {Route, Routes} from "react-router-dom";
import {Home} from "../components/Home";
import Starships from "../components/StarshipsDetail";
//ana sayfa ve yıldız gemisi ayrıntılarını göstermek için farklı bileşenleri kullanarak React Router'ın URL yönlendirmesi özelliğini kullandim.
const Routers=()=>{
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:id" element={<Starships />} />
        </Routes>
    );
}
export default Routers;