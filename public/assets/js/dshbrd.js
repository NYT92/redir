const totallnk = document.querySelector("#totallnk");
const totalclk = document.querySelector("#totalclk");

fetch("/api/list", {
  method: "GET",
  headers: {
    Accept: "*/*",
    "Content-Type": "application/json",
  },
})
  .then((res) => res.json())
  .then((data) => {
    totallnk.textContent = data.count;
    totalclk.textContent = data.items.reduce(function (prev, cur) {
      return prev + cur.stats.clicks;
    }, 0);
  })
  .catch((err) => console.error(err));

const formData = document.querySelector("#formsubmit");
formData.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(formData);
  const idfrm = data.get("id");
  const urlfrm = data.get("url");
  let bodyContent = JSON.stringify({
    id: idfrm,
    original_link: urlfrm,
  });
  fetch("/api/create", {
    method: "POST",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
    },
    body: bodyContent,
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === 400) {
        const div = document.createElement("div");
        div.innerHTML = `
        <div class="alert alert-danger alert-dismissible" role="alert">
        <button class="btn-close" type="button" data-bs-dismiss="alert"
        aria-label="Close"></button>
        <span>
        <strong>Error :</strong> Bad request..
        </span>
        </div>`;
        document.querySelector("#created_link").appendChild(div);
      } else {
        const div = document.createElement("div");
        div.innerHTML = `
      <div class="alert alert-success alert-dismissible" role="alert">
      <button class="btn-close" type="button" data-bs-dismiss="alert" aria-label="Close"></button>
      <span>
      <strong>Success :</strong> Here is your link '<a href="${data.short_link}" target="_blank">${data.short_link}</a>'.
      </span>
      </div>`;
        document.querySelector("#created_link").appendChild(div);
      }
    })
    .catch((err) => {
      const div = document.createElement("div");
      div.innerHTML = `
      <div class="alert alert-danger alert-dismissible" role="alert">
      <button class="btn-close" type="button" data-bs-dismiss="alert"
      aria-label="Close"></button>
      <span>
      <strong>Error :</strong> ${err.message}
      </span>
      </div>`;
      document.querySelector("#created_link").appendChild(div);
    });
});
