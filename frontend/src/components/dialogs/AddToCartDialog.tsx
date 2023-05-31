import React, { useState } from "react";
import { BiCartAdd } from "react-icons/bi";

interface Props {
  visibility: boolean;
  onClose: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onAction: (qty: number) => void;
}

const AddToCartDialog: React.FC<Props> = ({
  visibility,
  onClose,
  onAction,
}) => {
  const [qty, setQty] = useState(1);
  if (!visibility) return null;
  return (
    <div className="fixed flex justify-center items-center  inset-0 bg-black backdrop-blur-md bg-opacity-5 ">
      <div className="dialogbox bg-white p-4">
        <div className="text-lg font-semibold">Add to cart</div>
        <p>Quantity:</p>
        <input
          className="p-input my-1"
          type="number"
          value={qty}
          onChange={(evt) => setQty(Math.abs(parseInt(evt.target.value)))}
        />

        <div className="flex justify-end">
          <button className="btn btn-red" onClick={onClose}>
            CANCEL
          </button>
          <button className="btn btn-green mx-1 " onClick={() => onAction(qty)}>
            <span className="flex items-center">
              ADD
              <BiCartAdd alphabetic={"add"} size={28} />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddToCartDialog;
