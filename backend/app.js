const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const http = require("http");
var cors = require("cors");
var parseUrl = require("body-parser");
const app = express();
const { v4: uuidv4 } = require("uuid");

var mysql = require("mysql");
const { encode } = require("punycode");
const bcrypt = require("bcrypt");

let encodeUrl = parseUrl.urlencoded({ extended: false });

app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
);
app.use(express.json());
app.use(express.text());
// Middleware for sessions
app.use(
  session({
    secret: "my-secret-key",
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    resave: false,
  })
);

app.use(cookieParser());

// Creating connection to the mysql db
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "pass",
  database: "water2go",
});

con.connect(function (err) {
  if (err) {
    console.log(err);
  }
});

// Route for logging out
app.get("/logout", (req, res, next) => {
  // Destroy the session and redirect to the login page
  req.session.destroy(() => {
    res.status(200).json({ message: "User successfully logged out" });
  });
});

// Route for logging the user/provider into the system
app.post("/login", (req, res, next) => {
  const { email, password, role } = req.body;
  const userCheckSQL = `SELECT * FROM users WHERE email = '${email}'`;
  const providerCheckSQL = `SELECT * FROM providers WHERE providerEmail = '${email}'`;

  // checking if user/provier is registered or not
  con.query(
    role === "Provider" ? providerCheckSQL : userCheckSQL,
    async function (err, result) {
      if (err) {
        console.log(err);
      }
      if (Object.keys(result).length > 0) {
        let passwordMatch;
        if (role === "Provider") {
          // Compare hashed password with provided password and storing the match
          passwordMatch = await bcrypt.compare(
            password,
            result[0].providerPassword
          );
        } else {
          passwordMatch = await bcrypt.compare(password, result[0].password);
        }

        if (!passwordMatch) {
          // Passwords do not match
          return res.status(401).json({
            message:
              "Inavlid credentials. Password doesn't match for the provided email",
          });
        } else {
          const userSession = (req.session.user = {
            accountID: result[0].id,
            name: result[0].name,
            email: result[0].email,
            phoneNumber: result[0].phoneNumber,
            role: role,
          });

          const providerSession = (req.session.user = {
            accountID: result[0].ID,
            name: result[0].providerName,
            email: result[0].providerEmail,
            phoneNumber: result[0].providerContact,
            role: role,
          });

          req.session.user =
            role === "Provider" ? providerSession : userSession;
          res.status(200).json({
            message: "User successfully logged in",
            resp: req.session.user,
          });
        }
      } else {
        res
          .status(404)
          .json({ message: "User doesn't exists. Try signing up instead" });
      }
    }
  );
});

// Route for fetching the user/provider profile
app.get("/profile/:role/:id/", (req, res, next) => {
  const accountID = req.params.id;
  const role = req.params.role;

  const userProfileSQL = `SELECT name, email, phoneNumber, dob, role_type FROM users WHERE id = '${accountID}'`;
  const providerProfileSQL = `SELECT providerName, providerContact, providerEmail, role_type FROM providers WHERE ID = '${accountID}'`;

  con.query(
    role === "Provider" ? providerProfileSQL : userProfileSQL,
    async function (err, result) {
      if (err) {
        console.log(err);
      }
      if (Object.keys(result).length > 0) {
        res.status(200).json({
          message: "Successfully retrieved user profile",
          resp: result[0],
        });
      } else {
        res
          .status(401)
          .json({ message: "Please login or register for an account" });
      }
    }
  );
});

// Route for registering either a user or provider into the system
app.post("/register", encodeUrl, (req, res, next) => {
  const { name, email, phoneNumber, role, password, date } = req.body;

  // checking user/provider already registered or not
  const userCheckSQL = `SELECT * FROM users WHERE email = '${email}'`;
  const providerCheckSQL = `SELECT * FROM providers WHERE providerEmail = '${email}'`;

  con.query(
    role === "Provider" ? providerCheckSQL : userCheckSQL,
    function (err, result) {
      if (err) {
        console.log(err.message);
      }
      if (Object.keys(result).length > 0) {
        res
          .status(403)
          .json({ message: "User already exists. Try logging in instead" });
      } else {
        const accountID = uuidv4();
        req.session.user = {
          accountID,
          name,
          email,
          phoneNumber,
          role: role,
        };

        const saltRounds = 10;
        const plainPassword = password;

        bcrypt.hash(plainPassword, saltRounds, function (err, hash) {
          const userInsertSQL = `INSERT INTO users (id, name, email, phoneNumber, password, dob, role_type) VALUES ('${accountID}', '${name}', '${email}', '${phoneNumber}', '${hash}', '${date}', 'User')`;
          const providerInsertSQL = `INSERT INTO providers (ID, providerName, providerContact, providerVerified, providerEmail, providerPassword, role_type) VALUES ('${accountID}', '${name}', '${phoneNumber}', '0', '${email}', '${hash}', 'Provider')`;
          con.query(
            role === "Provider" ? providerInsertSQL : userInsertSQL,
            function (err, result) {
              if (err) {
                res.status(500).json({ message: err.message });
              } else {
                res.status(200).json({
                  message: `Successfully registered ${
                    role === "Provider" ? "Provider" : "User"
                  }`,
                  resp: req.session.user,
                });
              }
            }
          );
        });
      }
    }
  );
});

