import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';
import { Link } from 'gatsby'

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
                {title}
            </div>}
            <div style={{ backgroundColor: custom_bg || COLORS.SECONDARY }} className='py-1 border-radius-bottom'>
                {anime.list?.length > 0 ? <div className='d-flex flex-column'>
                    <div className='d-flex flex-wrap justify-content-center'>
                        {anime.list?.map((anime, index) => (
                            <div className='list-card' key={index + 'list'}>
                                <Link to={`${ROUTES.ANIMEPAGE}?id=${anime._id}`} className='text-white'>
                                    <div className='list-bg py-1 px-3 bg-dark'><i className='fa fa-eye mr-2' />{anime.total_episode} Episode</div>
                                    <div className='list-bg py-1 px-3'><i className='fa fa-eye mr-2' />{anime.total_episode} Episode</div>
                                    <div className='list-bg list-score py-1 px-3 bg-dark'><i className='fa fa-star mr-2' />{anime.score}</div>
                                    <div className='list-bg list-score py-1 px-3'><i className='fa fa-star mr-2' />{anime.score}</div>
                                    <div className='list-bg list-title text-truncate bg-dark p-2'>{anime.title}</div>
                                    <div className='list-bg list-title text-truncate p-2'>{anime.title}</div>
                                    <img src={anime.cover_image} className='rounded-lg list-image' />
                                </Link>
                            </div>
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