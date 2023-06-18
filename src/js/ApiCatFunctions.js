
export function fetchBreeds() {
    return fetch('https://api.thecatapi.com/v1/breeds?api_key=live_1z5L0CvrhMTFZ4XEUO61vQ74pB03vb0BjjO6CjWhmYwbZtl8a47KoLeViV61GwIs').then(data => {
        if (!data.ok) {
            throw new Error(data.status)
        }
        return data.json();
    })
};

 export function fetchCatByBreed(breedId) {
    
     return fetch(`https://api.thecatapi.com/v1/images/search?has_breeds=1&breed_ids=${breedId}&api_key=live_1z5L0CvrhMTFZ4XEUO61vQ74pB03vb0BjjO6CjWhmYwbZtl8a47KoLeViV61GwIs`)
      
         .then(data => {
             if (!data.ok) {
                 throw new Error(data.status)
             }
             return data.json();
         });
}; 