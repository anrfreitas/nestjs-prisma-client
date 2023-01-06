/* eslint-disable no-console */
import { PrismaClient, User } from '@prisma/client';

function generateTestingUserData(
    id: string,
    userRole: 'USER' | 'ADMIN',
): Partial<User> {
    return {
        id,
        name: `No. ${id}`,
        email: `dev_${id}@nestjs.com`,
        userRole,
    };
}

async function run(prisma: PrismaClient, counter: number, debug: boolean) {
    const description = `${counter} - Executing user seed...`;
    if (debug) console.log(description);

    await prisma.user
        .createMany({
            data: [
                generateTestingUserData('1', 'USER'),
                generateTestingUserData('2', 'ADMIN'),
            ],
            skipDuplicates: true,
        })
        .catch((err: any) => {
            if (debug) console.log(err);
        });
}

export default run;
