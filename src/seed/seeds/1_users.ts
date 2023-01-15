/* eslint-disable no-console */
import { PrismaClient, User, UserType } from '@prisma/client';

type TimestampFields = 'createdAt' | 'updatedAt' | 'deletedAt';

function generateTestingUserData(id: string, userType: UserType): Omit<User, TimestampFields> {
    return {
        id,
        name: `John Doe`,
        email: `test${id}@test.com`,
        userType,
    };
}

async function run(prisma: PrismaClient, counter: number, debug: boolean) {
    const description = `${counter} - Executing user seed...`;
    if (debug) console.log(description);

    await prisma.user
        .createMany({
            data: [generateTestingUserData('1', 'USER'), generateTestingUserData('2', 'ADMIN')],
            skipDuplicates: true,
        })
        .catch((err: any) => {
            if (debug) console.log(err);
        });
}

export default run;
