const { Configuration, OpenAIApi } = require("openai");

module.exports ={
    open_api_key_gen: async function(req, res){
        const configuration = new Configuration({
            organization: process.env.OPENAI_ORGANIZATION,
            apiKey: process.env.OPENAI_API_KEY,
        });
    
        const openai = new OpenAIApi(configuration);
        return openai;
    },
    // generateJwtToken: async function (document) {
    //     // const options = { expiresIn: '365d' };
    //     const options = {};
    //     if(document == '')
    //         const token = jwt.sign(document, process.env.JWT_TOKEN, options);
    //     
    //     return token;
    // },
};