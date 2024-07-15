// Variables globales
var map;

// Función principal para inicializar el mapa
function initMap() {
    // Inicializar mapa centrado en una ubicación específica
    map = L.map('mapid').setView([19.4326, -99.1332], 12); // Coordenadas de la Ciudad de México y nivel de zoom inicial

    // Capa de mapa base
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
}

// Función para cargar GeoJSON y dibujar la ruta con puntos de referencia
function cargarGeoJSON(nombreArchivo, color) {
    // Construir la URL completa al archivo GeoJSON en la misma carpeta que tu aplicación web
    var url = `${nombreArchivo}.GeoJSON`;

    // Utilizar fetch para obtener el archivo GeoJSON
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Limpiar capa previa si existe
            if (window.geojsonLayer) {
                map.removeLayer(window.geojsonLayer);
            }

            // Agregar GeoJSON a la capa de líneas y estilizar
            window.geojsonLayer = L.geoJSON(data, {
                style: function (feature) {
                    return {
                        color: color, // Color dinámico según la opción seleccionada
                        weight: 5, // Grosor de la línea
                        opacity: 0.8 // Opacidad de la línea
                    };
                },
                pointToLayer: function (feature, latlng) {
                    return L.circleMarker(latlng, {
                        radius: 6, // Tamaño del marcador
                        fillColor: color, // Color del marcador igual al de la línea
                        color: "#fff", // Borde del marcador
                        weight: 1, // Grosor del borde
                        opacity: 1, // Opacidad del marcador
                        fillOpacity: 0.8 // Opacidad de relleno del marcador
                    });
                }
            }).addTo(map);

            // Ajustar el mapa para mostrar toda la ruta
            map.fitBounds(window.geojsonLayer.getBounds());
        })
        .catch(error => console.error('Error al cargar el archivo GeoJSON:', error));
}

// Función para centrar el mapa en una ubicación específica
function centrarMapa() {
    map.setView([19.4326, -99.1332], 12); // Centrar en la Ciudad de México y ajustar nivel de zoom
}

// Función para hacer zoom y centrar en la República Mexicana
function zoomYCentrarMexico() {
    var bounds = L.latLngBounds([14.35, -119.9], [32.8, -86.5]); // Coordenadas aproximadas de la República Mexicana
    map.fitBounds(bounds); // Hacer zoom para ajustar al tamaño del país
}

// Inicializar el mapa cuando se cargue la página
document.addEventListener('DOMContentLoaded', function () {
    initMap();
});