// Route for providers to add their inventory
app.post("/inventory/add", encodeUrl, (req, res, next) => {
  const {
    productTitle,
    productDescription,
    productCategory,
    productPrice,
    user,
  } = req.body;

  const authorized = user.role === "Provider";

  if (!authorized) {
    res.status(401).json({
      message: "Please log in to a provider account first",
    });
  } else {
    // Getting provider details
    con.query(
      `SELECT * FROM providers WHERE ID = '${user.accountID}'`,

      function (err, result) {
        if (err) {
          console.log(err.message);
        }
        if (Object.keys(result).length > 0) {
          // inserting new inventory to a provider

          var sql = `INSERT INTO inventory (inventoryID, providerID, providerContact, productCategory, productDescription, productTitle, productPrice, providerName) VALUES ('${uuidv4()}','${
            result[0].ID
          }','${
            result[0].providerContact
          }','${productCategory}','${productDescription}','${productTitle}','${productPrice}','${
            result[0].providerName
          }')`;

          con.query(sql, function (err, result) {
            if (err) {
              res.status(500).json({ message: err.message });
            } else {
              res.status(200).json({
                message: "Successfully added item to your inventory",
                resp: req.session.user,
              });
            }
          });
        } else {
          res.status(401).json({
            message:
              "Please log in to a provider account to finish this action",
          });
        }
      }
    );
  }
});

// Route for providers to add their inventory
app.post("/inventory/update/:id", encodeUrl, (req, res, next) => {
  const {
    productTitle,
    productDescription,
    productCategory,
    productPrice,
    user,
  } = req.body;
  const inventoryID = req.params.id;
  const authorized = user.role === "Provider";

  if (!authorized) {
    res.status(401).json({
      message: "Please log in to a provider account first",
    });
  } else {
    const sql = `UPDATE inventory SET productCategory = '${productCategory}', productDescription = '${productDescription}', productTitle = '${productTitle}', productPrice = '${productPrice}' WHERE inventoryID = '${inventoryID}' AND providerID = '${user.accountID}'`;
    console.log({ inventoryID, providerID: user.accountID });
    con.query(sql, function (err, result) {
      if (err) {
        res.status(500).json({ message: err.message });
      } else {
        res.status(200).json({
          message: "Successfully updated item to your inventory",
          resp: result,
        });
      }
    });
  }
});

// Define a route for deleting a provider's inventory item
app.delete("/provider/:providerID/inventory/:id", (req, res) => {
  const providerId = req.params.providerID;
  const inventoryID = req.params.id;

  const sql = `DELETE FROM inventory WHERE inventoryID = '${inventoryID}' AND providerID = '${providerId}'`;
  // Perform the delete operation on the database
  con.query(sql, (error, result, fields) => {
    if (error) {
      console.error("Error deleting producst: " + error.stack);
      res.status(500).json({
        message: "Error deleting inventory item",
      });
      return;
    }
    res
      .status(200)
      .send({ resp: result, message: "Successfully deleted inventory item" });
  });
});

// Getting inventory items for a specific provider
app.get("/inventory/:id", encodeUrl, (req, res) => {
  const providerID = req.params.id;

  // Getting provider details
  con.query(
    `SELECT * FROM inventory WHERE providerID = '${providerID}'`,

    function (err, result) {
      if (err) {
        console.log(err.message);
      }
      if (Object.keys(result).length > 0) {
        res.status(200).json({
          message: "Successfully retrieved provider's inventory",
          resp: result,
        });
      } else {
        res.status(404).json({
          message:
            "We could not find any items in your inventory. Please add some and try again",
        });
      }
    }
  );
});

