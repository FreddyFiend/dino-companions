interface UserDto {
  name: string;
  email: string;
  id: string;
}

interface ReviewDto {
  text: string;
  rating: number;
  productId: string;
  user?: UserDto;
}
