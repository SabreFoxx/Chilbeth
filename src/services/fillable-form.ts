export interface FillableForm {

    // Play waiting animation or something
    actionPending();

    // Notify that authentication failed
    actionFailed();

    // Redirect to authorized page
    actionSuccess();
}

/**
 * Used when you're supposed to pass a FillableForm, but you dont need it to do anything.
 * Probably because, you've passed your component as a FillableForm previously.
 * If you should pass the component again, and the operation is faster than the previous,
 * the user might see a success message whereas the previous operation has not completed.
 */
class EmptyStub implements FillableForm {
    actionPending() { }
    actionFailed() { }
    actionSuccess() { }
}

/**
 * Used when you're supposed to pass a FillableForm, but you dont need it to do anything.
 * Probably because, you've passed your component as a FillableForm previously.
 * If you should pass the component again, and the operation is faster than the previous,
 * the user might see a success message whereas the previous operation has not completed.
 */
export let emptyStub = new EmptyStub;
