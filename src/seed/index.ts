import fs from 'fs';
import exec from 'child_process';
import util from 'util';
import { PrismaClient } from '@prisma/client';
import userSeed from './seeds/1_users';

async function seed(debug = true) {
    let counter = 1; // the counter is going to be incremented
    const prisma: PrismaClient = new PrismaClient({
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

    await userSeed(prisma, counter, debug).then(() => {
        counter += 1;
    });

    try {
        const sqlPath = './src/seed/sql';
        const nodeTerminal = util.promisify(exec.exec);
        const files = await fs.promises.readdir(sqlPath);
        console.info(counter, '-', 'SQL Files detected:', files);
        await Promise.all(
            files.sort().map(async (fileName, index) => {
                const preCommand = 'PGPASSWORD=secret psql -h localhost -d zero_db -U zero';
                const command = `${preCommand} -f ${sqlPath}/${fileName}`;
                // eslint-disable-next-line @typescript-eslint/no-empty-function
                const output = await nodeTerminal(command).catch(() => {});
                if (output && output.stdout) {
                    console.log(
                        `${counter}.${index} - SQL File (${fileName}) successfully imported!`,
                    );
                }
                if (!output || (output && output.stderr)) {
                    console.error(`${counter}.${index} - SQL File (${fileName}) failed to import!`);
                }
            }),
        );
    } catch (e) {}

    /* *********************************** */

    if (debug) {
        console.log(''); // new line
        console.info('Disconnecting from database...');
    }
    await prisma.$disconnect();
}

export default seed;
