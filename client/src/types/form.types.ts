import { Category } from "./category.types"

export type AddProps = {
    onAddProduct: (param: Category) => void
}

export type UpdateProps = {
    onUpdateProduct: (param: Category) => void
    categories:Category[]
}

export type DeleteProps = {
    onDeleteProduct: (param: number) => void
    categories:Category[]
}
