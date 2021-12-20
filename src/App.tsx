import React, { useState, useEffect } from 'react'

// Components
import SubscriptionForm from './components/SubscriptionForm'
import ContentList from './components/ContentList'
import SearchForm from './components/SearchForm'

// API
import { 
  upsertParkSubscription,
  getAllParkSubscriptions,
  getParkSubscriptionById,
  deleteParkSubscription,
  deleteBulkParkSubscription
} from './server/api/parkSubscriptions'

// Types
import { ContentItemTypes  } from './components/ContentItem/types'

// Helpers
import { formatDataPayload, getCartTypeById } from './helpers/utils'

const App = () => {
  const [parkBkSubscriptions, setBkParkSubscriptions] = useState<ContentItemTypes[]>([]) //Bkup Data for Data Filtering
  const [parkSubscriptions, setParkSubscriptions] = useState<ContentItemTypes[]>([])
  const [isShowForm, setIsShowForm] = useState<Boolean>(false)
  const [isShowContent, setIsShowContent] = useState<Boolean>(false)
  const [parkSubscriptionData, setParkSubscriptionData] = useState<any>(null)
  const [selectedParkSubscriptions, setSelectedParkSubscrptions]:any = useState<ContentItemTypes[]>([])
  const [filters, setFilters] = useState({
    query: '',
    status: 'all'
  })

  useEffect(() => {
    handleGetAllParkSubscription()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    handleSetSearchFilter()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters])

  const handleSelectionChange = (e:any, data:ContentItemTypes) => {
    const { name, checked } = e.target

    if (checked) return setSelectedParkSubscrptions(name === 'allSelect' ? parkSubscriptions : [...selectedParkSubscriptions, data])
    if (name !== 'allSelect') {
      let tempParkSubscriptions = selectedParkSubscriptions.filter((item: ContentItemTypes) => item.id !== data.id)
      return setSelectedParkSubscrptions(tempParkSubscriptions)
    }
    
    setSelectedParkSubscrptions([])
  }

  const handleSearchFilterChange = (e: any) => {
    const { name, value } = e.target

    if (name === 'query') setFilters({...filters, query: value})
    if (name === 'status') setFilters({...filters, status: value})
  }

  const handleSetSearchFilter = () => {
    let queryResults = parkBkSubscriptions.filter((item: any) => item.name.toLowerCase().search(filters.query.toLowerCase()) !== -1)
    if (filters.status !== 'all') return setParkSubscriptions(queryResults.filter((queryResultsData: any) => queryResultsData.status === filters.status))
    setParkSubscriptions(queryResults)
  }

  const handleGetAllParkSubscription = async () => {
    let { data } = await getAllParkSubscriptions()
    setParkSubscriptions(formatDataPayload(data))
    setBkParkSubscriptions(formatDataPayload(data))
    resetState()
  }

  const handleUpsertParkSubscription = async (payload: ContentItemTypes) => {
    const { status } = await upsertParkSubscription(payload)
    if (status === 201 || status === 200) handleGetAllParkSubscription()
  }

  const handleDeleteParkSubscription = async (parkSubscriptionId: number) => {
    const { status } = await deleteParkSubscription(parkSubscriptionId)
    if (status === 200) handleGetAllParkSubscription()
  }

  const handleDeleteBulkParkSubscription = async () => {
    await deleteBulkParkSubscription(selectedParkSubscriptions)
    handleGetAllParkSubscription()
    setParkSubscriptions([])
  }

  const handleSelectedContent = async (parkSubscriptionId: number, isEditClicked: boolean = false) => {
    const { data } = await getParkSubscriptionById(parkSubscriptionId)
    setParkSubscriptionData(data)
    if (isEditClicked) {
      resetState()
      setIsShowForm(true)
      return
    }
    setIsShowContent(true)
  }

  const resetState = () => {
    setIsShowContent(false)
    setIsShowForm(false)
  }


  return (
    <div className='bg-blue-50 w-screen h-screen pt-10 relative'>
      { !isShowForm
        ? (
            <div className='flex flex-col flex justify-center items-center'>
              <div className='w-11/12'>
                <SearchForm 
                  onHandleSearchFilterChange={handleSearchFilterChange}
                  onShowForm={() => {
                    setIsShowForm(true)
                    setParkSubscriptionData(null)
                  }}
                />
              </div>
              <ContentList 
                list={parkSubscriptions}
                onSelectedContent={handleSelectedContent}
                onDeleteParkSubscription={handleDeleteParkSubscription}
                onHandleSelectionChange={handleSelectionChange}
                selectedParkSubscriptions={selectedParkSubscriptions}
                onHandleDeleteBulkParkSubscription={handleDeleteBulkParkSubscription}
              />
            </div>
          )
        : (
          <div className='flex flex-col flex justify-center items-center'>
            <SubscriptionForm
              onViewHomePage={() => resetState()}
              onUpsertParkSubscription={handleUpsertParkSubscription}
              parkSubscriptionData={parkSubscriptionData}
            />
          </div>
        )
      }

      {isShowContent && (
        <div className='fixed top-0 left-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center'>
          <div className='bg-white w-6/12 rounded-md py-4 px-6'>
            <div className='flex justify-between border-b pb-2'>
              <p className='text-lg font-bold'>Details</p>
              <button onClick={() => setIsShowContent(false)}>
                <p className='text-xl font-bold text-gray-400'>✕</p>
              </button>
            </div>
            <div className='mt-6 min-h-50'>
              <p className='text-base'>
                <span className='font-bold'>Owner Name: </span>
                {parkSubscriptionData?.['payload']?.['name']}
              </p>
              <p className='font-bold mt-4'>Description: </p>
              <p className='text-base mt-1 mb-1 h-32 overflow-scroll'> 
                {parkSubscriptionData?.['payload']?.['description']}
              </p>
              <p className='text-base mt-4'>
                <span className='font-bold'>Car Type: </span>
                {getCartTypeById(Number(parkSubscriptionData?.['payload']?.['type']))}
              </p>
              <p className='text-base mt-4'>
                <span className='font-bold'>Status: </span>
                {parkSubscriptionData?.['payload']?.['status'] === 'inactive' ? 'Inactive' : 'Active'}
              </p>
            </div>
            <div className='mt-6 flex'>
              <button 
                className='bg-gray-200 rounded-sm w-1/2 p-2 mr-4'
                onClick={() => {
                  resetState()
                  setIsShowForm(true)
                }}
              >
                Edit
              </button>
              <button 
                className='bg-red-600 text-white rounded-md w-1/2 p-2'
                onClick={() => handleDeleteParkSubscription(Number(parkSubscriptionData?.['id']))}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
