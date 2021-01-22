//pagination middleware works in both RAW sql queries with sequelize.query and sequelize ORM methods
module.exports.paginate = (page)=>{
    if(page>0){
        const limit = 25;
        let startIndex = (page - 1) * limit;
        //i have appended pagination to req to be used inside ORM findAll Method as limit = req.limit and offset = req.skip
        return {limit,startIndex}
    }else{
        throw Error('enter postive page number') 
        }
}