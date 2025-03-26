import { UtilsDict } from "../../types/types";
import adventure from "/img/adventure.png";
import comedy from "/img/comedy.png";
import crime from "/img/crime.png";
import drama from "/img/drama.png";
import family from "/img/family.png";
import fantasy from "/img/fantasy.png";
import history from "/img/history.png";
import thriller from "/img/thriller.png";
import horror from "/img/horror.jpg";
import scifi from "/img/scifi.jpg";
import standUp from "/img/standUp.jpg";
import mystery from "/img/mystery.jpg";
import romance from "/img/romance.jpg";
import music from "/img/music.jpg";
import tvMovie from "/img/tvMovie.jpg";
import documentary from "/img/documentary.jpg";
import action from "/img/action.jpg";
import western from "/img/western.jpg";
import animation from "/img/animation.jpg";
import war from "/img/war.jpg";


export const genresList: UtilsDict = {
    'history': ['Исторические', history],
    'horror': ['Ужасы', horror],
    'scifi': ['Sci-Fi', scifi],
    'stand-up': ['Stand-Up', standUp],
    'fantasy': ['Фантастика', fantasy],
    'drama': ['Драма', drama],
    'mystery': ['Мистические', mystery],
    'family': ['Семейные', family],
    'comedy': ['Комедии', comedy],
    'romance': ['Романсы', romance],
    'music': ['Мьюзиклы', music],
    'crime': ['Криминальные', crime],
    'tv-movie': ['ТВ', tvMovie],
    'documentary': ['Документальные', documentary],
    'action': ['Экшен', action],
    'thriller': ['Триллер', thriller],
    'western': ['Вестерн', western],
    'animation': ['Анимация', animation],
    'war': ['Военные', war],
    'adventure': ['Приключения', adventure],
}
