

export interface CartListModel {
    id: number;
    userId: number;
    date: string;
    products: Array<CartProductsModel>
}

export interface CartProductsModel {
    productId: number;
    quantity: number;
}
export interface CartListTableModel {
    list: Array<CartListModel>;
    totalRow: number;
    currentPageCount: number;
    totalPageCount: number;
}