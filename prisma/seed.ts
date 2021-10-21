import { PrismaClient } from '@prisma/client'
import * as fs from 'fs';

const prisma: any = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);

  const files = fs.readdirSync('./prisma/seeds');
  const tableNames = files.map(file => file.split('.').shift());

  for (const tableName of tableNames) {
    const records = JSON.parse(fs.readFileSync('./prisma/seeds/' + tableName + '.json', 'utf-8'));

    for (const record of records) {
      await createRecord(tableName as string, record);
    }
  }

  console.log(`Seeding finished.`);
}

async function createRecord(tableName: string, data: any) {
  return await prisma[tableName].create({
    data
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  })
