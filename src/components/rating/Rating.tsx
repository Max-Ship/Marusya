import ratingStyle from "./ratingStyle.module.scss";
import Star from "../../../public/svg/star.svg";
import { FC } from 'react';


interface RatingProps {
    rating: string;
    styleProps: string;
}

const Rating: FC<RatingProps> = ({ rating, styleProps }) => {
    const getRatingStyle = (rating: string): string => {
        const ratingValue = parseFloat(rating);

        if (ratingValue < 5) {
            return ratingStyle.ratingRed;
        } else if (ratingValue >= 5 && ratingValue < 7) {
            return ratingStyle.ratingGrey;
        } else if (ratingValue >= 7 && ratingValue < 8) {
            return ratingStyle.ratingGreen;
        } else if (ratingValue >= 8) {
            return ratingStyle.ratingGold;
        } else {
            return ratingStyle.ratingRed;
        }
    };

    const styleOfRating = getRatingStyle(rating);

    return (
        <div className={`flex ${styleProps} ${styleOfRating}`}>
            <img src={Star} alt="Rating" />
            <span>{parseFloat(rating).toFixed(1)}</span>
        </div>
    )
}


export default Rating;