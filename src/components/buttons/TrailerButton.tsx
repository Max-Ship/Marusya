import style from "./style.module.scss";
import { typeMovie } from "../../types/types";
import ModalMoviePlayer from "../modals/modalMoviePlayer/ModalMoviePlayer";
import { FC, useState } from 'react';


interface TrailerButtonProps {
    movie: typeMovie;
}

const TrailerButton: FC<TrailerButtonProps> = ({ movie }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenTrailer = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <button className={`${style.buttonPrimery} ${style.btnPaddingUI}`} onClick={handleOpenTrailer}>
                Трейлер
            </button>
            <ModalMoviePlayer
                isOpen={isModalOpen}
                movie={movie}
                onClose={handleCloseModal}
            />
        </>
    );
};


export default TrailerButton;