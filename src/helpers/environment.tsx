let APIURL: string = '';

switch (window.location.hostname) {

    case 'localhost' || '127.0.0.1':
        APIURL = 'http://localhost:4000';
        break;
    case 'artsee-client.herokuapp.com/':
        APIURL = 'https://artsee-server.herokuapp.com/'
}

export default APIURL;  