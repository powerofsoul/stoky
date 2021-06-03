## Documentations
- [Tabler](https://tabler-react.com/documentation/)
- [Yahoo Finance Stock Api](https://www.npmjs.com/package/yahoo-finance)
- [React StockCharts](http://rrag.github.io/react-stockcharts/)
- [ChartjsNodeCanvas](https://github.com/SeanSobey/ChartjsNodeCanvas#Installation)
- [Prisma](https://www.prisma.io/docs/concepts/components/prisma-schema)

## FAQ
**Q: My models types changes are not visible in typescript**

**A:** Run prisma generate
___
**Q: Why am I getting ```prisma not found```?**

**A** You need to install it globally on your dev machine. Run  ```npm i -g prisma```
___
**Q: How do I deploy my changes to dev db**

**A:** DATABASE_URL=*%%MYSQL_URL%%* prisma dev
___
**Q:** Should I commit migration?
**A:** Yes, we gonna use the committed migration to apply on prod 