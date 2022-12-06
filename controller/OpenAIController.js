const helper = require('../helper/helper');

module.exports = {
    list_models:async function(req,res){
        let openai = await helper.open_api_key_gen();
        let response = await openai.listEngines()
        .then((txt)=>{ return res.send({data:txt.data}); })
        .catch((err)=>{ return res.send({data:err.data}); });
        
    },
    create_images:async function(req,res){
        let openai = await helper.open_api_key_gen();
        try{
        const response = await openai.createImage({
            prompt: "A cute baby sea otter",
            n: 2,
            size: "1024x1024",
          });

          return res.send({data:response.data});
        }
        catch(e)
        {
            return res.send(e);
        }
        
    },
    create_completion:async function(req,res){
        let openai = await helper.open_api_key_gen();
        try{
            const response = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: "Might be my name is Debajyoti",
                max_tokens: 2,
                temperature: 0,
            });

            return res.send({data:response.data});
        }
        catch(e)
        {
            return res.send(e);
        }
        // return res.send({data:response.data});
    }
}
// };

// module.exports = {
//     list_models,
//     create_images };