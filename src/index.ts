import { DMMFClass } from '@prisma/client/runtime';
import PrismaService from './prisma.service';
import seed from './seed';

export { seed };
export { PrismaService };
export { DMMFClass };
export * from '@prisma/client';
export * from './utils/prisma';
