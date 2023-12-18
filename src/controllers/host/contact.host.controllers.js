class Contact{

     sendMessage(req,res,next){
       res.json(req.query.room);
     }


}
module.exports = new Contact();