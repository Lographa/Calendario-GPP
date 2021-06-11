import mock from "../utils/mock";

// mock.onPost('/api/home/login').reply(200, {
//     'id': 1,
//     'username': 'raphael',
//     'email': 'raphael@gmail.com'

// })

// mock.onPost("/api/home/login").reply((config) => {
//   const { email, password } = JSON.parse(config.data);

//   if (email !== "raphael@gmail.com" || password !== "admin") {
//     return [400, { message: "alguma coisa deu errada no seu login" }];
//   }

//   const user = {
//     id: 1,
//     name: "raphael",
//     username: "lographa",
//     email: "raphael@gmail.com",
//   };

//   return [200, { user }];
// });

mock.onPost("/api/home/login").reply((config) => {
  const { email, password } = JSON.parse(config.data);

  //lista teste sem backend
  const userlist = [
    {
      id: 1,
      name: "raphael",
      username: "lographa",
      email: "raphael@gmail.com",
      senha: "admin",
    },
    {
      id: 2,
      name: "Juan",
      username: "JuanLol",
      email: "juan@gmail.com",
      senha: "12345",
    },
    {
      id: 3,
      name: "José",
      username: "colinques",
      email: "jose@gmail.com",
      senha: "jose",
    },
  ];

  const user = userlist.find(
    (element) => element.email == email && element.senha == password
  );

  return [200, { user }];
});
