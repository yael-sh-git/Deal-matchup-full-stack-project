import React from "react";
import { DeleteProps } from "../types/form.types";

export default function DeleteForm(props: DeleteProps) {

    function handleOptionSelect(event: React.ChangeEvent<HTMLSelectElement>) {
        const selectedValue = event.target.value;
        props.onDeleteProduct(Number(selectedValue))

    }

    return <>
        <h1>Delete Category</h1>

        <div>
            <div>
                <label htmlFor="categories">Choose a category for delete:</label>
            </div>
            <select id="categories" name="categories" onChange={handleOptionSelect}>
                {props.categories.map(category => (
                    <option value={category.id}>{`ID: ${category.id}, Name: ${category.name}`}</option>
                ))}

            </select>
        </div>


    </>

}