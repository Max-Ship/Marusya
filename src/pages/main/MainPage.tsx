import style from "./style.module.scss";
import RandomMovieBlock from "../../blocks/randomMovieBlock/RandomMovieBlock";
import Top10MoviesBlock from "../../blocks/topMoviesBlock/Top10MoviesBlock";
import { FC, memo } from 'react';


const MainPage: FC = () => {
    return (
        <div className={`flex flex__column ${style.container}`}>
            <div className={style.randomBlock}>
                <RandomMovieBlock />
            </div>
            <div className={style.topBlock}>
                <Top10MoviesBlock />
            </div>
        </div>
    );
};


export default memo(MainPage);