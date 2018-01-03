Steps to run project:
1. Install Mongodb and run mongod command.
2. Loading dump data into mongo
    a. curl --get https://s3-ap-southeast-1.amazonaws.com/he-public-data/2015-01-01-0d42d3c3.json > test-data.json
    b. mongoimport --db techscan --collection repo --drop --file D:\NodeJS\test-data.json
3. Provide host and port configuration in .env file.
4. npm install.
5. npm start.
6. Click on http://localhost:9080/api/health-check and verify OK is coming.
