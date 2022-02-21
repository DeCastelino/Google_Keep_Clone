import Navbar from "./Navbar";
import CardsLayout from "./CardsLayout";

const Trash = () => {
    return (
        <div>
            <Navbar active={"trash"} />
            <CardsLayout />
        </div>
    );
};

export default Trash;
