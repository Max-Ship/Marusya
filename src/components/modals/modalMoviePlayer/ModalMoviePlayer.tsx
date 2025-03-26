import style from './style.module.scss';
import { useAppDispatch } from '../../../store/hooks';
import { RootState } from '../../../store/store';
import { typeMovie } from '../../../types/types';
import { setVolume, play, pause, setCurrentTime } from '../../../store/slices/player';
import ButtonClose from '../../buttonClose/ButtonClose';
import { FC, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { useSelector } from 'react-redux';


interface ModalMoviePlayerProps {
    isOpen: boolean;
    movie: typeMovie;
    onClose: () => void;
}

const ModalMoviePlayer: FC<ModalMoviePlayerProps> = ({ isOpen, movie, onClose }) => {
    const dispatch = useAppDispatch();
    const isPlaying = useSelector((state: RootState) => state.player.isPlaying);
    const volume = useSelector((state: RootState) => state.player.volume);
    const currentTime = useSelector((state: RootState) => state.player.currentTime);
    const [duration, setDuration] = useState(0);
    const playerRef = useRef<ReactPlayer>(null);
    const [isHovering, setIsHovering] = useState(false);

    const handlePlayPause = () => {
        if (isPlaying) {
            dispatch(pause());
        } else {
            dispatch(play());
        }
    };

    const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = Number(event.target.value);
        dispatch(setVolume(newVolume / 100));
    };

    const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
        const time = parseFloat(event.target.value);
        dispatch(setCurrentTime(time));
        playerRef.current?.seekTo(time);
    };

    if (!isOpen) return null;

    return (
        <div className={`flex flex__column ${style.modalOverlay}`} onTouchStart={() => setIsHovering(true)}>
            <div className={style.modalContent}>
                <ButtonClose style={`flex flex_cplumn ${style.closeButton}`} onClose={onClose} />
                <div className={style.playerWrap} onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)} onTouchStart={() => setIsHovering(false)}
                >
                    <ReactPlayer
                        url={movie.trailerUrl || `https://www.youtube.com/watch?v=${movie.trailerYouTubeId}`}
                        playing={isPlaying}
                        controls={false}
                        width="100%"
                        height="100%"
                        volume={volume}
                        onProgress={(progress) => {
                            dispatch(setCurrentTime(progress.playedSeconds));
                        }}
                        onDuration={(duration) => setDuration(duration)}
                        onPlay={() => dispatch(play())}
                        onPause={() => dispatch(pause())}
                        ref={playerRef}
                    />
                    <div className={`${style.movieTitle} ${isHovering ? style.movieTitle__show : style.movieTitle__notShow}`}>{movie.title}</div>
                    <button className={`flex flex__column ${style.playPauseButton} ${isHovering ? style.visible : style.hidden}`} onClick={handlePlayPause}>
                        {isPlaying ?
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 3H8V21H6V3ZM16 3H18V21H16V3Z" fill="black" />
                            </svg>
                            :
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 20.1957V3.80421C6 3.01878 6.86395 2.53993 7.53 2.95621L20.6432 11.152C21.2699 11.5436 21.2699 12.4563 20.6432 12.848L7.53 21.0437C6.86395 21.46 6 20.9812 6 20.1957Z" fill="black" />
                            </svg>
                        }
                    </button>
                </div>
                <div className={`${style.controls} ${isHovering ? style.visible : style.hidden}`}>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={volume * 100}
                        onChange={handleVolumeChange}
                        className={style.volumeControl}
                    />
                    <input
                        type="range"
                        min={0}
                        max={duration}
                        value={currentTime}
                        onChange={handleSeek}
                        className={style.timeIndicator}
                    />
                    <div className={style.timeDisplay}>
                        {new Date(currentTime * 1000).toISOString().slice(14, 19)}
                    </div>
                </div>
            </div>
        </div>
    );
};


export default ModalMoviePlayer;
