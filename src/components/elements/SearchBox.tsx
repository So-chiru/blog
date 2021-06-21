import '@/styles/searchbox.scss'

import { RiSearchLine } from 'react-icons/ri'

export const SearchBoxComponent = () => {
  return (
    <div className='search-box' role='button' tabIndex={0}>
      <div className='icon'>
        <RiSearchLine></RiSearchLine>
      </div>
      <div className='text'>
        <span>Search...</span>
      </div>
    </div>
  )
}

export const SearchBoxContainer = () => {
  return <SearchBoxComponent></SearchBoxComponent>
}
