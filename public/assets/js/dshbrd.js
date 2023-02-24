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
      const div = document.createElement("div");
      div.innerHTML = `
      <div class="alert alert-success alert-dismissible" role="alert">
      <button class="btn-close" type="button" data-bs-dismiss="alert" aria-label="Close"></button>
      <span>
      <strong>Success :</strong> Here is your link '<a href="${new URL(window.location.href).origin + '/l' + new URL(data.short_link).pathname}" target="_blank">${new URL(window.location.href).origin + '/l' + new URL(data.short_link).pathname}</a>'.
      </span>
      </div>`;
      document.querySelector('#newlink').appendChild(div);
    })
    .catch((err) => console.error(err));
});
