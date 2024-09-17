export default function Addevent() {
    return (

        <div>

            <h1 className="text-2xl font-bold mb-4">Add New Product</h1>
            <form className="space-y-4">
                <div>
                    <label htmlFor="productName" className="block mb-2">Product Name:</label>
                    <input
                        type="text"
                        id="productName"
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
            </form>



        </div>
        )
}