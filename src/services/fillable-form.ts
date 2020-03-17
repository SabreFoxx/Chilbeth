export interface FillableForm {

    // Play waiting animation or something
    actionPending();

    // Notify that authentication failed
    actionFailed();

    // Redirect to authorized page
    actionSuccess();
}
