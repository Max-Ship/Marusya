import { MovieListProps } from "../../types/types";
import { FC, memo } from "react";


const MovieList: FC<MovieListProps> = memo(({ children, styleProp }) => {
    return (
        <ul className={`flex  ${styleProp}`}>
            {children}
        </ul>
    )
})


export default (MovieList);