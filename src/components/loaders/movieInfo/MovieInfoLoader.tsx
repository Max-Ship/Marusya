import { LoaderProps } from "../../../types/types";
import style from "./style.module.scss";
import { FC } from "react";


const MovieInfoBlockLoader: FC<LoaderProps> = ({ isContainer }) => {
    return (
        <div className={`flex ${style.loaderMovieInfo} ${isContainer && style.container}`}>
            <div className={`flex flex__column ${style.loaderMovieInfo__leftBlock}`}>
                <div className={style.loaderMovieInfo__descr}></div>
                <div className={style.loaderMovieInfo__title}></div>
                <div className={style.loaderMovieInfo__plot}></div>
                <div className={style.loaderMovieInfo__wrapButton}></div>
            </div>
            <div className={style.loaderMovieInfo__rightBlock}></div>
        </div>
    );
};


export default MovieInfoBlockLoader;