const readImageAsDataURL = (
  file: File
): Promise<string | ArrayBuffer | null> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = () => {
      reject(reader);
    };
    reader.readAsDataURL(file);
  });
};

export default readImageAsDataURL;
