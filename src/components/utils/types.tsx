export interface ingredients {
  description: string;
  quantity: number | null;
  unit: string;
}
export interface Recipe {
  bookmarked: boolean;
  id: string;
  title: string;
  publisher: string;
  sourceUrl: string;
  image_url: string;
  servings: number;
  cookingTime: number;
  ingredients: ingredients[];
}
