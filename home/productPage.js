let nameProd = document.querySelector('.nameProd').value.trim();
let descProd = document.querySelector('.descProd').value.trim();
let prixProd = document.querySelector('.prixProd').value.trim();
let btnAddProd = document.querySelector('.btnAddProd');

let products = []
btnAddProd.addEventListener('click', () => {
    if (!nameProd || !descProd || !prixProd) {
        alert('matkhelich chi haja khawya!');
    }
    
});