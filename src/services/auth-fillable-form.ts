export interface AuthFillableForm {

    // Play waiting animation or something
    authPending();

    // Notify that authentication failed
    authFailed();

    // Redirect to authorized page
    authSuccess();
}
