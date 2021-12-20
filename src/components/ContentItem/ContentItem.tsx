import { ContentItemTypes } from './types'

import { getCartTypeById } from '../../helpers/utils'

type ContentItemPropTypes = {
  item: ContentItemTypes
  onDeleteParkSubscription: Function
  onSelectedContent: Function
  selectedParkSubscriptions: ContentItemTypes[]
  onHandleSelectionChange: Function
}

const ContentItem = ({
  item,
  onDeleteParkSubscription,
  onSelectedContent,
  selectedParkSubscriptions,
  onHandleSelectionChange
}: ContentItemPropTypes) => {
  const truncateDescriptions = (description: string) => {
    if (description?.length > 352) return `${description.slice(0, 60)}...`
    return description
  }

  return (
    <div className='flex items-center'>
      <p className='w-1/12 py-4 pl-4'>
        <input 
          type='checkbox' 
          className='
            h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600
            checked:border-blue-600 focus:outline-none transition duration-200 my-1 
            align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer
          '
          name={item.name}
          checked={selectedParkSubscriptions.some((selected: ContentItemTypes) => selected?.id === item.id)}
          onChange={(e) => onHandleSelectionChange(e, item)}
        />
      </p>
      <div className='contents' onClick={() => onSelectedContent(item.id)}>
        <p className='w-3/12 py-4'>{item.name}</p>
        <p className='w-4/12 py-4 mr-6'>{truncateDescriptions(item.description)}</p>
        <p className='w-2/12 py-4'>{getCartTypeById(Number(item.type))}</p>
        <div className='w-1/12 py-4'>
          {item.status === 'inactive' ? <div className='w-4 h-4 rounded-lg bg-gray-200 ml-4'/> : <div className='w-4 h-4 rounded-lg bg-green-500 ml-4'/>}
        </div>
      </div>
      <div className='w-2/12 py-4 flex'>
        <button 
          className='bg-gray-200 rounded-md p-2 mr-2 w-1/2'
          onClick={() => onSelectedContent(item.id, true)}
        >
          Edit
        </button>
        <button 
          className='rounded-md bg-red-600 text-white p-1 w-1/2'
          onClick={() => onDeleteParkSubscription(item.id)}
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default ContentItem