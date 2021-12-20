import { useForm } from 'react-hook-form'

// Helpers
import { CarTypes } from '../../helpers/const'

// Types
import { ContentItemTypes } from '../ContentItem/types'
type SubscriptionFormProps = {
  onUpsertParkSubscription: Function
  parkSubscriptionData?: any,
  onViewHomePage: Function
}

const SubscriptionForm = ({ 
  onUpsertParkSubscription,
  onViewHomePage,
  parkSubscriptionData
}: SubscriptionFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<ContentItemTypes>({
    defaultValues: {
      name: parkSubscriptionData ? parkSubscriptionData.payload.name : '',
      description: parkSubscriptionData ? parkSubscriptionData.payload.description : '',
      type: parkSubscriptionData ? parkSubscriptionData.payload.type : '',
      status: parkSubscriptionData ? parkSubscriptionData.payload.status : 'inactive',
    }
  })

  const onSubmit = async (data: ContentItemTypes) => {
    if (parkSubscriptionData) data.id = parkSubscriptionData.id
    onUpsertParkSubscription({...data})
  }

  return (
    <div className='w-8/12 bg-white p-8'>
      <div className='flex justify-between'>
        <button className='rounded-sm py-1 px-4 bg-gray-200' onClick={() => onViewHomePage()}>Back</button>
        <h2 className='text-2xl semi-bold'>{ parkSubscriptionData ? 'Edit' : 'Add' } Park Subscription</h2>
      </div>

      <form
        className='m-auto p-10 mt-10 border'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label className='text-gray-600 font-medium'>Name</label>
          <input
            {...register('name', { required: 'Name is Required' })}
            className='border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700'
            name='name'
            placeholder='Michael Angelo Larrubis'
            autoFocus
          />
        </div>
        {errors.name && (
          <div className='mb-3 text-normal text-red-500'>
            {errors.name.message}
          </div>
        )}
        
        <div>
          <label className='text-gray-600 font-medium block mt-8'>
            Description
          </label>
          <textarea
            {...register('description', { required: 'Description is Required' })}
            className='border-solid border-gray-300 border p-4 w-full rounded text-gray-700 resize-none'
            name='description'
            placeholder='White Brio Amaze'
            rows={5}
            cols={5}
          />
        </div>
        {errors.description && (
          <div className='mb-3 text-normal text-red-500'>
            {errors.description.message}
          </div>
        )}

        <div>
          <label className='text-gray-600 font-medium block mt-8'>
            Car Type
          </label>
          <select 
            {...register('type', { required: 'Car Type is Required' })}
            className='
              mb-3 appearance-none block
              w-full px-4 py-2 font-base text-gray-700 bg-white bg-clip-padding bg-no-repeat
              border border-solid border-gray-300
              rounded transition ease-in-out
              m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer
            '
            name='type'
          >
              <option value="" disabled>Select Car Type</option>
              {CarTypes.map((carType) => (
                <option key={carType.id} value={carType.id}>{carType.name}</option>
              ))}
          </select>
        </div>
        {errors.type && (
          <div className='mb-3 text-normal text-red-500'>
            {errors.type.message}
          </div>
        )}

        <div>
          <label className='text-gray-600 font-medium block mt-8'>Status</label>
          <label className='inline-block cursor-pointer'>
            <input
              {...register('status', { required: 'Status is Required' })}
              className='mt-4 mr-1'
              name='status'
              type='radio'
              value='active'
            />
            Active
          </label>

          <label className='ml-8 inline-block cursor-pointer'>
            <input
              {...register('status', { required: 'Status is Required' })}
              className='mt-4 mr-1'
              name='status'
              type='radio'
              value='inactive'
            />
            Inactive
          </label>
        </div>
        {errors.status && (
          <div className='mb-3 text-normal text-red-500'>
            {errors.status.message}
          </div>
        )}

        <button
          className='mt-10 w-full block bg-green-400 hover:bg-green-600 text-green-100 border py-3 px-6 font-semibold text-md rounded'
          type='submit'
        >
          { parkSubscriptionData ? 'Update' : 'Submit' }
        </button>
      </form>
    </div>
  )
}

export default SubscriptionForm