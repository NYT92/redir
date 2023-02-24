const showlist = document.querySelector("#list_link");
const titleid = document.querySelector("#idtext");
const idcust = document.querySelector("#idcustom");
const urlcust = document.querySelector("#urlcustom");
const submitbtn = document.querySelector("#submit_edit");

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
    totallnk.textContent = data.count
    totalclk.textContent = data.items.reduce(function(prev, cur) {
      return prev + cur.stats.clicks;
    }, 0);
    for (let i = 0; i < data.items.length; i++) {
      const e = data.items[i];
      const row = document.createElement("tr");
      row.innerHTML = `
          <td class="text-start">${e.key}</td>
          <td class="text-start">${new URL(window.location.href).origin + '/l/' + e.id}</td>
          <td class="font-monospace text-nowrap text-truncate text-break text-start">${e.original_link}</td>
          <td class="text-start">${e.stats.clicks}</td>
          <td style="padding-top: 5px;">
            <button class="btn btn-primary btn-sm" type="button" style="margin-right: 4px;" onclick="editcard('${e.id}', '${e.original_link}', '${e.key}')" data-bs-target="#modal-1" data-bs-toggle="modal">
              <svg class="bi bi-pencil-fill" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16">
                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"></path>
              </svg>
            </button>
            <button class="btn btn-danger btn-sm" type="button" onclick="deleteLink('${e.key}')">
                <svg class="bi bi-trash-fill" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"></path>
                </svg>
            </button>
          </td>
        `;
      showlist.appendChild(row);
    }
  })
  .catch((err) => console.error(err));

function editcard(id, url, key) {
  titleid.innerHTML = `Edit: ${id}`;
  idcust.value = id;
  urlcust.value = url;
  const formData = document.querySelector("#formsubmit");
  formData.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(formData);
    const idfrm = data.get("id");
    const urlfrm = data.get("ogurl");
    let bodyContent = JSON.stringify({
      id: idfrm,
      original_link: urlfrm,
    });
    fetch("/api/update/" + key, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: bodyContent,
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Success");
        window.location.reload();
      })
      .catch((err) => console.error(err));
  });
}

function deleteLink(id) {
  if (confirm("Are you sure you want to delete it?")) {
    fetch("/api/delete/" + id, {
      method: "DELETE",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Success!");
        window.location.reload();
      })
      .catch((err) => console.error(err));
  } else {
    console.log("Declined");
  }
}
