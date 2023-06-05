import React, { useState } from "react";
import { AiFillDelete } from "react-icons/ai";

interface Props {
  visibility: boolean;
  onClose: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onAction: () => void;
}

const DeleteProduct: React.FC<Props> = ({ visibility, onClose, onAction }) => {
  if (!visibility) return null;
  return (
    <div className="z-30 fixed flex justify-center items-center  inset-0 bg-black backdrop-blur-md bg-opacity-5 ">
      <div className="dialogbox bg-white p-4">
        <div className="text-lg font-semibold">Do you wish to DELETE DINO?</div>

        <div className="flex justify-end pt-12">
          <button className="btn btn-red" onClick={onClose}>
            CANCEL
          </button>
          <button className="btn btn-green mx-1 " onClick={onAction}>
            <span className="flex items-center">
              DELETE
              <AiFillDelete alphabetic={"add"} size={28} />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProduct;
