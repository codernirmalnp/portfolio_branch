


class SuccessException {
    public status;
    public message;
    public data;
    constructor(message: string, data: any) {
        this.status = 200;
        this.message = message;
        this.data = data;

    }
}
export default SuccessException;
