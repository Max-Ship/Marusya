import { FC } from "react";


interface BtnCloseProps {
    style: string,
    onClose: () => void,
}

const ButtonClose: FC<BtnCloseProps> = ({ style, onClose }) => {
    return (
        <button className={`flex flex__column ${style}`} onClick={onClose}>
            <svg width="24.000000" height="24.000000" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                <defs>
                    <clipPath id="clip65_1847">
                        <rect id="icon" rx="0.000000" width="23.000000" height="23.000000" transform="translate(0.500000 0.500000)" fill="white" fillOpacity="0" />
                    </clipPath>
                </defs>
                <rect id="icon" rx="0.000000" width="23.000000" height="23.000000" transform="translate(0.500000 0.500000)" fill="#FFFFFF" fillOpacity="0" />
                <g clipPath="url(#clip65_1847)">
                    <path id="Vector" d="M10.58 12L2.79 4.2L4.2 2.79L12 10.58L19.79 2.79L21.2 4.2L13.41 12L21.2 19.79L19.79 21.2L12 13.41L4.2 21.2L2.79 19.79L10.58 12Z" fill="#000000" fillOpacity="1.000000" fillRule="nonzero" />
                </g>
            </svg>
        </button>
    )
}


export default ButtonClose;