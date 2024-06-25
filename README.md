cp .env.local.example .env.local
cp .env.example .env

npx prisma generate  
npx prisma db push
npx prisma studio
