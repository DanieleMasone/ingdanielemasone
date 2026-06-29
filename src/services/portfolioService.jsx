import {courses} from "@/mock/courses";
import {certifications} from "@/mock/certifications";
import {experiences} from "@/mock/experiences";
import {projects} from "@/mock/projects";
import {testimonials} from "@/mock/testimonials";
import {tradingPerformance} from "@/mock/trading";
import {githubProjects} from "@/mock/githubProjects";

/**
 * Local data loader helpers for the portfolio.
 *
 * The site uses bundled static datasets. These helpers keep page components
 * decoupled from the dataset files and preserve the same loading/error UI flow
 * a remote source would use, without introducing a backend dependency.
 *
 * @module services/portfolioService
 */

/**
 * Simulates a small loading delay for static portfolio datasets.
 *
 * @param {number} ms - Milliseconds to wait before resolving.
 * @returns {Promise<void>} Promise resolved after the given delay.
 */
const delay = (ms) => new Promise(res => setTimeout(res, ms));

/**
 * Loads static course entries for the Courses page.
 *
 * @returns {Promise<Array<object>>} Promise resolving to the courses' dataset.
 */
export async function getCourses() {
    await delay(300);
    return courses;
}

/**
 * Loads static certification entries for the Certifications page.
 *
 * @returns {Promise<Array<object>>} Promise resolving to the certifications' dataset.
 */
export async function getCertifications() {
    await delay(300);
    return certifications;
}

/**
 * Loads static professional experience entries for the Experience page.
 *
 * @returns {Promise<Array<object>>} Promise resolving to the experiences' dataset.
 */
export async function getExperiences() {
    await delay(300);
    return experiences;
}

/**
 * Loads static project entries for the Projects page.
 *
 * @returns {Promise<Array<object>>} Promise resolving to the projects' dataset.
 */
export async function getProjects() {
    await delay(300);
    return projects;
}

/**
 * Loads static GitHub repository entries for the GitHub Projects page.
 *
 * @returns {Promise<Array<object>>} Promise resolving to the GitHub projects dataset.
 */
export async function getGithubProjects() {
    await delay(300);
    return githubProjects;
}

/**
 * Loads static testimonial entries for the Testimonials page.
 *
 * @returns {Promise<Array<object>>} Promise resolving to the testimonials' dataset.
 */
export async function getTestimonials() {
    await delay(300);
    return testimonials;
}

/**
 * Loads static trading performance metrics for the Trading page.
 *
 * @returns {Promise<Object>} Promise resolving to the trading performance dataset.
 */
export async function getTradingPerformance() {
    await delay(300);
    return tradingPerformance;
}
