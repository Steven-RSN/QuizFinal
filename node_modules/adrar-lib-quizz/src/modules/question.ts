import API from "../API.js";
import { Module } from "../Module.js";

/**
 * Description placeholder
 *
 * @export
 * @interface Question
 * @typedef {Question}
 */
export interface Question {
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
    /**
     * Description placeholder
     *
     * @type {string}
     */
    description: string;
    /**
     * Description placeholder
     *
     * @type {number}
     */
    value: number;
    /**
     * Description placeholder
     *
     * @type {{
     *         text: string;
     *         valid: boolean;
     *     }[]}
     */
    answers: {
        text: string;
        valid: boolean;
    }[];
}

/**
 * Description placeholder
 *
 * @interface CreateQuestion
 * @typedef {CreateQuestion}
 */
interface CreateQuestion {
    /**
     * Description placeholder
     *
     * @type {string}
     */
    title: string;
    /**
     * Description placeholder
     *
     * @type {string}
     */
    description: string;
    /**
     * Description placeholder
     *
     * @type {number}
     */
    pointNumber: number;
    /**
     * Description placeholder
     *
     * @type {{
     *         text: string;
     *         valid: boolean;
     *     }[]}
     */
    answers: {
        text: string;
        valid: boolean;
    }[];
}

/**
 * Description placeholder
 *
 * @export
 * @class QuestionModule
 * @typedef {QuestionModule}
 * @extends {Module}
 */
export default class QuestionModule extends Module {
    /**
     * Creates an instance of QuestionModule.
     *
     * @constructor
     * @param {API} api
     */
    constructor(api: API) {
        super(api);
    }

    /** Description placeholder */
    init(): void {
        console.log("Question module initialized");
    }

    /**
     * Description placeholder
     *
     * @async
     * @param {string} jwtToken
     * @returns {Promise<Question[] | null>}
     */
    async getQuestions(jwtToken: string): Promise<Question[] | null> {
        try {
            const questions = await this.makeRequest<Question[]>("/api/question/all", { headers: { Authorization: `${jwtToken}` } });
            return questions;
        } catch (error) {
            console.error("Error fetch questions", error);
            return null;
        }
    }

    /**
     * Description placeholder
     *
     * @async
     * @param {CreateQuestion} questionCreate
     * @param {string} jwtToken
     * @returns {Promise<Question | null>}
     */
    async create(questionCreate: CreateQuestion, jwtToken: string): Promise<Question | null> {
        try {
            const question = await this.makeRequest<Question>("/api/question", {
                body: JSON.stringify(questionCreate),
                headers: { Authorization: `${jwtToken}` },
                method: "POST",
            });
            return question;
        } catch (error) {
            console.error("Error create question:", error);
            return null;
        }
    }
}
