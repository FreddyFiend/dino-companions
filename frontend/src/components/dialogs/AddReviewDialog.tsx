import React, { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BiCartAdd } from "react-icons/bi";

interface reviewDto {
  rating: number;
  text: string;
}

interface Props {
  visibility: boolean;
  onClose: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onAction: (data: reviewDto) => void;
}

const AddReviewDialog: React.FC<Props> = ({
  visibility,
  onClose,
  onAction,
}) => {
  const [text, setText] = useState("");
  const [rating, setRating] = useState(1);
  if (!visibility) return null;
  return (
    <div className="fixed flex justify-center items-center  inset-0 bg-black backdrop-blur-md bg-opacity-5 ">
      <div className="dialogbox bg-white p-4">
        <div className="text-lg font-semibold">Add Review</div>
        <p>Review:</p>
        <textarea
          value={text}
          rows={4}
          cols={40}
          onChange={(evt) => setText(evt.target.value)}
          className="bg-gray-100 border rounded"
        />
        <p className="pt-2">Rating:</p>
        <div className="flex ">
          <div onClick={() => setRating(1)} className="hover:cursor-pointer">
            {rating > 0 ? (
              <AiFillStar size={24} className="text-amber-500" />
            ) : (
              <AiOutlineStar size={24} />
            )}
          </div>

          <div onClick={() => setRating(2)} className="hover:cursor-pointer">
            {rating > 1 ? (
              <AiFillStar size={24} className="text-amber-500" />
            ) : (
              <AiOutlineStar size={24} />
            )}
          </div>
          <div onClick={() => setRating(3)} className="hover:cursor-pointer">
            {rating > 2 ? (
              <AiFillStar size={24} className="text-amber-500" />
            ) : (
              <AiOutlineStar size={24} />
            )}
          </div>
          <div onClick={() => setRating(4)} className="hover:cursor-pointer">
            {rating > 3 ? (
              <AiFillStar size={24} className="text-amber-500" />
            ) : (
              <AiOutlineStar size={24} />
            )}
          </div>
          <div onClick={() => setRating(5)} className="hover:cursor-pointer">
            {rating > 4 ? (
              <AiFillStar size={24} className="text-amber-500" />
            ) : (
              <AiOutlineStar size={24} />
            )}
          </div>
        </div>
        <div className="flex justify-end pt-2">
          <button className="btn btn-red" onClick={onClose}>
            CANCEL
          </button>
          <button
            className="btn btn-green mx-1 "
            onClick={() => onAction({ text, rating })}
          >
            <span className="flex items-center">SUBMIT REVIEW</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddReviewDialog;
