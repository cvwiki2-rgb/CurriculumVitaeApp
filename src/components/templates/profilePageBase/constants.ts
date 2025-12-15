export const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject('Failed to convert file');
      }
    };

    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
