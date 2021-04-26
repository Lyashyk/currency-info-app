import cn from "classnames";

import "./icon-favorites.css";

const IconFavorites = ({ isFavorites }) => {
  return (
    <svg
      viewBox="0 0 36 36"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("IconStar", { "IconStar--favorites": isFavorites })}
    >
      <path d="M25.1 29.5c-.1 0-.3 0-.4-.1L18 24.5l-6.7 4.8c-.2.2-.5.2-.8 0-.2-.2-.3-.5-.2-.7l2.6-7.8L6.1 16c-.2-.2-.3-.5-.2-.7s.3-.5.6-.5h8.3L17.4 7c.1-.3.3-.4.6-.4s.5.2.6.4l2.6 7.8h8.3c.3 0 .5.2.6.5s0 .6-.2.7l-6.7 4.8 2.6 7.8c.1.3 0 .6-.2.7-.2.1-.4.2-.5.2z" />
    </svg>
  );
};

export default IconFavorites;
