import React, { useState } from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

function Pagination({ pageCount, currentPage, onPageChange }) {
    const next = () => {
        if (currentPage >= pageCount) return;
        onPageChange(currentPage + 1);
    };

    const prev = () => {
        if (currentPage <= 1) return;
        onPageChange(currentPage - 1);
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= pageCount; i++) {
            pageNumbers.push(i);
        }

        return pageNumbers.map((page) => (
            <IconButton
                key={page}
                onClick={() => onPageChange(page)}
                {...getItemProps(page)}
            >
                {page}
            </IconButton>
        ));
    };

    const getItemProps = (index) => ({
        style: {
            backgroundColor: currentPage === index ? "black" : "transparent",
            color: currentPage === index ? "white" : "black",
        },
        className: "rounded-full",
    });

    return (
        <div className="flex items-center gap-4">
            <Button
                variant="text"
                className="flex items-center gap-2 rounded-full"
                onClick={prev}
                disabled={currentPage === 1}
            >
                <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
            </Button>
            <div className="flex items-center gap-2">{renderPageNumbers()}</div>
            <Button
                variant="text"
                className="flex items-center gap-2 rounded-full"
                onClick={next}
                disabled={currentPage >= pageCount}
            >
                Next <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
            </Button>
        </div>
    );
}

export default Pagination;
