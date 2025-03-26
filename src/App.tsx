import "./styles/fonts.scss";
import "./styles/global.scss";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Layout from "./components/layout/Layout";
import GenresPage from "./pages/genres/GenresPage";
import MainPage from "./pages/main/MainPage";
import MoviePage from "./pages/movie/MoviePage";
import FilmsByGenrePage from "./pages/filmsByGenre/FilmsByGenrePage";
import AccountPage from "./pages/account/AccountPage";
import AuthForm from "./components/modals/modalAuth/AuthForm";
import { useAppDispatch } from "./store/hooks";
import { getUserData, setSessionID, setUserDataFromLocalStorage } from "./store/slices/authState";
import { getCookie } from "./utils/cookie";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ModalErrors from "./components/modals/errorsModal/ModalErrors";




const App = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setUserDataFromLocalStorage());

        const sessionID = getCookie('sessionID');
        if (sessionID) {
            dispatch(setSessionID(sessionID));
            const loadUserData = async () => {
                try {
                    await dispatch(getUserData()).unwrap();
                } catch (error) {
                    console.error("Ошибка при загрузке пользовательских данных:", error);
                }
            };
            loadUserData();
        }
    }, [dispatch]);

    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/genres" element={<GenresPage />} />
                    <Route path="/genres/:genre" element={<FilmsByGenrePage />} />
                    <Route path="/movies/:movieId" element={<MoviePage />} />
                    <Route path="/account" element={<AccountPage />} />
                </Route>
            </Routes>
            <Footer />
            <AuthForm />
            <ModalErrors inModal={false} />
        </BrowserRouter>
    )
}


export default App;




