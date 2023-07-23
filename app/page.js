import Footer from '@/components/Footer';
import Header from '@/components/Header'

export default function Home() {
  const stocks = [
    { id: 1, name: 'Product A', category: 'Category A', description: 'Description for Product A', quantity: 10, price: 20 },
    { id: 2, name: 'Product B', category: 'Category B', description: 'Description for Product B', quantity: 15, price: 30 },
    { id: 3, name: 'Product C', category: 'Category C', description: 'Description for Product C', quantity: 5, price: 15 },
  ];

  const productCategories = ['Category A', 'Category B', 'Category C', 'Other'];

  return (
    <div className='bg-gray-100'>
      <Header />
      <div className='container mx-auto'>

      <h1 className='font-semibold ml-2 my-4 text-2xl'>Search a Product</h1>
        <div className='flex ml-2'>
          <input
            type='text'
            id='searchInput'
            name='searchInput'
            className='w-full p-2 border rounded'
            placeholder='Enter product name or keyword'
          />
          <select
            id='categorySelect'
            name='categorySelect'
            className='ml-2 p-2 border rounded'
          >
            <option value=''>All Categories</option>
            {productCategories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <h1 className='font-semibold ml-2 my-4 text-2xl'>Add a Product</h1>

        <form className='mb-4 ml-2'>
          <label htmlFor='productName' className='block'>
            Product Name:
          </label>
          <input
            type='text'
            id='productName'
            name='productName'
            className='w-full p-2 border rounded'
            placeholder='Enter product name'
          />

          <label htmlFor='category' className='block mt-2'>
            Category:
          </label>
          <input
            type='text'
            id='category'
            name='category'
            className='w-full p-2 border rounded'
            placeholder='Enter product category'
          />

          <label htmlFor='description' className='block mt-2'>
            Description:
          </label>
          <textarea
            id='description'
            name='description'
            rows='3'
            className='w-full p-2 border rounded'
            placeholder='Enter product description'
          ></textarea>

          <label htmlFor='quantity' className='block mt-2'>
            Quantity:
          </label>
          <input
            type='number'
            id='quantity'
            name='quantity'
            className='w-full p-2 border rounded'
            placeholder='Enter quantity'
          />

          <label htmlFor='price' className='block mt-2'>
            Price:
          </label>
          <input
            type='number'
            id='price'
            name='price'
            className='w-full p-2 border rounded'
            placeholder='Enter price'
          />

          <button type='submit' className='mt-4 p-2 bg-blue-500 text-white rounded'>
            Add Product
          </button>
        </form>

        <table className='table-auto mx-auto my-auto'>
          <thead>
            <tr>
              <th className='px-8 py-4'>ID</th>
              <th className='px-8 py-4'>Name</th>
              <th className='px-8 py-4'>Category</th>
              <th className='px-8 py-4'>Description</th>
              <th className='px-8 py-4'>Quantity</th>
              <th className='px-8 py-4'>Price</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map(stock => (
              <tr key={stock.id}>
                <td className='border px-8 py-4'>{stock.id}</td>
                <td className='border px-8 py-4'>{stock.name}</td>
                <td className='border px-8 py-4'>{stock.category}</td>
                <td className='border px-8 py-4'>{stock.description}</td>
                <td className='border px-8 py-4'>{stock.quantity}</td>
                <td className='border px-8 py-4'>{stock.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer/>
    </div>
  );
}
