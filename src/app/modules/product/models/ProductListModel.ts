export interface ProductListModel {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: RatingModel;
}
export interface ProductAddModel {
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
}
export interface RatingModel {
    rate: number;
    count: number
}

export interface ProductListTableModel {
    list: Array<ProductListModel>;
    totalRow: number;
    currentPageCount: number;
    totalPageCount: number;
}

export interface CategoryListModel {
    categoryArray: [];
}