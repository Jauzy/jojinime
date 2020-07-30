import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';
import { Link } from 'gatsby'

import { SteamTrade, SteamGame } from './Cards/Index'

const ROUTES = require('../../static/constants/Routes')
const COLORS = require('../../static/constants/Colors')

const ListAnime = (props) => {
    const { list_anime, title, custom_bg } = props
    const maxItem = 10
    const [anime, setAnime] = useState({
        page_number: 1,
        full_list: null,
        list: null,
    })

    const handlePageClick = data => {
        let selected = data.selected;

        setAnime({
            ...anime,
            page_number: selected,
            list: anime.full_list.slice((selected) * maxItem, (selected + 1) * maxItem)
        })
    };

    useEffect(() => {
        setAnime({
            ...anime,
            full_list: list_anime,
            list: list_anime?.slice((0) * maxItem, 1 * maxItem)
        })
    }, [list_anime])

    return (
        <div className='mt-4'>
            {title && <div style={{ backgroundColor: COLORS.MAIN }} className='px-4 py-2 font-weight-bold border-radius-top'>
                <i className='fa fa-list mr-2' />{title}
            </div>}
            <div style={{ backgroundColor: custom_bg || COLORS.SECONDARY }} className='py-1 border-radius-bottom'>
                {anime.list?.length > 0 ? <div className='d-flex flex-column'>
                    <div className='d-flex flex-wrap justify-content-center pb-3'>
                        {anime.list?.map((anime, index) => (
                            <SteamGame anime={anime} />
                        ))}
                    </div>
                    <div className='m-auto'>
                        <ReactPaginate
                            previousLabel={'Prev'}
                            nextLabel={'Next'}
                            breakLabel={'...'}
                            breakClassName={'break-me'}
                            pageCount={Math.ceil(anime.full_list?.length / maxItem)}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={3}
                            onPageChange={handlePageClick}
                            containerClassName={'pagination'}
                            subContainerClassName={'pages pagination'}
                            activeClassName={'active'}
                        />
                    </div>
                </div> : <h3 className='text-center my-4'>No Anime Found!</h3>}
            </div>
        </div>
    )
}

export default ListAnime