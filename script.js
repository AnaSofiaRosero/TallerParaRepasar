const app = document.getElementById("app");

function crearProducto(producto) {

  const card = document.createElement("div");
  card.className = "card";

  const titulo = document.createElement("h3");
  titulo.textContent = producto.nombre;

  const img = document.createElement("img");
  img.src = producto.imagen;

  const desc = document.createElement("p");
  desc.textContent = producto.descripcion;

  const precio = document.createElement("p");
  precio.textContent = "$ " + (producto.precio * 4000).toLocaleString("es-CO");

  const btn = document.createElement("button");
  btn.textContent = "Agregar al carrito";
  btn.className = "btn add-btn";

  btn.addEventListener("click", () => {
    btn.textContent = "Agregado";
    btn.style.background = "#22c55e";
    btn.disabled = true;
  });

  const reviewBtn = document.createElement("button");
  reviewBtn.textContent = "Mostrar reseñas";
  reviewBtn.className = "btn review-btn";

  const reviewContainer = document.createElement("div");
  reviewContainer.className = "review-container";
  reviewContainer.style.display = "none";

  if (producto.reseñas.length === 0) {
    const p = document.createElement("p");
    p.textContent = "No hay reseñas disponibles";
    reviewContainer.appendChild(p);
  } else {
    producto.reseñas.forEach(r => {

      const caja = document.createElement("div");
      caja.className = "review-card";

      const fila = document.createElement("div");
      fila.className = "review-top";

      const nombre = document.createElement("span");
      nombre.textContent = r.usuario;

      const fecha = document.createElement("span");
      const f = new Date(r.fecha);
      fecha.textContent = `${f.getDate()}/${f.getMonth()+1}/${f.getFullYear()}`;

      fila.appendChild(nombre);
      fila.appendChild(fecha);

      const texto = document.createElement("p");
      texto.textContent = r.texto;

      caja.appendChild(fila);
      caja.appendChild(texto);

      reviewContainer.appendChild(caja);
    });
  }

  reviewBtn.addEventListener("click", () => {
    if (reviewContainer.style.display === "none") {
      reviewContainer.style.display = "block";
      reviewBtn.textContent = "Ocultar reseñas";
    } else {
      reviewContainer.style.display = "none";
      reviewBtn.textContent = "Mostrar reseñas";
    }
  });

  card.appendChild(titulo);
  card.appendChild(img);
  card.appendChild(desc);
  card.appendChild(precio);
  card.appendChild(btn);
  card.appendChild(reviewBtn);
  card.appendChild(reviewContainer);

  app.appendChild(card);
}


fetch("catalogo.json")
  .then(res => res.json())
  .then(productos => {
    productos.forEach(p => crearProducto(p));
  });