export interface productDto {
  id: string;
  imageUrl?: string;
  imageThumb: string;
  title: string;
  description: string;
  price?: number;
  quantity?: number;
  rating: number;
  totalReviews: float;
  seller: {
    name: string;
    email: string;
  };
}
// model Product {
//   id          String   @id @default(uuid())
//   title       String
//   description String?
//   published   Boolean? @default(false)
//   seller      User?    @relation(fields: [sellerId], references: [id])
//   sellerId    String?
//   quantity    Int
//   price       Float
//   createdAt   DateTime @default(now())
//   updatedAt   DateTime @updatedAt
// }