// Getting a single inventory item
app.get("/product/:id", encodeUrl, (req, res) => {
  const inventoryID = req.params.id;

  // Getting provider details
  con.query(
    `SELECT * FROM inventory WHERE inventoryID = '${inventoryID}'`,

    function (err, result) {
      if (err) {
        console.log(err.message);
      }
      if (Object.keys(result).length > 0) {
        res.status(200).json({
          message: "Successfully retrieved inventory item",
          resp: result,
        });
      } else {
        res.status(404).json({
          message: "Product requested not found",
        });
      }
    }
  );
});

// Get all available items for the user to buy
app.get("/inventory/", encodeUrl, (req, res) => {
  // Getting all items available in inventory
  con.query(
    `SELECT * FROM inventory`,

    function (err, result) {
      if (err) {
        console.log(err.message);
      }
      if (Object.keys(result).length > 0) {
        res.status(200).json({
          message: "Successfully retrieved items on sale",
          resp: result,
        });
      } else {
        res.status(404).json({
          message:
            "No items currently on sale. Please check back later or become a provider",
        });
      }
    }
  );
});

app.post("/checkout", (req, res, next) => {
  const {
    items,
    userID,
    orderDetails,
    orderTotal,
    providerIDs,
    customerName,
    customerContact,
  } = req.body;

  const sqlItems = JSON.stringify(items);
  const sqlProviderIDs = JSON.stringify(providerIDs);
  const sql = `INSERT INTO orders (orderID, orderDetails, orderTotal, customerID, orderItems, providerIDs, customerName, customerContact) VALUES ('${uuidv4()}','${orderDetails}','${orderTotal}','${userID}','${sqlItems}','${sqlProviderIDs}','${customerName}','${customerContact}')`;

  // Adding orders specific to a user into the orders table
  con.query(sql, function (err, result) {
    if (err) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(200).json({
        message: `Successfully placed order`,
        resp: result,
      });
    }
  });
});

// Getting orders of a specific user
app.get("/orders/:id", encodeUrl, (req, res) => {
  const userID = req.params.id;

  con.query(
    `SELECT * FROM orders WHERE customerID = '${userID}'`,

    function (err, result) {
      if (err) {
        console.log(err.message);
      }
      if (Object.keys(result).length > 0) {
        res.status(200).json({
          message: "Successfully retrieved user's orders",
          resp: result,
        });
      } else {
        res.status(404).json({
          message:
            "We could not find any orders. Please order something and try again",
        });
      }
    }
  );
});

// Getting orders providers have received from a customer
app.get("/provider/orders/:id", encodeUrl, (req, res) => {
  const providerID = req.params.id;

  con.query(
    `SELECT * FROM orders`,

    async function (err, resultRaw) {
      if (err) {
        console.log(err.message);
      }
      if (Object.keys(resultRaw).length > 0) {
        const findProvidersResult = resultRaw.filter(async (order) => {
          const JSONProviderIds = await JSON.parse(order.providerIDs);
          return JSONProviderIds.forEach((id) => id) === providerID;
        });

        let result = [];

        for (let index = 0; index < findProvidersResult.length; index++) {
          const order = findProvidersResult[index];

          const JSONOrderItems = await JSON.parse(order.orderItems);
          const providersItems = JSONOrderItems.filter(
            (orderItem) => orderItem.providerID === providerID
          );
          const providersOrderTotal = providersItems.reduce(
            (acc, curr) => curr.productPrice + acc,
            0
          );

          if (providersItems.length !== 0) {
            result.push({
              orderID: order.orderID,
              orderDetails: order.orderDetails,
              orderTotal: providersOrderTotal,
              customerID: order.customerID,
              orderStatus: order.orderStatus,
              paymentID: order.paymentID,
              orderItems: providersItems,
              providerID,
              customerName: order.customerName,
              customerContact: order.customerContact,
            });
          }
        }

        res.status(200).json({
          message: "Successfully retrieved provider's orders",
          resp: { result, fullOrders: findProvidersResult },
        });
      } else {
        res.status(404).json({
          message:
            "We could not find any orders. When a user places an order, it will show up here",
        });
      }
    }
  );
});

// Route for updating order
app.put("/provider/update/order/:id", (req, res) => {
  const orderId = req.params.id;
  const { orderItems } = req.body;

  const sqlItems = JSON.stringify(orderItems);
  const sql = `UPDATE orders SET orderItems = '${sqlItems}' WHERE orderID = '${orderId}'`;

  con.query(sql, (error, result) => {
    if (error) {
      res.status(500).json({
        message: error.message,
      });
    } else {
      res.status(200).json({
        message: "Order successfully updated",
        resp: result,
      });
    }
  });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
