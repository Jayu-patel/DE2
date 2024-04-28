import React, { useEffect, useState } from 'react';
import SearchPosts from './SearchPosts';
import data from '../../data/data'
import Pagination from '../tools/Pagination';

function Search() {
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(5);

  const lastPost = currentPage * postPerPage
  const firstPost = lastPost - postPerPage
  const current = searchResults.slice(firstPost,lastPost)

  const handleSearch = () => {
    setSearchResults(data)
  }

  useEffect(()=>{
    // fun()
  },[])
  const fun=()=> setSearchResults(data)

  const paginate = (number) =>{
    setCurrentPage(number)
  }

  searchResults.sort((x,y)=>{
      let a = x.id;
      let b = y.id;

      if(a<b) return -1;
      if(a>b) return 1;
      return 0;
  })

  return (
    <div className="w-full">
      <div className="w-[70%] xs:w-[90%] mx-auto mt-[100px]">
        <div className='w-full grid place-items-center'>
          <div>
            <input
              className='p-2'
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search..."
              />
            <button onClick={handleSearch} className='my-2 py-3 px-4 bg-blue-500 text-white rounded-md'>Find nearest hospital</button>
          </div>
        </div>
        <SearchPosts posts={current}/>
        {
          searchResults != "" ?
          <Pagination postPerPage={postPerPage} totalPage={15} paginate={paginate}/>
          : <></>
        } 
      </div>
    </div>
  );
}

export default Search;