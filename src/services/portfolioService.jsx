import {courses} from "@/mock/courses";
import {certifications} from "@/mock/certifications";
import {experiences} from "@/mock/experiences";
import {projects} from "@/mock/projects";
import {testimonials} from "@/mock/testimonials";
import {tradingPerformance} from "@/mock/trading";
import {links} from "@/mock/links";

/**
 * Simulates a small loading delay for static portfolio datasets.
 *
 * @param {number} ms - Milliseconds to wait before resolving.
 * @returns {Promise<void>} Promise resolved after the given delay.
 */
const delay = (ms) => new Promise(res => setTimeout(res, ms));

/**
 * Loads course data for the Courses page.
 *
 * @returns {Promise<Array>} Promise resolving to the courses dataset.
 */
export async function getCourses() {
    await delay(300);
    return courses;
}

/**
 * Loads certification data for the Certifications page.
 *
 * @returns {Promise<Array>} Promise resolving to the certifications dataset.
 */
export async function getCertifications() {
    await delay(300);
    return certifications;
}

/**
 * Loads professional experience data for the Experience page.
 *
 * @returns {Promise<Array>} Promise resolving to the experiences dataset.
 */
export async function getExperiences() {
    await delay(300);
    return experiences;
}

/**
 * Loads project data for the Projects page.
 *
 * @returns {Promise<Array>} Promise resolving to the projects dataset.
 */
export async function getProjects() {
    await delay(300);
    return projects;
}

/**
 * Loads testimonial data for the Testimonials page.
 *
 * @returns {Promise<Array>} Promise resolving to the testimonials dataset.
 */
export async function getTestimonials() {
    await delay(300);
    return testimonials;
}

/**
 * Loads trading performance metrics for the Trading page.
 *
 * @returns {Promise<Object>} Promise resolving to the trading performance dataset.
 */
export async function getTradingPerformance() {
    await delay(300);
    return tradingPerformance;
}

/**
 * Loads social and external link data for the Footer.
 *
 * @returns {Promise<Array>} Promise resolving to the links dataset.
 */
export async function getLinks() {
    await delay(300);
    return links;
}
