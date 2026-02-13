import {courses} from "@/mock/courses";
import {certifications} from "@/mock/certifications";
import {experiences} from "@/mock/experiences";
import {projects} from "@/mock/projects";
import {testimonials} from "@/mock/testimonials";
import {tradingPerformance} from "@/mock/trading";
import {links} from "@/mock/links";

/**
 * Simulates network latency.
 *
 * @param ms - Milliseconds to wait before resolving.
 * @returns Promise that resolves after the given delay.
 */
const delay = (ms) => new Promise(res => setTimeout(res, ms));

/**
 * Fetches course data.
 *
 * Simulates a remote API call and resolves with the list of courses.
 *
 * @returns Promise resolving to the courses dataset.
 */
export async function getCourses() {
    await delay(300);
    return courses;
}

/**
 * Fetches certification data.
 *
 * Simulates a remote API call and resolves with the list of certifications.
 *
 * @returns Promise resolving to the certifications dataset.
 */
export async function getCertifications() {
    await delay(300);
    return certifications;
}

/**
 * Fetches professional experience data.
 *
 * Simulates a remote API call and resolves with the list of experiences.
 *
 * @returns Promise resolving to the experiences dataset.
 */
export async function getExperiences() {
    await delay(300);
    return experiences;
}

/**
 * Fetches project data.
 *
 * Simulates a remote API call and resolves with the list of projects.
 *
 * @returns Promise resolving to the projects dataset.
 */
export async function getProjects() {
    await delay(300);
    return projects;
}

/**
 * Fetches testimonial data.
 *
 * Simulates a remote API call and resolves with the list of testimonials.
 *
 * @returns Promise resolving to the testimonials dataset.
 */
export async function getTestimonials() {
    await delay(300);
    return testimonials;
}

/**
 * Fetches trading performance metrics.
 *
 * Simulates a remote API call and resolves with trading performance data.
 *
 * @returns Promise resolving to the trading performance dataset.
 */
export async function getTradingPerformance() {
    await delay(300);
    return tradingPerformance;
}

/**
 * Fetches social and external link data.
 *
 * Simulates a remote API call and resolves with the list of links.
 *
 * @returns Promise resolving to the links dataset.
 */
export async function getLinks() {
    await delay(300);
    return links;
}
