const {createClient} =require('redis');

const client = createClient({
    password: 'K2N00cAAFLkKAVQlb20nPU7SBP9dBtQS',
    socket: {
        host: 'redis-16506.c1.ap-southeast-1-1.ec2.cloud.redislabs.com',
        port: 16506
    }
    ,
     legacyMode: true 
});
module.exports = client;