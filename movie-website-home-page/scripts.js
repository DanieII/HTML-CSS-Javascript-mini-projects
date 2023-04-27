const movieContainer = document.querySelector("#movie-container ul");
const movieHTML = `<div class="movie-card">
        <a href="#"><img src="https://cdn.shopify.com/s/files/1/0037/8008/3782/products/image2.jpg?v=1654535114"
            alt="movie image"></a>
        <div class="information">
            <div style="display: flex; gap:10px; justify-content: center;">
                <p class="not-selectable"><i class="fa-solid fa-star" style="color: #F5C518;"></i> <b>7.8</b> </p>
                <p class="not-selectable">2023</p>
            </div>
            <p style="margin-top: 0; text-align: center; font-size: 15px; font-family: Roboto;">Avatar the way of Water</p>
        </div>
    </div>`;

for (let i = 0; i <= 10; i++) {
    const movieCardTemplate = document.createElement("li");
    movieCardTemplate.innerHTML = movieHTML;
    movieContainer.append(movieCardTemplate);
}