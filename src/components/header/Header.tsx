import style from "./style.module.scss";
import styleRatingProps from "./styleRatingProps.module.scss";
import Logo from "../../../public/svg/logo_marusya_w.svg";
import Genres from "../../../public/svg/genres.svg";
import UserOff from "../../../public/svg/user_off.svg";
import UserOn from "../../../public/svg/user_on.svg";
import Search from "../../../public/svg/search.svg";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { RootState } from "../../store/store";
import { openAuthModal } from "../../store/slices/authState";
import { fetchSearchMoviesAsync, searchMoviesSlice } from "../../store/slices/searchMovies";
import Rating from "../rating/Rating";
import formatRuntime from "../../utils/formatTime";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FC, memo, useEffect, useState } from "react";
import { DebounceInput } from 'react-debounce-input';



interface buttonCloseSearchProps {
    handle: () => void
}

const ButtonCloseSearch: FC<buttonCloseSearchProps> = ({ handle }) => {
    return (
        <button className={`flex flex__column ${style.searchResultsClose}`} onClick={handle}>
            <svg width="12.728027" height="12.727905" viewBox="0 0 12.728 12.7279" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                <path id="Vector" d="M6.36 4.94L11.31 0L12.72 1.41L7.77 6.36L12.72 11.31L11.31 12.72L6.36 7.77L1.41 12.72L0 11.31L4.94 6.36L0 1.41L1.41 0L6.36 4.94Z" fillRule="nonzero" />
            </svg>
        </button>
    )
}


const Header: FC = memo(() => {
    const { userData, isAuthorized } = useAppSelector((state: RootState) => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const searchMovies = useAppSelector((state: RootState) => state.search.movies);
    const { clearSearch } = searchMoviesSlice.actions;
    const [searchInput, setSearchInput] = useState('');
    const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);

    const location = useLocation();

    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);

    const BREAKPOINTS = {
        mobile: 769,
        tablet: 993,
    };

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setIsMobile(width < BREAKPOINTS.mobile);
            setIsTablet(width < BREAKPOINTS.tablet);
        };

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleOpenAuthModal = () => {
        dispatch(openAuthModal());
    };

    const handleOpenAccountPage = () => {
        navigate('/account');
    };

    const handleCloseSearch = () => {
        dispatch(clearSearch());
        setSearchInput('')
        isMobile && setIsMobileModalOpen(false)
    }

    const handleOpenMobileModalSearch = () => {
        setIsMobileModalOpen(true)
    }

    useEffect(() => {
        if (searchInput.trim().length >= 2) {
            dispatch(fetchSearchMoviesAsync(searchInput));
        } else {
            dispatch(clearSearch());
        }
    }, [searchInput, dispatch, clearSearch]);

    useEffect(() => {
        handleCloseSearch();
    }, [location.pathname]);

    return (
        <header className={style.header}>
            <div className={`flex ${style.container} ${style.header__container}`}>
                <Link className={style.header__logoLink} to="/">
                    <img className={style.header__logoImg} src={Logo} alt="Logo" />
                </Link>
                <nav className={`flex ${style.header__navMenu}`}>
                    <Link className={`${style.header__navLink} ${style.displayNone}`} to={"/"}>Главная</Link>
                    <Link className={style.header__navLink} to={"/genres"}>
                        {isTablet || isMobile ?
                            <img className={style.mobileImg} src={Genres} alt="Жанры" />
                            :
                            "Жанры"
                        }
                    </Link>

                    {isMobile &&
                        !isMobileModalOpen && <button className={style.header__btnMobile}>
                            <img className={style.mobileImg} src={Search} alt="Поиск фильмов" onClick={handleOpenMobileModalSearch} />
                        </button>
                    }

                    {(!isMobile || isMobileModalOpen) && <div className={`flex ${isMobileModalOpen ? style.searchWrapMobile : style.header__serchWrap}`}>
                        <svg className={style.header__searchSvg} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z" />
                        </svg>

                        <DebounceInput
                            className={`${style.header__search} ${isMobileModalOpen ? style.searchWrapMobile__search : ""}`}
                            type="text"
                            placeholder="Поиск"
                            value={searchInput}
                            onChange={(e) => {
                                setSearchInput(e.target.value);
                            }}
                            debounceTimeout={700}
                        />
                        {(isMobile || isMobileModalOpen) && <ButtonCloseSearch handle={handleCloseSearch} />}

                        {searchMovies && searchInput && (
                            <>
                                <div className={`flex ${style.searchResults}`}>
                                    {searchMovies.length === 0 && <p className={style.searchNone}>Ничего не найдено</p>}
                                    {searchMovies.map(movie => (
                                        <div
                                            className={`flex ${style.searchMovie}`}
                                            key={movie.id}
                                            tabIndex={0}
                                            onClick={() => {
                                                handleCloseSearch();
                                                navigate(`/movies/${movie.id}`);
                                            }}>
                                            <div className={style.searchMovie__img}>
                                                <img src={movie.posterUrl ? movie.posterUrl : "https://dummyimage.com/40x52/fff.gif&text=Poster"} alt="" />
                                            </div>
                                            <div className={`flex flex__column ${style.searchMovieDataWrap}`}>
                                                <div className={`flex ${style.searchMovieDataDescr}`}>
                                                    <Rating styleProps={`${styleRatingProps.rating}`} rating={`${movie.tmdbRating}`} />
                                                    <p className={style.searchMovieDescrText}>{movie.releaseYear}</p>
                                                    <p className={`${style.searchMovieDescrText} ${style.searchMovieDescrGenre}`}>{movie.genres.join(", ")}</p>
                                                    <p className={style.searchMovieDescrText}>{movie.runtime && formatRuntime(movie.runtime)}</p>
                                                </div>
                                                <h3 className={style.searchMovieTitle}>{movie.title}</h3>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {!isMobile && <ButtonCloseSearch handle={handleCloseSearch} />}
                            </>
                        )}

                    </div>}
                </nav>
                <button className={style.header__btnAuth} onClick={isAuthorized ? handleOpenAccountPage : handleOpenAuthModal}>
                    {isTablet || isMobile ?
                        isAuthorized ?
                            <img className={style.mobileImg} src={UserOn} alt="Автоизован" />
                            :
                            <img className={style.mobileImg} src={UserOff} alt="Вход не выполнен!" />
                        :
                        isAuthorized ? userData?.name : "Войти"
                    }
                </button>
            </div >
        </header >
    )
});


export default Header;