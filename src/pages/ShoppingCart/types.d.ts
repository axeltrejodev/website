export type Product = {
  id: number;
  thumbnail: string;
  title: string;
  price: number;
  category: string;
};

export type Item = {
  id: number;
  thumbnail: string;
  title: string;
  price: number;
  category: string;
  quantity: number;
};

export type Filters = {
  category: string;
  minPrice: number;
};
