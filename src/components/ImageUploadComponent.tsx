import { IKContext, IKImage, IKUpload } from 'imagekitio-react';

const urlEndpoint = 'https://ik.imagekit.io/slzjfy0o4g';
const publicKey = 'public_cwepqBJhS9FlX99mg0JkYpd5oug='; 
const authenticator =  async () => {
    try {
        const response = await fetch('http://localhost:3002/auth');

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Request failed with status ${response.status}: ${errorText}`);
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
const ImageUploadComponent = () => {

  return (
    <div className="App">
      <h1>ImageKit React quick start</h1>
      <IKContext 
        publicKey={publicKey} 
        urlEndpoint={urlEndpoint} 
        authenticator={authenticator} 
      >
        <p>Upload an image</p>
        <IKUpload
          fileName="test-upload.png"
          onError={onError}
          onSuccess={onSuccess}
        />
      </IKContext>
    </div>
  )
}

export default ImageUploadComponent