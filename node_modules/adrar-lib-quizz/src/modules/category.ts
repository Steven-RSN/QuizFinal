import API from "../API.js";
import { Module } from "../Module.js";

/**
 * Description placeholder
 *
 * @export
 * @interface Category
 * @typedef {Category}
 */
export interface Category {
    /**
     * Description placeholder
     *
     * @type {number}
     */
    id: number;
    /**
     * Description placeholder
     *
     * @type {string}
     */
    title: string;
}

/**
 * Description placeholder
 *
 * @interface CreateCategory
 * @typedef {CreateCategory}
 */
interface CreateCategory {
    /**
     * Description placeholder
     *
     * @type {string}
     */
    title: string;
}

/**
 * Description placeholder
 *
 * @export
 * @class CategoryModule
 * @typedef {CategoryModule}
 * @extends {Module}
 */
export default class CategoryModule extends Module {
    /**
     * Creates an instance of CategoryModule.
     *
     * @constructor
     * @param {API} api
     */
    constructor(api: API) {
        super(api);
    }

    /** Description placeholder */
    init(): void {
        console.log("Category module initialized");
    }

    /**
     * Description placeholder
     *
     * @async
     * @param {string} jwtToken
     * @returns {Promise<Category[] | null>}
     */
    async getCategories(jwtToken: string): Promise<Category[] | null> {
        try {
            const user = await this.makeRequest<Category[]>("/api/category/all", { headers: { Authorization: `${jwtToken}` } });
            return user;
        } catch (error) {
            console.error("Error fetch categories", error);
            return null;
        }
    }

    /**
     * Uniquement les ROLE_ADMIN peuvent créer une catégorie
     *
     * @async
     * @param {CreateCategory} categoryCreate
     * @param {string} jwtToken
     * @returns {Promise<Category | null>}
     */
    async create(categoryCreate: CreateCategory, jwtToken: string): Promise<Category | null> {
        try {
            const category = await this.makeRequest<Category>("/api/category", {
                body: JSON.stringify(categoryCreate),
                headers: { Authorization: `${jwtToken}` },
                method: "POST",
            });
            return category;
        } catch (error) {
            console.error("Error create category:", error);
            return null;
        }
    }
}
