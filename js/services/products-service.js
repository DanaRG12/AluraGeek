const productList = () => {
    return fetch("https://664f8f9dec9b4a4a602f3692.mockapi.io/api/v1/products")
        .then((res) => res.json())
        .catch((err)=> console.log(err));     
};

const createProducts = (name, price, image) => {
    return fetch("https://664f8f9dec9b4a4a602f3692.mockapi.io/api/v1/products", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name,
            price,
            image
        }),
    })
    .then((res) => res.json())
    .catch(err => console.log(err));
}

const deleteProducts = (id) => {
    return fetch(`${"https://664f8f9dec9b4a4a602f3692.mockapi.io/api/v1/products"}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  };


export const servicesProducts= {
    productList,
    createProducts,
    deleteProducts,
};


