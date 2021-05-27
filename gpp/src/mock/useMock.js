// import axios from 'axios';

// const instance = axios.create();

// export default instance;

import mock from '../utils/mock';

// mock.onPost('/api/home/login').reply(200, {
//     'id': 1,
//     'username': 'raphael',
//     'email': 'raphael@gmail.com'

// })

mock.onPost('/api/home/login').reply((config) => {
    const {email, password} = JSON.parse(config.data);


    if(email !== 'raphael@gmail.com' || password !== 'admin'){
        return[400, {message: 'alguma coisa deu errada no seu login'}] 
    }

    const user = {
        id: 1,
        name: 'raphael',
        username: 'lographa',
        email: 'raphael@gmail.com'
    }

    return[200, {user}]
})