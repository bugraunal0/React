import React from 'react';
import classnames from 'classnames';
import {usePagination, DOTS} from './usePagination';
import {useDispatch} from "react-redux";

type Props = {
    action: Function;
    currentPage: number;
    totalCount: number;
}

const Pagination: React.FC<Props> = (props) => {
    const { action, currentPage,totalCount} = props;

    const dispatch = useDispatch()
    let siblingCount = 1
    let pageSize = 1

    const paginationRange : number[] = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize
    })!;

    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    const onNext = () => {
        dispatch(action(currentPage + 1,15));
    };

    const onPrevious = () => {
        dispatch(action(currentPage - 1,15));
    };

    let lastPage = paginationRange[paginationRange.length - 1];
    return (
        <ul className='pagination'>
            <li
                className={classnames('page-item previous', {
                    disabled: currentPage === 1
                })}
            >
                <a href="#" className="page-link" onClick={onPrevious}>
                    <i className='previous'/>
                </a>
            </li>
            {paginationRange.map((pageNumber,index) => {
                if (pageNumber === DOTS) {
                    return <li key={index} className="page-item dots">&#8230;
                    </li>;
                }

                return (
                    <li key={index}
                        className={classnames('page-item', {
                            active: pageNumber === currentPage
                        })}
                    >
                        <a href="#" className="page-link" onClick={() => dispatch(action(pageNumber,15))}>{pageNumber}</a>
                    </li>
                );
            })}
            <li
                className={classnames('page-item next', {
                    disabled: currentPage === lastPage
                })}
            >
                <a href="#" className="page-link" onClick={onNext}>
                    <i className='next'/>
                </a>
            </li>
        </ul>
    );
};

export default Pagination;
