/**Due to the way the Swag Labs project is set up, I am unable to save login sessions to persist across my tests.
 * Hence the creation of this class which will extend the login page and handle the authentication for other tests.
 */

import Login from "./login.page";

export default class Auth extends Login{
    
}