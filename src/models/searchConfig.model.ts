import mongoose from 'mongoose';

const searchConfig = new mongoose.Schema({
    searchString: {
        type: String
    },
    category: {
        required: true,
        type: String
    },
    seniority: {
        required: true,
        type: Array,
    },
    companyRating: {
        required: true,
        type: Number
    },
    userId: {
        required: true,
        type: String,
    }
});

const SearchConfigModel = mongoose.model('search-configs', searchConfig)

export { SearchConfigModel }
