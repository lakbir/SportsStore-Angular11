// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  authApi: "http://localhost:8080/api/auth/",
  host_url: "http://localhost:8080/api/",
  host: "http://localhost:8080"
};

export const errors = {
  error_get_users: "Error to recuperate the users list",
  error_no_users: "No users found",
  error_delete_user: "Error to delete this user, please try again",
  error_get_categories: "Error to recuperate the Categories list",
  error_no_categories: "No Categories found",
  error_delete_category: "Error to delete this Category, please try again",
  succes_add_category:"Category has successfully added",
  error_add_category:"Error to add Category, try again",
  succes_update_category:"Category has successfully updated",
  error_update_category:"Error to update Category, try again",
  error_get_products: "Error to recuperate the products list",
  error_no_products: "No products found",
  error_delete_product: "Error to delete this product, please try again",
  succes_add_product:"Product has successfully added",
  error_add_product:"Error to add product, try again",
  succes_update_product:"Product has successfully updated",
  error_update_product:"Error to update products, try again",
  error_get_orders: "Error to recuperate the orders list",
  error_no_orders: "No Orders found",
}
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
