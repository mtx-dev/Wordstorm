const userService = require('../service/user-service');
const ApiError = require('../exeptions/api-error');

class DictionaryController {
    async search(req, res, next) {
        try {
			// TODO cheack on norm str
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return next(ApiError.BadRequest('Error validation', errors));
            }
            const {email, password} = req.body;
            const userData = await userService.registration(email, password);

            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 3600 * 1000, httpOnly: true})
            console.log('======== reg');

            return res.json(userData);
        } catch(error) {
            next(error);
        }
    }

    async fakeWords(req, res, next) {
        try {
			// TODO cheack on norm str

            // const {email, password} = req.body;
            // const userData = await userService.login(email, password);
            // res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 3600 * 1000, httpOnly: true})
            // console.log('======== login');
            // return res.json(userData);
        } catch(error) {
            next(error);
        }
    }

    async fakeTranslations(req, res, next) {
        try {
			// TODO cheack on norm str

            // const {refreshToken} = req.cookies;
            // const token = await userService.logout(refreshToken);
            // res.clearCookie('refreshToken');
            // console.log('======== logout');
            // res.json(token);
        } catch(error) {
            next(error);
        }
    }
}


module.exports = new DictionaryController();