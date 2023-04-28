function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}
let userRaw = getCookie("user");

if (userRaw) {
  location.href = location.protocol + '//' + location.host + "/admin";
}

const handleRegister = async (e) => {
  const name = document.getElementById("fullname").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("http://localhost:3000/admin/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });

    const JsonRes = await res.json();

    if (res.ok) {
      const user = JsonRes.resp;
      const date = new Date();
      date.setTime(date.getTime() + 14 * 24 * 60 * 60 * 1000);
      const cookieExpiryDate = date.toUTCString();

      document.cookie = `user=${JSON.stringify(
        user
      )}; expires=${cookieExpiryDate}`;

      location.href = location.protocol + '//' + location.host + "/admin";
    } else {
      const errorbox = document.getElementById("errorbox");
      errorbox.innerText = JsonRes.message;
    }
  } catch (e) {
    console.log(e);
  }
};
