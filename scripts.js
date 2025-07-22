let boton = document.getElementById("enviarFormulario") ;

/* ------------------ LISTA DE PRODUCTOS ------------------*/

const productos = [

    {
        id: "01",
        imagen: "imagenes/Producto comida.jpg",
        alt:"comida de perros",
        nombre: "Comida para perros",
        descripcion: "10kg",
        precio: 50000,
    },
    {
        id: "02",
        imagen: "imagenes/Producto Comedero.webp",
        alt:"ccomedero",
        nombre: "Comedero para perros",
        descripcion:"Color blanco",
        precio: 50000,
    },
    {
        id: "03",
        imagen: "imagenes/Producto peines.webp",
        alt:"peines",
        nombre:"Peines para mascotas",
        descripcion:"4 cepillos y un alicate",
        precio: 50000,
    },
    {
        id: "04",
        imagen: "imagenes/Producto Rascador Cubo.webp",
        alt:"rascador gato",
        nombre: "Rascador para gatos",
        descripcion:"Colo marron",
        precio: 50000,
    },
    {
        id: "05",
        imagen: "imagenes/Producto Comida1.jpg",
        alt:"comida de perros",
        nombre:"Comida para perros",
        descripcion:"5kg",
        precio: 50000,
    },
    {
        id: "06",
        imagen: "imagenes/Producto Comida2.webp",
        alt:"comida de perros",
        nombre:"Comida para perros",
        descripcion:"Perros adultos, 10kg",
        precio: 50000,
    }
]

/*------------ AGREGAR PRODUCTO AL CARRITO ------------*/

let carrito = [];

// Agrega un producto al carrito o incrementa su cantidad si ya existe.
function agregarProductoAlCarrito(idProducto) {
        // Buscar si el producto ya está en el carrito
        let productoEnCarrito = null;
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].id === idProducto) {
            productoEnCarrito = carrito[i];
            break; // Salir del bucle una vez que se encuentra el producto
        }
    }

    if (productoEnCarrito) {
        // Si el producto ya está, incrementar la cantidad
        productoEnCarrito.cantidad++;
    } else {
        // Si no está, buscar el producto en el array 'productos' original
        let productoOriginal = null;
        for (let i = 0; i < productos.length; i++) {
            if (productos[i].id === idProducto) {
                productoOriginal = productos[i];
                break; // Salir del bucle
            }
        }        
        
        // Añadir el producto al carrito con cantidad 1
        carrito.push({ ...productoOriginal, cantidad: 1 });
    }
    actualizarCarritoHTML(); // Actualizar la vista del carrito
}

/*------------ Maneja el evento de clic en los botones "Comprar" ------------*/

function manejarClicComprar(evento) {    
    const productoId = evento.target.dataset.id;
    agregarProductoAlCarrito(productoId);    
}

/* ------------------ FUNCION AÑADIR PRODUCTOS ------------------*/

