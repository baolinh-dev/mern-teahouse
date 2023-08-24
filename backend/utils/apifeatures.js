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
                      $options: 'i', // case insensitive
                  },
              }
            : {};

        this.query = this.query.find({ ...keyword });
        return this;
    }
    filter() {
        const queryCopy = { ...this.queryStr };
        // Removing some fields for category
        const removeFields = ['keyword', 'page', 'limit', 'category']; // Thêm 'category' vào danh sách các trường loại bỏ
        removeFields.forEach((key) => delete queryCopy[key]);
        // Filter For Price and Rating
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }
    category() {
        if (this.queryStr.category) {
            this.query = this.query.find({ category: this.queryStr.category });
        }
        this.countQuery = this.query.model.countDocuments(this.query._conditions); // Count documents with category filter applied
        return this;
    }
    pagination(resultPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resultPerPage * (currentPage - 1);
        this.query = this.query.limit(resultPerPage).skip(skip);
        return this;
    }
}

module.exports = ApiFeatures;
