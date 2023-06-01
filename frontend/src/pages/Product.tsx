import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { addReviewFn, getProduct } from "../routes/usersApi";
import cartStore from "../providers/cartStore";
import AddToCartDialog from "../components/dialogs/AddToCartDialog";
import { CartItemDto } from "../@types/cartItem";
import { toast } from "react-toastify";
import AddReviewDialog from "../components/dialogs/AddReviewDialog";
import StarRatings from "../components/StarRatings";
import userStore from "../providers/userStore";
import { Card } from "../components";
import { productDto } from "../@types/product";
import { Link } from "react-router-dom";

const Product = () => {
  let { id } = useParams();
  const { user } = userStore();
  const { addCartItem, cartItems } = cartStore();

  const [showCartDialog, setShowCartDialog] = useState(false);
  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const [date, setDate] = useState<Date>();
  const { data, isError, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id || ""),
  });

  useEffect(() => {
    if (!data) return;
    const newDate = new Date(data[1].updatedAt);
    console.log(data);
    setDate(newDate);
  }, [data]);

  const { mutate: addReview } = useMutation(
    (reviewData: ReviewDto) => addReviewFn(reviewData),
    {
      onMutate() {
        // store.setRequestLoading(true);
      },
      onSuccess: (res) => {
        toast.success(`Successfully added review!`);
        console.log(res);

        /*  store.setRequestLoading(false);
   
        navigate(from); */
      },
      onError: (error: any) => {
        //store.setRequestLoading(false);
        if (Array.isArray((error as any).response.data.message)) {
          console.log("yes this ran");
          (error as any).response.data.message.forEach((el: any) =>
            toast.error(el, {
              position: "top-right",
            })
          );
          console.log(error);
        } else {
          console.log(error);
          toast.error((error as any).response.data.message, {
            position: "top-right",
          });
        }
      },
    }
  );
  const addToCart = (qty: number) => {
    const itemExists = cartItems.some(
      (el: CartItemDto) => data[1].id === el.id
    );

    if (itemExists)
      return toast.error("Item is already in the cart! ", {
        position: "top-right",
      });
    addCartItem({
      id: data[1].id,
      title: data[1].title,
      qty,
      imageThumb: data[1].imageThumb,
      price: data[1].price,
    });
  };

  const hideDialogs = () => {
    setShowReviewDialog(false);
    setShowCartDialog(false);
  };

  return (
    <div className="p-4">
      Product Page
      {isLoading && <div className="text-xl">Loading...</div>}
      {isError && <div className="text-xl">Product not found!</div>}
      {data && (
        <div className="md:flex">
          {" "}
          <div className="image  my-2 basis-2/3">
            <img src={`${data[1].imageUrl}`} alt="" className="" />
          </div>
          <div className="side md:ml-2 basis-1/3">
            <h3 className="text-3xl font-semibold py-2 ">{data[1].title}</h3>
            <Link to={`/profile/${data[1].seller.id}`}>
              <h3 className="text-xl font-bold text-indigo-500">
                {data[1].seller.name}
              </h3>
            </Link>
            <div className=" md:block justify-center  pt-2">
              <div className="">
                <h2 className="text-2xl font-bold">Price: ${data[1].price}</h2>
                <StarRatings rating={data[0]?._avg?.rating} />

                <div>
                  Total Reviews: {JSON.stringify(data[0]._count.rating)}
                </div>

                <p className="text-lg font-semibold">
                  Stock left: {data[1].quantity}
                </p>
                <div className="text-sm">{date?.toDateString()}</div>
              </div>
              {/* 
          <div>{data.description}</div>
          
          {data.updatedAt}
          
        {data.seller.name} */}
              <button
                className="btn btn-blue mt-4 w-full"
                onClick={() => setShowCartDialog(true)}
              >
                Add to cart
              </button>

              {data[1].reviews[0] ? (
                <div className="pt-2">
                  <span className="font-semibold text-lg">My Review: </span>
                  {data[1].reviews.map((review: ReviewDto) => (
                    <>
                      <div className="font-">{review.text}</div>
                      <div>
                        <StarRatings rating={review.rating} />
                      </div>
                    </>
                  ))}
                </div>
              ) : (
                <>
                  {user && (
                    <button
                      className="btn btn-blue mt-4 w-full"
                      onClick={() => setShowReviewDialog(true)}
                    >
                      Add Review
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
          <AddToCartDialog
            visibility={showCartDialog}
            onClose={hideDialogs}
            onAction={(qty) => {
              hideDialogs();
              addToCart(qty);
            }}
          />
          <AddReviewDialog
            visibility={showReviewDialog}
            onClose={hideDialogs}
            onAction={(reviewData) => {
              hideDialogs();
              addReview({ ...reviewData, productId: data[1].id });
            }}
          />
        </div>
      )}{" "}
      <h3 className="text-xl font-semibold">Description:</h3>
      <p className=" ">{data && data[1].description}</p>
      <div className="text-xl"> More by seller:</div>
      <div className="pt-2 flex gap-2 overflow-x-auto">
        {data &&
          data[1].seller.products.map((product: productDto) => (
            <Card product={product} />
          ))}
      </div>
    </div>
  );
};

export default Product;
