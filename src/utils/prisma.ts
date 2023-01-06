import { HttpException, HttpStatus } from '@nestjs/common';

type PagingInfo = {
    currentPage?: number;
    itemsPerPage?: number;
    totalPages?: number;
    totalItems?: number;
};

type PrismaPaginationParameters = {
    skip: number;
    take: number;
};

export function getPaginationParameters(
    limitPerPage: number,
    page: number,
): PrismaPaginationParameters {
    /* NOTE:
     * We are decreasing 1 because we don't want to work on index 0 */
    let tmpLimitPerPage = Math.min(limitPerPage, 100);
    let tmpPage = page - 1;
    if (Number.isNaN(limitPerPage)) tmpLimitPerPage = 15;
    if (Number.isNaN(page)) tmpPage = 0;

    return {
        skip: Number(tmpPage * tmpLimitPerPage),
        take: Number(tmpLimitPerPage),
    };
}

export function getPagingInfo(
    limitPerPage: number,
    page: number,
    totalSamples: number,
): PagingInfo {
    let tmpLimitPerPage = Math.min(limitPerPage, 100);
    let tmpPage = page;
    if (Number.isNaN(limitPerPage)) tmpLimitPerPage = 15;
    if (Number.isNaN(page)) tmpPage = 1;
    else if (page === 0) tmpPage = 1;

    return {
        currentPage: Number(tmpPage),
        itemsPerPage: tmpLimitPerPage,
        totalPages: Math.ceil(totalSamples / tmpLimitPerPage),
        totalItems: totalSamples,
    };
}

export function prismaObjectExists(obj: any): boolean {
    if (!obj || obj?.length === 0)
        throw new HttpException('Entity not found', HttpStatus.NOT_FOUND);
    return true;
}
