let btnAddProd = document.querySelector('.btnAddProd');

let products = JSON.parse(localStorage.getItem('products')) || []; // Load existing products from local storage

btnAddProd.addEventListener('click', () => {
    
    let nameProd = document.querySelector('.nameProd').value.trim();
    let prixProd = document.querySelector('.prixProd').value.trim();

    if (!nameProd  || !prixProd) {
        alert('matkhelich chi haja khawya!');
        return;
    }
    let newProduct = {
        name: nameProd,
        price: parseFloat(prixProd), 
    };

    products.push(newProduct);

    localStorage.setItem('products', JSON.stringify(products));

    document.querySelector('.nameProd').value = '';
    document.querySelector('.prixProd').value = '';

    alert('Product added successfully!');
       
});
