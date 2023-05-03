# rn-delivery-app
rn-delivery-app (Maji) is a native mobile application made with React Native using TypeScript. It's a fullstack system
The system uses a 3-tier architecture, with 3 users:
- The customer
- The provider/seller
- The admin

It includes a backend built with Node/ExpressJS with a MySQL database. On the frontend the app is divided into two screen routes, 
the customer screens, and the provider screens.
Each user has a role type which is check during the login or registration and routed to their respective screens.


## Customer
- The customer has the ability to browse a catalog of products
- The customer can add desired products to cart
- The customer can checkout desired products
- The customer can view past orders

### Customer Screenshots

<p float="left">
<img src="https://github.com/derekleiro/rn-delivery-app/blob/main/screenshots/home.png" title="Home Page" alt="Home Page" width="200">
<img src="https://github.com/derekleiro/rn-delivery-app/blob/main/screenshots/checkout.png" title="Checkout Page" alt="Checkout Page" width="200">
<img src="https://github.com/derekleiro/rn-delivery-app/blob/main/screenshots/orders.png" title="Orders Page" alt="Orders Page" width="200">
<img src="https://github.com/derekleiro/rn-delivery-app/blob/main/screenshots/profile.png" title="Profile Page" alt="Profile Page" width="200">
</p>


## Provider/Seller
- The provider can view orders made to their products
- The provider can call the customer
- The provider can add, reduce, edit or delete inventory
- The provider can edit the status of individual items

### Provider Screenshots

<p float="left">
<img src="https://github.com/derekleiro/rn-delivery-app/blob/main/screenshots/provider-home.png" title="Home Page" alt="Home Page" width="250">
<img src="https://github.com/derekleiro/rn-delivery-app/blob/main/screenshots/provider-inventory.png" title="Inventory Page" alt="Inventory Page" width="250">
<img src="https://github.com/derekleiro/rn-delivery-app/blob/main/screenshots/provider-reports.png" title="Report Page" alt="Report Page" width="250">
</p>

## Admin
- The Admin can view reports

### Admin Screenshots

<p float="left">
<img src="https://github.com/derekleiro/rn-delivery-app/blob/main/screenshots/admin-home.png" title="Home Page" alt="Home Page" width="400">
<img src="https://github.com/derekleiro/rn-delivery-app/blob/main/screenshots/admin-login.png" title="Login Page" alt="Login Page" width="400">
</p>


## Setting up the database
Download the latest version of XAMPP.
Start up the MySQL and Apache servers on the XAMPP GUI.
Open your preferred browser and navigate to `http://localhost/phpmyadmin/`.
Create a database named `water2go`, and navigate into it.
In the `water2go` database, import the tables using the `water2go.sql` file.
Finally, edit the `root` user and give it a password `pass`.
Note if you get the issue , navigate to the file `config.inc` in your XAMPP installation and update the files to match below
`$cfg['Servers'][$i]['user'] = 'root';
 $cfg['Servers'][$i]['password'] = 'pass';`

## Running the backend
On your IDE terminal, `cd backend` into the backend folder.
Once on the `/backend` directory run `yarn install` to install all the required dependecies.
Finally, run `npm start` to start the server.

## Running the app
Download the latest version of Visual Studio or your preferred IDE and Android studio.
Once your IDE is ready, clone this project on your machine and open it up.

Open your terminal and run `yarn add expo`.
Once that is complete, run `npx expo install` to install all the required dependecies.
Setup and open your Android Emulator from Android Studio.
Finally, run `npx expo start` and press `a` to open the app on your emulator. Note that the app will not work properly on iOS due to differences .
in local hosting with Android. This will be fixed in future, but for now, run on Android.


## Feature Consideration
In future, added graphs for providers and admin reports to visualize data and separate hosts to enable iOS and Web versions to work with backend APIs.
