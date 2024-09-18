import { KeyboardEvent, ChangeEvent, useState, useEffect } from "react";
import { selectCategory } from "../redux/category/category.selectors";
import { Category } from "../types/category.types";
import { addCategoryApi, deleteCategoryApi, getCategoryApi, updateCategoryApi } from "../services/category.service";
import { addCategory, deleteCategory, setCategories, updateCategory } from "../redux/category/category.slice";
import { useAppDispatch, useAppSelector } from "../redux/store";


export default function Category_Component() {
    const [id, setId] = useState<number>(0);
    const [name, setName] = useState('');
    const [parent_id, setParentId] = useState<number>(0);
    const [categoryToUpdate, setCategoryToUpdate] = useState<Category>({
        id: 0,
        name: '',
        parent_id: 0
    });

 

    useEffect(() => {
        async function getData() {
            const allCategories = await getCategoryApi()
            dispatch(setCategories(allCategories))
        }
        
        getData();
    },[])
 
    const categories = useAppSelector(selectCategory)
    const dispatch = useAppDispatch()
    
    
    // const getCategories = async () => {
    //         try {
    //             const categories = await getCategoryApi()
    //             dispatch(setCategories(categories))
    //         }
    //         catch (error) {
    //             console.log(console.error);
    //         }
    //         getCategories();
    //     }

    const addCategoryHandler = async () => {
        const category: Category = {
            id: id,
            name: name,
            parent_id: parent_id
        }
        await addCategoryApi(category)
        dispatch(addCategory(category))
    };

    const deleteCategoryHandler = async (id: number) => {
        await deleteCategoryApi(id)
        dispatch(deleteCategory(id))
    };

    const updateCategoryHandler = async (category: Category) => {
        setCategoryToUpdate(category)
    };
    const saveCategoryHandler = async (category: Category) => {
        await updateCategoryApi(category)
        dispatch(updateCategory(category))
    };

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {

        const { value, name } = event.target
        setCategoryToUpdate({ ...categoryToUpdate, [name]: value })
    }


    return <>
        <h1>Add Category</h1>
         <div>
            <input type="text" name="name" placeholder="enter name" onChange={(e) => setName(e.target.value)} />
            <input type="number" name="parent_id" placeholder="enter parent_id" onChange={(e) => setParentId(0)} />
            <button onClick={addCategoryHandler}>Add Category</button>
        </div>

        <table>
            <th>
                <td>Id</td>
                <td>Name</td>
                <td>Parent_id</td>
                <td>Delete</td>
                <td>Update</td>
            </th>
            <tbody>
                {categories && categories.map((item)=>(
                    <tr key={item.id}>
                        <td>{item.id} </td>
                        <td>{categoryToUpdate.id === item.id ? <input type="text" name="name" value={item.name}  onChange={onChangeHandler}/> : item.name} </td>
                        <td>{categoryToUpdate.id === item.id ? <input type="number" name="parent_id" value={item.parent_id} onChange={onChangeHandler}/> : item.parent_id} </td>
                        <td><button onClick={()=> deleteCategoryHandler(item.id)}>delete</button></td>
                        <td>{categoryToUpdate.id===item.id? <button onClick={()=>saveCategoryHandler}>save</button> :
                         <button disabled={categoryToUpdate.id !== item.id && categoryToUpdate.id !== 0} onClick={() => updateCategoryHandler(item)}>update</button>}</td>
                    </tr>
                ))}
            </tbody>

            

        </table> 
        

    </>

}