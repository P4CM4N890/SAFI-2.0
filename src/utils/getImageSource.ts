
export const getImageSource = (selectedImage: string) => {
    if(selectedImage.includes("1")){
        return require("../../src/assets/profile/Picture1.jpg");
    }
    
    if(selectedImage.includes("2")){
        return require("../../src/assets/profile/Picture2.jpg");
    }
    
    if(selectedImage.includes("3")){
        return require("../../src/assets/profile/Picture3.jpg");
    }
    
    if(selectedImage.includes("4")){
        return require("../../src/assets/profile/Picture4.jpg");
    }
};
