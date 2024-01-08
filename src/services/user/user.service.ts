import { fetchWrapper } from "../../helpers/fetch.wrapper";

const baseUrl = "http://localhost:3000/api/v1"

export const userService = {
    getMyProfile
}

function getMyProfile() {
    return fetchWrapper.get(baseUrl + "/my-profile")
}

