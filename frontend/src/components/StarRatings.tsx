import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

interface Props {
  rating: number;
  size?: number;
}

const StarRatings: React.FC<Props> = ({ rating, size }) => {
  return (
    <div className="stars flex">
      {rating > 0 ? (
        <AiFillStar size={size} className="text-amber-500" />
      ) : (
        <AiOutlineStar size={size} />
      )}
      {rating > 1 ? (
        <AiFillStar size={size} className="text-amber-500" />
      ) : (
        <AiOutlineStar size={size} />
      )}
      {rating > 2 ? (
        <AiFillStar size={size} className="text-amber-500" />
      ) : (
        <AiOutlineStar size={size} />
      )}
      {rating > 3 ? (
        <AiFillStar size={size} className="text-amber-500" />
      ) : (
        <AiOutlineStar size={size} />
      )}
      {rating > 4 ? (
        <AiFillStar size={size} className="text-amber-500" />
      ) : (
        <AiOutlineStar size={size} />
      )}
    </div>
  );
};
StarRatings.defaultProps = {
  size: 24,
};
export default StarRatings;
