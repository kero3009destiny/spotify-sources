import React from 'react';
import styled from 'styled-components';

import previousIcon from '../../../../static/images/icons/pagination-previous.svg';
import nextIcon from '../../../../static/images/icons/pagination-next.svg';

interface IPaginator {
  currentPage: number
  lastPage: number
  paginatingClickback?: (page:number) => void
}

interface IStyledPaginatorLink {
  current?: boolean
}
const StyledPaginator = styled.div`
  width: 100%;
  text-align: right;
`;
const StyledPaginatorUl = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: inline-flex;
  background: var(--color-DIRTY-SNOW);
  border-radius: 100px;
  padding: 0 10px;
`;

const StyledPaginatorLink = styled.a`
  padding: 15px;
  display: block;
  font-size: 1.8rem;
  pointer-events: ${(p: IStyledPaginatorLink) => p.current ? 'none' : 'auto'};
  cursor: ${(p: IStyledPaginatorLink) => !p.current ? 'pointer' : 'auto'};
  color: ${(p: IStyledPaginatorLink) => p.current ? 'var(--color-BRAND-GREEN)':'var(--color-DARKNESS)'};
  &:hover{
    color: var(--color-BRAND-GREEN);
  }

  img {
    display: block;
  }
`;

const Paginator = (props: IPaginator) => {
  const { currentPage, lastPage: total } = props
  const current = +currentPage

  const clickBack = (e:any, page:number) => {
    if (typeof props.paginatingClickback === 'function') {
      props.paginatingClickback(page);
    }
    e.preventDefault();
  }

  const buildPagination = () => {
    const arrayFromTotal = Array.from(Array(total).keys());
    const start = total > 7 && current > 4 ? current - 4 : 0;
    const end = total > 7 && current > 4 ? current + 3 : 7;

    return arrayFromTotal
      .slice(start, end)
      .map((d:any, i:number) => (
        <li key={i}>
          <StyledPaginatorLink
            current={d + 1 === current}
            onClick={(e) => clickBack(e, d + 1)}
          >
            {d + 1}
          </StyledPaginatorLink>
        </li>
      ))
  };

  return (
    <>
      {
        total > 1 &&
        <StyledPaginator>
          <StyledPaginatorUl>
            { total > 7 && current > 4 &&
              <StyledPaginatorLink onClick={(e) => clickBack(e, current - 1)}>
                <img src={previousIcon} alt="Previous" />
              </StyledPaginatorLink>
            }
            {buildPagination()}
            { total > 7 && current < total - 3 &&
              <StyledPaginatorLink onClick={(e) => clickBack(e, current + 1)}>
                <img src={nextIcon} alt="Next" />
              </StyledPaginatorLink>
            }
          </StyledPaginatorUl>
        </StyledPaginator>
      }
    </>
  )
}


export default Paginator;
