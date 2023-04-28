function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}
let userRaw = getCookie("user");

if (!userRaw) {
  location.href = location.protocol + "//" + location.host + "/admin/login";
}

const generateReports = async () => {
  const revenueCard = document.getElementById("revenue");
  const ordersCard = document.getElementById("orders");
  const providersCard = document.getElementById("providers");
  const usersCard = document.getElementById("users");
  const inventoryCard = document.getElementById("inventory");

  try {
    const res = await fetch("http://localhost:3000/admin/reports");
    const JsonRes = await res.json();
    console.log(JsonRes);
    if (res.ok) {
      const data = JsonRes.resp;
      revenueCard.innerText = data.revenue;
      ordersCard.innerText = data.ordersCount;
      providersCard.innerText = data.providersCount;
      usersCard.innerText = data.userCount;
      inventoryCard.innerText = data.inventoryCount;
    }
  } catch (e) {
    console.log(e);
  }
};

generateReports();

function deleteAllCookies() {
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}

const handleLogout = () => {
  deleteAllCookies();
  location.href = location.protocol + "//" + location.host + "/admin/login";
};
