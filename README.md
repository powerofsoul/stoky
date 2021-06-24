## Documentations
- [Tabler](https://tabler-react.com/documentation/) http://oldtablerdocs.yeapguy.gq/
- [TablerIcons](https://tabler-icons-react.vercel.app/)
- [Yahoo Finance Stock Api](https://www.npmjs.com/package/yahoo-finance)
- [React StockCharts](http://rrag.github.io/react-stockcharts/)
- [ChartjsNodeCanvas](https://github.com/SeanSobey/ChartjsNodeCanvas#Installation)
- [Prisma](https://www.prisma.io/docs/concepts/components/prisma-schema)

## Developer guide
- install aws cli
- create new user on aws web interface
- run ``aws configure``
- create a new file ``.env.local``
- copy content of .env.defaults. 
- you either run ``npm run docker-db`` to start a local db or connect to dev rds db. If you plan to use docker db, you need to deploy the database migration using ``DATABASE_URL='mysql://local:local@localhost:3306/local' prisma migrate deploy``
- npm run dev
- enjoy

### Policy roles required
- ses
- dynamo db
- s3

## FAQ
**Q: My models types changes are not visible in typescript**

**A:** Run ``prisma generate``
___
**Q: Why am I getting ```prisma not found```?**

**A** You need to install it globally on your dev machine. Run  ```npm i -g prisma```
___
**Q: How do I deploy my changes to dev db? How do I create a migration?**

**A:** DATABASE_URL=*%%MYSQL_URL%%* prisma dev
___
**Q:** Should I commit migration?

**A:** Yes, we gonna use the committed migration to apply on prod. Until the initial release we can overwrite older migrations.

___
**Q: Should I commit package-lock.json?**

**A:** YES