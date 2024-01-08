

const authenticator = async () => {
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
};

const onError = (err: any) => {
  console.log("Error", err);
};

const onSuccess = (res: any) => {
  console.log("Success", res);
};

const imagekitConfig = {
  publicKey: "public_cwepqBJhS9FlX99mg0JkYpd5oug=",
  privateKey: "private_XBN5Cyk9Xaf1vluUyiKxOzcqp5k=",
  urlEndpoint: "https://ik.imagekit.io/slzjfy0o4g/",
  authenticationEndpoint: "https://ik.imagekit.io/slzjfy0o4g/auth",
  authenticator: authenticator,
  onError: onError,
  onSuccess: onSuccess,
};

export default imagekitConfig;
