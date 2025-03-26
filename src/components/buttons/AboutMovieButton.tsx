import style from "./style.module.scss";
import { FC, } from 'react';
import { Link } from 'react-router-dom';


interface AboutMovieButtonProps {
    movieId: string;
}

const AboutMovieButton: FC<AboutMovieButtonProps> = ({ movieId }) => {
    return (
        <Link className={`${style.buttonSecond} ${style.btnPaddingUI}`} to={`/movies/${movieId}`}>
            О фильме
        </Link>
    );
};


export default AboutMovieButton;