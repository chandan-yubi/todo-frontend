import { fetchWrapper } from "../../helpers/fetch.wrapper";

const baseUrl = "http://localhost:3000/api/v1";
export const fileUpload = {
  authenticator
};


async function authenticator() {
  try {
    const response = await fetch("http://localhost:3002/auth");

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error) {
    throw new Error(`Authentication request failed: ${error}`);
  }
}
