import {courses} from "@/mock/courses";
import {certifications} from "@/mock/certifications";
import {experiences} from "@/mock/experiences";
import {projects} from "@/mock/projects";
import {testimonials} from "@/mock/testimonials";

// Simulates network latency
const delay = (ms) => new Promise(res => setTimeout(res, ms));

export async function getCourses() {
    await delay(300);
    return courses;
}

export async function getCertifications() {
    await delay(300);
    return certifications;
}

export async function getExperiences() {
    await delay(300);
    return experiences;
}

export async function getProjects() {
    await delay(300);
    return projects;
}

export async function getTestimonials() {
    await delay(300);
    return testimonials;
}
