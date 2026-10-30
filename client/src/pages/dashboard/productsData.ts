export type ProductStatus = "Published" | "Draft";

export type Product = {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  status: ProductStatus;
  image: string;
  updatedAt: string;
};
