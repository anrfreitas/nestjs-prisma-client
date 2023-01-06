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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-console */
const client_1 = require("@prisma/client");
const fs_1 = __importDefault(require("fs"));
const child_process_1 = __importDefault(require("child_process"));
const util_1 = __importDefault(require("util"));
const _1_users_1 = __importDefault(require("./seeds/1_users"));
function seed(debug = true) {
    return __awaiter(this, void 0, void 0, function* () {
        // eslint-disable-next-line prefer-const
        let counter = 1; // the counter is going to be incremented
        const prisma = new client_1.PrismaClient({
            datasources: {
                db: {
                    url: 'postgresql://zero:secret@localhost:5432/zero_db?schema=public',
                },
            },
        });
        if (debug) {
            console.info('Connecting to database...');
            console.log(''); // new line
        }
        /* Add your migrations below this line */
        yield (0, _1_users_1.default)(prisma, counter, debug).then(() => {
            counter += 1;
        });
        try {
            const sqlPath = './src/seed/sql';
            const nodeTerminal = util_1.default.promisify(child_process_1.default.exec);
            const files = yield fs_1.default.promises.readdir(sqlPath);
            console.info(counter, '-', 'SQL Files detected:', files);
            yield Promise.all(files.sort().map((fileName, index) => __awaiter(this, void 0, void 0, function* () {
                const preCommand = 'PGPASSWORD=secret psql -h localhost -d zero_db -U zero';
                const command = `${preCommand} -f ${sqlPath}/${fileName}`;
                const output = yield nodeTerminal(command).catch(() => { });
                if (output && output.stdout) {
                    console.log(`${counter}.${index} - SQL File (${fileName}) successfully imported!`);
                }
                if (!output || (output && output.stderr)) {
                    console.error(`${counter}.${index} - SQL File (${fileName}) failed to import!`);
                }
            })));
        }
        catch (e) {
            // eslint-disable-next-line no-empty
        }
        /* *********************************** */
        if (debug) {
            console.log(''); // new line
            console.info('Disconnecting from database...');
        }
        yield prisma.$disconnect();
    });
}
exports.default = seed;
