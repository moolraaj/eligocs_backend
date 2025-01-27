
class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const keyword = this.queryStr.keyword
            ? {
                name: {
                    $regex: this.queryStr.keyword,
                    $options: 'i'
                }
            } : {};
        console.log(keyword)

        this.query = this.query.find({ ...keyword });
        return this;
    }

    filter() {
        // filter by categories
        const queryCopy = { ...this.queryStr }
        console.log(queryCopy)
        const removeFields = ['keyword', 'page', 'limit']
        removeFields.forEach(key => delete queryCopy[key])



        //filter by price
        let queryStr = JSON.stringify(queryCopy)
        queryStr.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`)
        console.log(queryCopy)



        this.query = this.query.find(JSON.parse(queryStr))
        console.log(queryStr)
        return this

    }
    pagination(resultPerPage){
        let currentPage=Number(this.queryStr.page)||1
        let skpiPage=resultPerPage*(currentPage-1)
        this.query=this.query.limit(resultPerPage).skip(skpiPage)
        return this

        
    }



}

module.exports = ApiFeatures;
