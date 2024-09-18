import { useState } from "react";
import { AddProps } from "../types/form.types";
import React from "react";
import { Category } from "../types/category.types";



export default function AddForm(props: AddProps) {
    const [id, setId] = useState<number>(0);
    const [name, setName] = useState('');
    const [parent_id, setParent_id] = useState<number>(0);

    const handleAddProduct = () => {
        const category: Category = {
            id: id,
            name: name,
            parent_id: parent_id
        }
        props.onAddProduct(category);
    };


    return <>
    <h1>Add Category</h1>
        <div>
            <input type="number" name="id" placeholder="enter id"  onChange={(e) => setId(Number(e.target.value))}  />
            <input type="text" name="name" placeholder="enter name" onChange={(e) => setName(e.target.value)} />
            <button onClick={handleAddProduct}>Add Product</button>
        </div>

    </>

}
