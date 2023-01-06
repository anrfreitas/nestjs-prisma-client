"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
function generateTestingUserData(id, userRole) {
    return {
        id,
        name: `No. ${id}`,
        email: `dev_${id}@nestjs.com`,
        userRole,
    };
}
function run(prisma, counter, debug) {
    return __awaiter(this, void 0, void 0, function* () {
        const description = `${counter} - Executing user seed...`;
        if (debug)
            console.log(description);
        yield prisma.user
            .createMany({
            data: [
                generateTestingUserData('1', 'USER'),
                generateTestingUserData('2', 'ADMIN'),
            ],
            skipDuplicates: true,
        })
            .catch((err) => {
            if (debug)
                console.log(err);
        });
    });
}
exports.default = run;
