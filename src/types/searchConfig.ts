import { Categories } from "./categories"
import { Seniority } from "./seniority"

export interface ICreateSearchConfig {
    searchString: string;
    category: Categories;
    seniority: Seniority;
    companyRating: number;
}