import {ManagementClient} from 'auth0';
import config from '../config';

const management = new ManagementClient({
    domain: config.AUTH0_DOMAIN,
    clientId: config.AUTH0_MGT_API_CLIENT_ID,
    clientSecret: config.AUTH0_MGT_API_CLIENT_SECRET,
    scope: 'read:users'
});

export default management