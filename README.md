DemoGraphQL
### Run fake data:
  npm run json:server
### Run app
  node server.js
### Example 
``` 
{
  duycompany: company(id: "20") {
    ...companyField
  }
  duycompany1: company(id: "10") {
    ...companyField
  }
}

fragment companyField on Company {
  id
  name
  description
  users {
    firstName
  }
}

```