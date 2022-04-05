import axios from 'axios';

export default ({ req }) => {
  // We have to decide the domain where to send the request to because of
  // the client application is running inside a Pod and we need to comunicate
  // to ingress-ngnix to proxy the request to the auth service.
  if (typeof window === 'undefined') {
    // we are on the server
    // request should be made to:
    // http://ingress-ngnix.ingress-ngnix-controller....
    return axios.create({
      baseURL:
        'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
      headers: req.headers,
    });
  } else {
    // we are on the browser
    // request can be with a base URL of ''
    return axios.create({
      baseUrl: '/',
    });
  }
};
