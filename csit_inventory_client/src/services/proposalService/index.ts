"use server"

import { revalidateTag } from "next/cache";
import { baseApi } from "../baseApi/baseApi";
import { FieldValues } from "react-hook-form";
import { IProposal } from "@/types";

const baseUrl = process.env.NEXT_PUBLIC_BASE_API;

export const createProjectThesis = async (ProjectThesisData: FieldValues) => {
    try {
        const res = await baseApi(`${baseUrl}/project-thesis`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ProjectThesisData)
        });
        revalidateTag("project", "max");
        return res
    } catch (error) {
        throw error
    }
}

export const getSingleStudentProposal = async () => {
    try {
        const res = await baseApi(`${baseUrl}/project-thesis/student`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            next: {
                tags: ['project']
            }
        })
        return res
    } catch (error) {
        throw error
    }
}

export const getSingleProposal = async (id: string) => {
    try {
        const res = await baseApi(`${baseUrl}/project-thesis/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            next: {
                tags: ['project']
            }
        })
        return res
    } catch (error) {
        throw error
    }
}

export const getSingleTeacherProposal = async () => {
    try {
        const res = await baseApi(`${baseUrl}/project-thesis/supervisor`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            next: {
                tags: ['project']
            }
        })
        return res
    } catch (error) {
        throw error
    }
}

export const approveProposal = async (id: string) => {
    try {
        const res = await baseApi(`${baseUrl}/project-thesis/approve-project-thesis/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
        });
        revalidateTag("project", "max");
        return res
    } catch (error) {
        throw error
    }
}

export const rejectProposal = async (id: string) => {
    try {
        const res = await baseApi(`${baseUrl}/project-thesis/reject-project-thesis/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
        });
        revalidateTag("project", "max");
        return res
    } catch (error) {
        throw error
    }
}

export const requestForTask = async (id: string) => {
    try {
        const res = await baseApi(`${baseUrl}/project-thesis/start-project-thesis/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
        });
        revalidateTag("project", "max");
        return res
    } catch (error) {
        throw error
    }
}

export const updateProposal = async (id: string, data: FieldValues) => {
    try {
        const res = await baseApi(`${baseUrl}/project-thesis/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        revalidateTag("project", "max");
        return res
    } catch (error) {
        throw error
    }
}

export const completeProject = async (id: string) => {
    try {
        const res = await baseApi(`${baseUrl}/project-thesis/complete-project-thesis/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
        });
        revalidateTag("project", "max");
        return res
    } catch (error) {
        throw error
    }
}