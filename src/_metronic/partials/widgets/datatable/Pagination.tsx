import React from 'react';
import classnames from 'classnames';
import {usePagination, DOTS} from './usePagination';

type Props = {
    onPageChange: Function;
    currentPage: number;
    totalCount: number;
    siblingCount?: number;
    pageSize: number;
}

const Pagination: React.FC<Props> = (props) => {
    const {
        onPageChange,
        totalCount,
        siblingCount = 1,
        currentPage,
        pageSize,
    } = props;

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
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    let lastPage = paginationRange[paginationRange.length - 1];
    return (
        <ul className='pagination'>
            <li
                className={classnames('page-item previous', {
                    disabled: currentPage === 1
                })}
            >
                <button className="page-link" onClick={onPrevious}>
                    <i className='previous'/>
                </button>
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
                        <button className="page-link" onClick={() => onPageChange(pageNumber)}>{pageNumber}</button>
                    </li>
                );
            })}
            <li
                className={classnames('page-item next', {
                    disabled: currentPage === lastPage
                })}
            >
                <button className="page-link" onClick={onNext}>
                    <i className='next'/>
                </button>
            </li>
        </ul>
    );
};

export default Pagination;
