type SearchFormTypeProps = {
  onShowForm: Function
  onHandleSearchFilterChange: Function
}

const SearchForm = ({
  onShowForm,
  onHandleSearchFilterChange
}: SearchFormTypeProps) => {
  return (
    <div className='bg-white p-6 lg:flex lg:flex-row w-full items-center justify-between md:flex-col'>
      <div className='lg:flex lg:flex-row lg:w-10/12 md:w-full '>
        <input
          className='border-solid border-gray-300 border py-2 px-4 w-full md:w-7/12 rounded text-gray-700'
          name='query'
          placeholder='Hit `Enter` to  search'
          onChange={(e) => onHandleSearchFilterChange(e)}
        />
        <div className='5/12 flex items-center md:pl-4 pl-0 md:mt-0 mt-4'>
          <p className='font-semibold'>Status: </p>
          <label className='ml-8 flex items-center inline-block cursor-pointer'>
            <input
              className='mr-2'
              name='status'
              type='radio'
              value='all'
              defaultChecked
              onChange={(e) => onHandleSearchFilterChange(e)}
            />
            All
          </label>

          <label className='ml-8 flex items-center inline-block cursor-pointer'>
            <input
              className='mr-2'
              name='status'
              type='radio'
              value='active'
              onChange={(e) => onHandleSearchFilterChange(e)}
            />
            Active
          </label>

          <label className='ml-8 flex items-center inline-block cursor-pointer'>
            <input
              className='mr-2'
              name='status'
              type='radio'
              value='inactive'
              onChange={(e) => onHandleSearchFilterChange(e)}
            />
            Inactive
          </label>
        </div>
      </div>
      <button 
        className='bg-green-500 text-white rounded-md py-2 px-4 md:w-2/12 w-full mt-4 md:mt-0'
        onClick={() => onShowForm()}
      >Add Subscription</button>
    </div>
  )
}

export default SearchForm