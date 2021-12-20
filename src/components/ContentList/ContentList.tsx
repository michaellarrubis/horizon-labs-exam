import React, { useState } from 'react'

// Types
import { ContentListTypes } from './types'

// Components
import ContentItem from '../ContentItem'

type ContentListPropsType = ContentListTypes & {
  onDeleteParkSubscription: Function
  onSelectedContent: Function
  selectedParkSubscriptions: any
  onHandleSelectionChange: Function
  onHandleDeleteBulkParkSubscription: Function
}

const ContentList = ({
  list,
  onDeleteParkSubscription,
  onSelectedContent,
  selectedParkSubscriptions,
  onHandleSelectionChange,
  onHandleDeleteBulkParkSubscription
}: ContentListPropsType) => {
  const [showDeleteSelected, setShowDeleteSelected] = useState<Boolean>(false)

  return (
    <div className='w-11/12'>
      <div className='bg-white mt-6 w-1506'>
        <div className='py-4 px-6 border-b flex'>
          <div className='w-1/12 pl-4 relative'>
            <input 
              type='checkbox' 
              className='
                h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600
                checked:border-blue-600 focus:outline-none transition duration-200 my-1 
                align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer
              '
              name='allSelect'
              onChange={(e) => onHandleSelectionChange(e, selectedParkSubscriptions)}
              checked={selectedParkSubscriptions?.length === list?.length && list.length > 0}
            />
            <div 
              className='absolute w-6 flex justify-center left-10 -top-2 cursor-pointer' 
              onClick={() => setShowDeleteSelected(!showDeleteSelected)}
            >
              <div className='text-2xl'>⁝</div>
            </div>
            { showDeleteSelected && selectedParkSubscriptions?.length > 0 && (
              <div className='absolute w-full flex justify-center -right-10 -bottom-10 bg-red-500 text-white'>
                <div 
                  className='text-sm cursor-pointer py-2 whitespace-pre'
                  onClick={() => {
                    onHandleDeleteBulkParkSubscription()
                    setShowDeleteSelected(false)
                  }}
                >
                  Delete Selected
                </div>
              </div>
            )}
          </div>
          <p className='w-3/12 font-semibold'>Owner</p>
          <p className='w-4/12 font-semibold mr-6'>Description</p>
          <p className='w-2/12 font-semibold'>Car Type</p>
          <p className='w-1/12 font-semibold'>Status</p>
          <div className='w-2/12'/>
        </div>
        {list.map((item: any, i) => (
          <div key={i} className='px-6 border-b cursor-pointer'>
            <ContentItem 
              item={item}
              onSelectedContent={onSelectedContent}
              onDeleteParkSubscription={onDeleteParkSubscription}
              selectedParkSubscriptions={selectedParkSubscriptions}
              onHandleSelectionChange={onHandleSelectionChange}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ContentList
