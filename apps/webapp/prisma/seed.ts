import {prisma }from "../src/server/db";

async function main() {
  const id = "1";
  await prisma.user.upsert({
    where: {
      id,
    },
    create: {
      id,
     
    },
    update: {},
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });