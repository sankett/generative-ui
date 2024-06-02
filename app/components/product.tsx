
export function Product({productlist}){
    return (
        <div>
            <table className="table-fixed border-collapse border border-slate-400 p-4">
            <th className="text-left p-1 pl-4">Category</th>
            <th className="text-left p-1 pl-4">Title</th>
            <th className="text-left p-1 pl-4">Price</th>
            <th className="text-left p-1 pl-4 "></th>
           
                {productlist.map((product, index) => (
                    <tr key={index} className="text-left p-1">
                        <td className="text-left p-1 pl-4">{product.category}</td>
                        <td className="text-left p-1 pl-4">{product.title}</td>
                        <td className="text-left p-1 pl-4">{product.price}</td>
                        <td className="text-left p-1 pl-4"><button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Remove</button></td>
                    </tr>
                ))}
            </table>
        </div>
    )

}