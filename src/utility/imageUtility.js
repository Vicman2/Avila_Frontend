export const generateBase64FromImage = imageFile => {
    const reader = new FileReader();
    const promise = new Promise((resolve, reject) => {
      reader.onload = e => resolve(e.target.result);
      reader.onerror = err => reject(err);
    });
  
    reader.readAsDataURL(imageFile);
    return promise;
  };
export const convertUriToFile = (dataUri) => {
  let byteString = atob(dataUri.split(',')[1]);
  let ab= new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab)
  for(var i =0; i < byteString.length;i++){
    ia[i] = byteString.charCodeAt(i);
  }
  var blob = new Blob([ia], {type: 'image/jpg'})
}