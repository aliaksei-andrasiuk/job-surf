import mongoose from 'mongoose';

const searchConfigs = new mongoose.Schema({
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

export const SearchConfigsModel = mongoose.model('search-configs', searchConfigs)
