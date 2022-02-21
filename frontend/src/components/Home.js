import Navbar from "./Navbar";
import CardsLayout from "./CardsLayout";
import CreateNote from "./CreateNote";

const Home = () => {
    return (
        <div>
            <Navbar active={"home"} />
            <CreateNote />
            <CardsLayout />
        </div>
    );
};

export default Home;
