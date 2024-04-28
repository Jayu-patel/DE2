import React, { useEffect, useState } from 'react';
import SearchPosts from './SearchPosts';
import data from '../../data/data'
import Pagination from '../tools/Pagination';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import ReactSwitch from 'react-switch';
import {fetchDataA} from '../../store/slices/hospitalSlice'

function HomePage3() {

    // const [searchResults, setSearchResults] = useState([]);
    const hospitals = useSelector(state=>state?.hospital?.data)
    const latitude = useSelector(s => s?.location?.latitude)
    const dispatch = useDispatch()

    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(5);

    const lastPost = currentPage * postPerPage
    const firstPost = lastPost - postPerPage
    const current = hospitals?.slice(firstPost,lastPost)

    const handleSearch = () => {
        if(latitude != "")
            dispatch(fetchDataA())
        else{
            alert("Please provide your location")
        }
    }
    const paginate = (number) =>{
        setCurrentPage(number)
      }
    const navigate = useNavigate()


    return (
    <div className='w-[100vw]'>
        <div className='img_box'>
            <img className='opacity-60' src='hospital.jpg' alt="Error" />
        </div>
        <div className='text-white mt-[140px]'>
            <div className='w-[60%] xs:w-[90%] mx-auto text-center'>
                <button onClick={handleSearch} className='my-2 py-3 px-4 bg-blue-500 text-[1.4rem] text-white rounded-md'>Search Nearby Hospitals</button>
                <p className='text-[1.2rem]'>Our user-friendly website allows you to easily locate hospitals with vacant beds nearest to you. No more wasted time searching endlessly; with just a few clicks, you'll have access to crucial information that can make all the difference in urgent situations</p>
            </div>
            {
                hospitals != null ? 
            <div className='w-[60%] xs:w-[95%] mx-auto mt-6 text-black'>
                <SearchPosts posts={current}/>
                {
                hospitals != null ?
                <Pagination postPerPage={postPerPage} totalPage={15} paginate={paginate}/>
                : <></>
                }
            </div>:
            <div></div>
            }
        </div>
    </div>
    )
}

export default HomePage3

{/* <div className='homeBox absolute text-white text-center mt-[-80px]'>
                <div className='w-[60%] mx-auto'>
                    <button onClick={handleSearch} className='my-2 py-3 px-4 bg-blue-500 text-[1.4rem] text-white rounded-md'>Search Nearby Hospitals</button>
                    <p className='text-[1.2rem]'>our mission is to provide vital information to those in need. Our user-friendly website allows you to easily locate hospitals with vacant beds nearest to you. No more wasted time searching endlessly; with just a few clicks, you'll have access to crucial information that can make all the difference in urgent situations</p>
                </div>
                <div className='w-[60%] mx-auto'>
                    <SearchPosts posts={current}/>
                    {
                    searchResults != "" ?
                    <Pagination postPerPage={postPerPage} totalPage={15} paginate={paginate}/>
                    : <></>
                    }
                </div>
            </div> */}