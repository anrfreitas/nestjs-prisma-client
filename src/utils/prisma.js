"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prismaObjectExists = exports.getPagingInfo = exports.getPaginationParameters = void 0;
const common_1 = require("@nestjs/common");
function getPaginationParameters(limitPerPage, page) {
    /* NOTE:
     * We are decreasing 1 because we don't want to work on index 0 */
    let tmpLimitPerPage = Math.min(limitPerPage, 100);
    let tmpPage = page - 1;
    if (Number.isNaN(limitPerPage))
        tmpLimitPerPage = 15;
    if (Number.isNaN(page))
        tmpPage = 0;
    return {
        skip: Number(tmpPage * tmpLimitPerPage),
        take: Number(tmpLimitPerPage),
    };
}
exports.getPaginationParameters = getPaginationParameters;
function getPagingInfo(limitPerPage, page, totalSamples) {
    let tmpLimitPerPage = Math.min(limitPerPage, 100);
    let tmpPage = page;
    if (Number.isNaN(limitPerPage))
        tmpLimitPerPage = 15;
    if (Number.isNaN(page))
        tmpPage = 1;
    else if (page === 0)
        tmpPage = 1;
    return {
        currentPage: Number(tmpPage),
        itemsPerPage: tmpLimitPerPage,
        totalPages: Math.ceil(totalSamples / tmpLimitPerPage),
        totalItems: totalSamples,
    };
}
exports.getPagingInfo = getPagingInfo;
function prismaObjectExists(obj) {
    if (!obj || (obj === null || obj === void 0 ? void 0 : obj.length) === 0)
        throw new common_1.HttpException('Entity not found', common_1.HttpStatus.NOT_FOUND);
    return true;
}
exports.prismaObjectExists = prismaObjectExists;
