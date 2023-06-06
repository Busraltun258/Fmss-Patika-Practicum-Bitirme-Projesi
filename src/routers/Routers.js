import {Route, Routes} from "react-router-dom";
import {Home} from "../components/Home";
import {StarshipsDetail} from "../components/StarshipsDetail";
const Routers=()=>{
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:id" element={<StarshipsDetail/>} />
        </Routes>
    );
}
export default Routers;