function agregarProductos() {
    const divProductos = document.querySelector(".productos");

    for (let i = 0; i < productos.length; i++) {
        const producto = productos[i];

        const card = document.createElement("div");
        card.classList.add("card-productos");
        card.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.alt}">
            <div class="descripcion-productos">
                <h3>${producto.nombre}</h3>
                <p>${producto.precio}</p>
                <button class="btn-comprar" type="button" data-id="${producto.id}">Añadir a carrito</button>
            </div>
        `;

        card.querySelector(".btn-comprar").addEventListener("click", manejarClicComprar);

        divProductos.appendChild(card);
    }
}

// Maneja el evento de clic en los botones de cantidad y eliminar del carrito.
function manejarClicCarrito(evento) {
    const target = evento.target;

    if (target.classList.contains("btn-cantidad") || target.classList.contains("btn-eliminar")) {
        const productoId = target.dataset.id;
        const accion = target.dataset.action;

        if (accion === "eliminar") {
            eliminarProductoDelCarrito(productoId);
        } else if (accion === "restar") {
            restarCantidadProducto(productoId);
        } else if (accion === "sumar") {
            sumarCantidadProducto(productoId);
        }
    }
}


function actualizarCarritoHTML() {
    const carritoCompras = document.querySelector(".carritoCompras");

    carritoCompras.innerHTML = `
        <h2>Tu Carrito de Compras</h2>
        <ul class="lista-carrito"></ul>
        <p class="total-carrito"></p>
        <p class="cantidad-carrito"></p>
    `;

    const listaCarrito = carritoCompras.querySelector(".lista-carrito");
    let totalPagar = 0;
    let cantidadProductosUnicos = 0;

    if (carrito.length === 0) {
        listaCarrito.innerHTML = "<p>El carrito está vacío.</p>";
    } else {
        for (let i = 0; i < carrito.length; i++) {
            const item = carrito[i];
            const li = document.createElement("li");
            li.innerHTML = `
                <span>${item.nombre} - $${item.precio} x ${item.cantidad}</span>
                <div>
                    <button class="btn-cantidad" data-id="${item.id}" data-action="restar">-</button>
                    <button class="btn-cantidad" data-id="${item.id}" data-action="sumar">+</button>
                    <button class="btn-eliminar" data-id="${item.id}" data-action="eliminar">x</button>
                </div>
            `;
            listaCarrito.appendChild(li);
            totalPagar += item.precio * item.cantidad;
            cantidadProductosUnicos++;
        }
    }

    // Mostrar total a pagar
    carritoCompras.querySelector(".total-carrito").textContent = `Total a pagar: $${totalPagar}`;
    carritoCompras.querySelector(".cantidad-carrito").textContent = `Productos en carrito: ${cantidadProductosUnicos}`;

    // Configurar el Event Listener para los botones de cantidad y eliminar
    const nuevoListaCarrito = carritoCompras.querySelector(".lista-carrito");
    nuevoListaCarrito.addEventListener("click", manejarClicCarrito);
    
}

// Suma una unidad a la cantidad de un producto en el carrito.
function sumarCantidadProducto(idProducto) {
    let productoEnCarrito = null;

    // Buscar el producto en el carrito
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].id === idProducto) {
            productoEnCarrito = carrito[i];
            break;
        }
    }

    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
        actualizarCarritoHTML(); // Actualizar la vista
    }
}

// Resta una unidad a la cantidad de un producto en el carrito.
function restarCantidadProducto(idProducto) {
    let productoEnCarrito = null;
    // Buscar el producto en el carrito
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].id === idProducto) {
            productoEnCarrito = carrito[i];
            break;
        }
    }

    if (productoEnCarrito) {
        productoEnCarrito.cantidad--;
        if (productoEnCarrito.cantidad <= 0) {
            eliminarProductoDelCarrito(idProducto); // Eliminar si la cantidad llega a 0
        } else {
            actualizarCarritoHTML(); // Solo actualizar si la cantidad aún es positiva
        }
    }
}

// Elimina completamente un producto del carrito.
function eliminarProductoDelCarrito(idProducto) {
    // Reconstruir el array carrito sin el producto a eliminar
    const nuevoCarrito = [];
    for (let i = 0; i < carrito.length; i++) {
        // Buscar los elementos distintos al que hay que eliminar
        if (carrito[i].id !== idProducto) {
            nuevoCarrito.push(carrito[i]);
        }
    }
    carrito = nuevoCarrito;
    actualizarCarritoHTML();
}


/* ------------------ FUNCION PARA VALIDAR FORMULARIO ------------------*/
function validarFormulario() {

    let nombre = document.getElementById("nombre").value;
    let correo = document.getElementById("email").value;
    let mensaje = document.getElementById("mensaje").value;

    if (nombre !== "" && correo !== "" && mensaje !== "") {
    console.log("Formulario completo. Listo para enviar.");
  } else {
    console.log("Faltan completar campos obligatorios.");

    let div = document.getElementById("validarFormulario");
    div.innerHTML = "<h5>Por favor, completá todos los campos del formulario</h5>";
    div.style.color = "red";
    div.height = "100%";
    div.width = "100%";

    if (!correo.includes("@") || !correo.includes(".")) {
    console.log("Correo inválido.");
    return;
    }
  }
}

/* ------------------ FUNCION PRINCIPAL ------------------*/
for(i=0; i< productos.length; i++)
{
    console.log(productos[i]);
}

boton.addEventListener("click" , validarFormulario)

agregarProductos();
actualizarCarritoHTML();
