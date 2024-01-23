"use client";
import React, { useState, useEffect } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
function PageNav({ pageArray }: any) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [pages, setPages] = useState<any>([]);

  const [curPage, setCurPage] = useState("1");

  const handlePageChange = (page: string) => {
    const params = new URLSearchParams(searchParams);
    if (page != null) {
      params.set("page", page);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const getPaginationNums = (pageParam: string) => {
    let pageList = [];
    const regex = /^[1-9]\d*$/;

    if (!regex.test(pageParam) && parseInt(pageParam) < pageArray.length)
      return;
    let left = parseInt(pageParam) - 1;
    let right = left;

    pageList.push(pageParam);

    while (
      ((left >= 0 && left < pageArray.length) ||
        (right >= 0 && right < pageArray.length)) &&
      pageList.length < 3
    ) {
      if (left >= 1) {
        left -= 1;
        pageList.unshift(String(pageArray[left]));
      }
      if (right < pageArray.length - 1) {
        right += 1;
        pageList.push(String(pageArray[right]));
      }
    }

    setPages(pageList);
    setCurPage(pageParam);
  };

  const btnPageChange = (direction: number) => {
    const newPageNum = parseInt(curPage) + direction;

    if (newPageNum >= 1 && newPageNum <= pageArray.length) {
      handlePageChange(String(newPageNum));
      getPaginationNums(String(newPageNum));
    }
  };

  //Updates the pagination when url changes
  useEffect(() => {
    let query = searchParams.get("page") ?? "1";
    getPaginationNums(query);
  }, [searchParams]);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={() => btnPageChange(-1)} />
        </PaginationItem>

        {pages.map((pageNum: any, key: any) => (
          <PaginationItem key={key}>
            <PaginationLink
              onClick={() => handlePageChange(pageNum)}
              isActive={curPage == String(pageNum)}
            >
              {parseInt(pageNum)}
            </PaginationLink>
          </PaginationItem>
        ))}
        {pageArray.length > 3 && !(curPage == String(pageArray.length - 1)) && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext onClick={() => btnPageChange(1)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default PageNav;
