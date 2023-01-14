import { PrismaClient, Account } from '@prisma/client';

type TokenFields =
    | 'refresh_token'
    | 'access_token'
    | 'expires_at'
    | 'token_type'
    | 'scope'
    | 'id_token'
    | 'session_state'
    | 'oauth_token';

function generateTestingAccountData(id: string): Omit<Account, TokenFields> {
    return {
        id,
        providerAccountId: id,
        userId: id,
        provider: 'app',
        type: 'credentials',
        email: `dev_${id}@nestjs.com`,
        password:
            '$argon2id$v=19$m=4096,t=3,p=1$3Z7cLGdKVu5KLq9An10jRA$Kb6TlWtJYa7lFnRCOWm3tBJjyqJlvrWncNaKP3FZvoQ', // testtest
    };
}

async function run(prisma: PrismaClient, counter: number, debug: boolean) {
    const description = `${counter} - Executing account seed...`;
    if (debug) console.log(description);

    await prisma.account
        .createMany({
            data: [generateTestingAccountData('1'), generateTestingAccountData('2')],
            skipDuplicates: true,
        })
        .catch((err) => {
            if (debug) console.log(err);
        });
}

export default run;
