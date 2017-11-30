class AuthenticationController {
    constructor({ authenticationService }) {
        this._authenticationService = authenticationService;
        this.authentication = this.authentication.bind(this)
    }
    async authentication(req, res, next) {

        try {
            const token = await this._authenticationService.authenticate(req.body)
            console.log('AUTHCONTROLLER>>>>', token)
            res.status(200).json({ token })
        } catch (error) {
            throw error
        }
    }
}
module.exports = AuthenticationController