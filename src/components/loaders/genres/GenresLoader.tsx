import style from './style.module.scss';
import { FC } from 'react';


const LoaderCard: FC = () => {
    return (
        <div className={style.loaderCard}>
            <div className={style.loaderCard__poster} />
        </div>
    );
};

const GenresLoader: FC = () => {
    return (
        <div className={style.container}>
            <div className={style.loader}>
                <span className={style.loader__title}></span>
                <div className={`flex ${style.loader__flex}`}>
                    {Array.from({ length: 8 }, (_, index) => (
                        <LoaderCard key={index} />
                    ))}
                </div>
            </div>
        </div>
    );
};


export default GenresLoader;
